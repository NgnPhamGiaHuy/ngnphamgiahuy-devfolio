export const buildShareLinks = (url: string, title: string) => {
    const shareText = encodeURIComponent(title || "");
    const shareUrl = encodeURIComponent(url || "");
    return {
        x: `https://x.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    } as const;
};
