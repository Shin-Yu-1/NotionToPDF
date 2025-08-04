export type notionUrl = string;

export type options = {
  format?: "A4" | "Letter";
};

export interface ConvertRequest {
  notionUrl: notionUrl;
  options?: options;
}
