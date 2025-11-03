export const getFolderName = (fileType) => {
    let folder = "others";

    if (fileType.startsWith("image/")) folder = "images";
    if (fileType.startsWith("video/")) folder = "videos";
    if (fileType.startsWith("audio/")) folder = "audios";
    if (fileType.startsWith("application/pdf") || 
        fileType.includes("word") || 
        fileType.startsWith("text/plain")) folder = "files";
    
    return folder;
}
