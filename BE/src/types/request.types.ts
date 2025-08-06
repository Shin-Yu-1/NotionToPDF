export type NotionUrl = string;

export interface ConvertRequest {
  data: {
    notionUrl: NotionUrl;
  };
}
