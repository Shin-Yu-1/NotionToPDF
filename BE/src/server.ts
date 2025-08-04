import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { generatePDF } from "./generate";
import { isValidNotionUrl } from "./util";

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Notion to PDF Converter API" });
});

app.post("/api/convert", async (req: Request, res: Response) => {
  const { notionUrl } = req.body;

  if (!notionUrl || !isValidNotionUrl(notionUrl)) {
    return res.status(400).send("Invalid Notion URL");
  }

  try {
    const pdf = await generatePDF(notionUrl);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="notion.pdf"',
    });
    res.send(pdf);
  } catch (error) {
    res.status(500).send("PDF generation failed");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
