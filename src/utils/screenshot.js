import html2canvas from "html2canvas";

export const captureScreenshot = async (canvasElement) => {
    try {
        const canvas = await html2canvas(canvasElement);
        return canvas.toDataURL("image/png"); // Base64 screenshot
    } catch (error) {
        console.error("Error capturing screenshot:", error);
        return null;
    }
};
