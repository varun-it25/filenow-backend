export function formatFileSize(bytes) {
    if (bytes < 1024) {
      return `${bytes.toFixed(2)} bytes`;
    } else if (bytes < 1048576) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(bytes / 1048576).toFixed(2)} MB`;
    }
  }