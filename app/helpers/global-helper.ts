/* eslint-disable @typescript-eslint/no-explicit-any */
const extractUrls = (items: { url: string, items?: any[] }[], baseUrl: string = ''): string[] => {
    const urls: string[] = [];

    items.forEach((item) => {
        const currentUrl = baseUrl + item.url;
        urls.push(currentUrl);

        // If there are nested items, recurse into them
        item.items?.forEach((nestedItem) => {
            urls.push(...extractUrls([nestedItem], currentUrl));  // Recursively process nested items
        });
    });

    return urls;
};
  

export { extractUrls };