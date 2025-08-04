export interface ConvertRequest {
  notionUrl: string;
  options?: {
    format?: "A4" | "Letter";
  };
}
