  import React, { useEffect, useState } from 'react';
  import { ArrowLeft, Settings2, Globe, Upload, Settings } from 'lucide-react';
  import ColorPickers from './ColorPickers';
  import FontSelector from './FontSelector';
  import { IoMdCloseCircle } from "react-icons/io";
  import QRCode from "qrcode";
  import { useNavigate } from 'react-router-dom';

function UploadImage() {
  const [invitationText, setInvitationText] = useState("");
  const [handleClickButton, setHandleClickButton] = useState(true);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
  const [mergedImages, setMergedImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      imageShow.forEach(image => URL.revokeObjectURL(image.url));
    };
  }, [imageShow]);

  const generateQRCode = async (url, id, text = "") => {
    try {
      const qrContent = `${text} | ${url}`;
      const qrCodeData = await QRCode.toDataURL(qrContent);
      setQrCodes((prev) => ({ ...prev, [id]: qrCodeData }));
      return qrCodeData;
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

 const mergeImagesOn = async (mainImageUrl, qrCodeUrl, id) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      // Load all images
      const [mainImage, qrCode, frameLogo] = await Promise.all([
        loadImage(mainImageUrl),
        loadImage(qrCodeUrl),
        loadImage("https://mazoom-sandy.vercel.app/images/Frame.svg"),
      ]);
  
      
      canvas.width = mainImage.width;
      canvas.height = mainImage.height;
  
      // Draw main image
      ctx.drawImage(mainImage, 0, 0);
  
      // Draw QR code (top left, 20% of main image height)
      const qrSize = canvas.height * 0.2;
      ctx.drawImage(qrCode, 20, 20, qrSize, qrSize);
  
      // Draw frame logo (top right, 20% of main image height)
      if (!removeLogo) {
        const logoSize = canvas.height * 0.2;
        ctx.drawImage(frameLogo, canvas.width - logoSize - 20, 20, logoSize, logoSize);
      }
  
      // Convert to data URL
      const mergedImageUrl = canvas.toDataURL("image/png");
      setMergedImages((prev) => ({ ...prev, [id]: mergedImageUrl }));
      return mergedImageUrl;
    } catch (err) {
      console.error("Error merging images:", err);
    }
  };

 const mergeImagesOff = async (mainImageUrl, qrCodeUrl, id) => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      // Load all images
      const [mainImage, qrCode, frameLogo] = await Promise.all([
        loadImage(mainImageUrl),
        loadImage(qrCodeUrl),
        loadImage("https://mazoom-sandy.vercel.app/images/Frame.svg"),
      ]);
  
      // Calculate dimensions
      const padding = 20; // Padding between elements
      const qrSize = 250; // Fixed size for QR code and logo
      const bottomHeight = qrSize + padding * 2; // Height for bottom section
  
      // Set canvas size to accommodate main image plus bottom section
      canvas.width = mainImage.width;
      canvas.height = mainImage.height + bottomHeight;
  
      // Draw main image
      ctx.drawImage(mainImage, 0, 0);
  
      // Draw bottom section background
      ctx.fillStyle = '#f3f4f6'; // Light gray background
      ctx.fillRect(0, mainImage.height, canvas.width, bottomHeight);
  
      // Draw QR code on the left side of bottom section
      ctx.drawImage(
        qrCode,
        padding,
        mainImage.height + padding,
        qrSize,
        qrSize
      );
  
      // Draw frame logo on the right side of bottom section if not removed
      if (!removeLogo) {
        ctx.drawImage(
          frameLogo,
          canvas.width - qrSize - padding,
          mainImage.height + padding,
          qrSize,
          qrSize
        );
      }
  
      // Convert to data URL
      const mergedImageUrl = canvas.toDataURL("image/png");
      setMergedImages((prev) => ({ ...prev, [id]: mergedImageUrl }));
      return mergedImageUrl;
    } catch (err) {
      console.error("Error merging images:", err);
    }
  };
  
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const imageHandle = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Add files to images and imageShow state
      setImages((prev) => [...prev, ...files]);
      
      // Generate new image URLs
      const newImageUrls = files.map((file) => ({
        url: URL.createObjectURL(file),
        id: crypto.randomUUID(),
      }));
      
      // Update the imageShow state
      setImageShow((prev) => [...prev, ...newImageUrls]);
  
      // Process all images asynchronously using Promise.all
      const mergePromises = newImageUrls.map(async (image) => {
        const qrCode = await generateQRCode(image.url, image.id);
        console.log(`Processing image with id: ${image.id}`);
        
        // Conditionally merge based on handleClickButton
        if (handleClickButton === true) {
          console.log("Merging with handleClickButton OFF");
          await mergeImagesOff(image.url, qrCode, image.id);
        } else {
          console.log("Merging with handleClickButton");
          await mergeImagesOn(image.url, qrCode, image.id);
        }
      });
  
      // Wait for all merge operations to finish
      await Promise.all(mergePromises);
    }
  };
  

  const changeImage = async (file, index) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newImageShow = [...imageShow];
    const newUrl = URL.createObjectURL(file);
    newImageShow[index] = { url: newUrl, id: imageShow[index].id };
    setImageShow(newImageShow);

    const qrCode = await generateQRCode(newUrl, newImageShow[index].id, invitationText);
    if (handleClickButton) {
      await mergeImagesOff(newUrl, qrCode, newImageShow[index].id);
    } else {
      await mergeImagesOn(newUrl, qrCode, newImageShow[index].id);
    }
  };

  const removeImage = (index) => {
    const idToRemove = imageShow[index].id;
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageShow((prev) => prev.filter((_, i) => i !== index));
    setQrCodes((prev) => {
      const updatedQrCodes = { ...prev };
      delete updatedQrCodes[idToRemove];
      return updatedQrCodes;
    });
  };

  const handleNext = async () => {
    if (imageShow.length > 0) {
      // Create a new object to store the final merged images
      const finalMergedImages = {};

      // Process all images based on handleClickButton state
      for (const image of imageShow) {
        const qrCode = qrCodes[image.id];
        if (handleClickButton) {
          finalMergedImages[image.id] = await mergeImagesOff(image.url, qrCode, image.id);
        } else {
          finalMergedImages[image.id] = await mergeImagesOn(image.url, qrCode, image.id);
        }
      }

      // Navigate with the correct merged images
      navigate("/categories", {
        state: {
          mergedImages: finalMergedImages,
          invitationText: invitationText,
          handleClickButton: handleClickButton // Pass the button state to know which layout was used
        },
      });
    }
  };
    
    return (
      <div className="min-h-screen bg-gray-50">
    {/* Header */}
    <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://mazoom-sandy.vercel.app/images/Home.svg" alt="QR Code" className="w-16 h-16" />
          </div>
          <div className="flex items-center space-x-4">
          <select className="text-sm border-none outline-none cursor-pointer bg-transparent">
          <option value="en">En</option>
          </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Balance: $0.00
            </button>
            <Settings onClick={()=> navigate('/setting')} className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </header>
   

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex-1">
          <div className="aspect-w-16 aspect-h-9 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
       {imageShow.length > 0 ? (
        <div className="flex flex-col gap-4">
          {imageShow.map((img, index) => (
            <div key={img.id} className="relative">
              <label htmlFor={`file-${img.id}`} className="block">
                <img
                  className="w-full h-[400px] rounded-md object-cover"
                  src={img.url}
                  alt={`Uploaded preview ${index + 1}`}
                />
              {!handleClickButton && (
                <>
                <div className='flex justify-start items-start'> 
                {qrCodes[img.id] && (
                  <img
                  src={qrCodes[img.id]}
                  alt={`QR Code for image ${index + 1}`}
                  className="absolute top-2 left-2 w-20 h-20  p-1 rounded-md"
                  />
                )}
                <h2 className='absolute top-14 left-24 w-20 h-20'>name</h2>
              </div>
                <img
                className="absolute top-2 right-10 w-[70px] h-[70px]"
                src="https://mazoom-sandy.vercel.app/images/Frame.svg"
                alt="Frame"
                />
                </>
              )}
              </label>
              <input
                type="file"
                id={`file-${img.id}`}
                className="hidden"
                onChange={(e) => changeImage(e.target.files[0], index)}
              />
              <span
                onClick={() => removeImage(index)}
                className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-2 right-2 rounded-full"
              >
                <IoMdCloseCircle />
              </span>
              {handleClickButton && <div className='flex justify-between'>
                <div className='flex justify-start items-start'> 
              {qrCodes[img.id] && (
                <div className="mt-4">
                  <img
                    src={qrCodes[img.id]}
                    alt={`QR Code for image ${index + 1}`}
                    className="w-20 h-20"
                  />
                  
                </div>
              )}
              <h2 className=''>name</h2>
              </div>
              <img className='mt-4 w-[70px] h-[70px]' src="https://mazoom-sandy.vercel.app/images/Frame.svg" />
              </div>}
              
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-6 h-6 text-gray-400" />
          <p className="text-sm text-center">Click or Drop Images Here</p>
          <p className="text-xs text-gray-500">
            Allowed image formats are JPG, PNG, JPEG. Up to 5 Mb
          </p>
          <label
            htmlFor="image-upload"
            className="mt-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Select file
          </label>
        </div>
      )}
      <input
        onChange={imageHandle}
        multiple
        type="file"
        id="image-upload"
        className="hidden"
        accept="image/*"
      />
    </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="bg-gray-100 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Colors
              </label>
              <ColorPickers />
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Invitation Text
            </label>
            <textarea
              value={invitationText}
              onChange={(e) => setInvitationText(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your invitation text here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fonts
            </label>
            <FontSelector />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Name/number outside the image</span>
              <button
                onClick={() => setHandleClickButton(!handleClickButton)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  handleClickButton ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    handleClickButton ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Remove logo for 49 S.R.</span>
              <button
                onClick={() => setRemoveLogo(!removeLogo)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  removeLogo ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    removeLogo ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <button
          onClick={handleNext}
          disabled={imageShow.length === 0 || !invitationText.trim()}
          className={`w-full py-3 px-4 rounded-md transition-colors ${
            imageShow.length > 0 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}>
            Next
          </button>
        </div>
      </div>
    </main>
  </div>

    );
  }

  export default UploadImage;