import puppeteer from "puppeteer";
import type { NotionUrl } from "../types/request.types";

export const generatePDF = async (notionUrl: NotionUrl) => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(notionUrl, { waitUntil: "networkidle2" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        top: "25mm",
        bottom: "25mm",
        left: "20mm",
        right: "20mm",
      },
      printBackground: true,
    });
    return pdfBuffer;
  } finally {
    await browser.close();
  }
};
