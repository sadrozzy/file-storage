export const isImage = (ext: string | undefined) => {
    return ["jpg", "jpeg", "png", "gif"].includes(ext ?? '');
};