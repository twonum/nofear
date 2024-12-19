// Function to capture a screenshot from the canvas
//@ts-ignore
export const captureScreenshot = async (canvas) => {
  if (!canvas) {
    console.error("Canvas not defined.");
    return null;
  }
  try {
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    return null;
  }
};

// Function to compile the email body
export const compileEmailBody = (category: string, screenshot: string) => {
  const sanitizedCategory = category
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `
      <p>Hello,</p>
      <p>An object of category <strong>${sanitizedCategory}</strong> has been detected.</p>
      <p>Screenshot:</p>
      <img src="${screenshot}" alt="Detection Screenshot" />
      <p>Best wishes,<br>No Fear 😎 Team</p>
    `;
};
