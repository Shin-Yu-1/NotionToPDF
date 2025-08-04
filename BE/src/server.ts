import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { generatePDF } from "./services/pdfService";
import { isValidNotionUrl } from "./utils/util";
import type { ConvertRequest } from "./types/request.types";

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Notion to PDF Converter API" });
});

app.post(
  "/api/convert",
  async (req: Request<{}, Buffer, ConvertRequest>, res: Response) => {
    const { notionUrl } = req.body;

    if (!notionUrl || !isValidNotionUrl(notionUrl)) {
      return res.status(400).send("Invalid Notion URL");
    }

    try {
      const startTime = Date.now();
      const pdf = await generatePDF(notionUrl);
      const duration = Date.now() - startTime;

      console.log(
        `PDF generated successfully in ${duration}ms, size: ${pdf.length} bytes`
      );

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="notion-${Date.now()}.pdf"`,
      });
      res.send(pdf);
    } catch (error) {
      res.status(500).send("PDF generation failed");
    }
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
