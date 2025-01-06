import QRCode from "qrcode";

// Helper function to load images
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const mergeImagesOn = async (mainImageUrl, qrCodeUrl, removeLogo = false) => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Load all images
    const [mainImage, qrCode, frameLogo] = await Promise.all([
      loadImage(mainImageUrl),
      loadImage(qrCodeUrl),
      loadImage("/images/Frame.svg"),
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
    return canvas.toDataURL("image/png");
  } catch (err) {
    console.error("Error merging images:", err);
    return null;
  }
};

export const mergeImagesOff = async (mainImageUrl, qrCodeUrl, removeLogo = false) => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Load all images
    const [mainImage, qrCode, frameLogo] = await Promise.all([
      loadImage(mainImageUrl),
      loadImage(qrCodeUrl),
      loadImage("/images/Frame.svg"),
    ]);

    // Calculate dimensions
    const padding = 20;
    const qrSize = 250;
    const bottomHeight = qrSize + padding * 2;

    canvas.width = mainImage.width;
    canvas.height = mainImage.height + bottomHeight;

    // Draw main image
    ctx.drawImage(mainImage, 0, 0);

    // Draw bottom section background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, mainImage.height, canvas.width, bottomHeight);

    // Draw QR code on the left side of bottom section
    ctx.drawImage(
      qrCode,
      padding,
      mainImage.height + padding,
      qrSize,
      qrSize
    );

    // Draw frame logo on the right side if not removed
    if (!removeLogo) {
      ctx.drawImage(
        frameLogo,
        canvas.width - qrSize - padding,
        mainImage.height + padding,
        qrSize,
        qrSize
      );
    }

    return canvas.toDataURL("image/png");
  } catch (err) {
    console.error("Error merging images:", err);
    return null;
  }
};

export const generateQRCode = async (url, text = "") => {
  try {
    const qrContent = `${text} | ${url}`;
    return await QRCode.toDataURL(qrContent);
  } catch (err) {
    console.error("Error generating QR code:", err);
    return null;
  }
};