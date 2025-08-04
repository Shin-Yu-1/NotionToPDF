import puppeteer from "puppeteer";
import type { notionUrl } from "../types/request.types";

export async function generatePDF(notionUrl: notionUrl): Promise<Uint8Array> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.goto(notionUrl, { waitUntil: "networkidle0" });

    // PDF 생성 (A4, 지정된 여백)
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
}
