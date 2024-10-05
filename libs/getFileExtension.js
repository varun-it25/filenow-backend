export function getFileExtension(file) {
    return file.originalname.split(".").pop();
}