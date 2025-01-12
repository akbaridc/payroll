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
  

const generateRandomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export { extractUrls, generateRandomString };