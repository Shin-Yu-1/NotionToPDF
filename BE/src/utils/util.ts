export const isValidNotionUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    return (
      urlObj.hostname.includes("notion.so") ||
      urlObj.hostname.includes("notion.site")
    );
  } catch {
    return false;
  }
};
