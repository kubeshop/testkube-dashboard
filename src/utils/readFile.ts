function readFile<T>(blob: Blob, operation: 'readAsText'): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (reader.error) {
        reject(reader.error);
      } else {
        resolve(reader.result as any);
      }
    });

    reader.addEventListener('error', (error) => {
      reject(error);
    });

    reader[operation](blob);
  });
}

export const readAsText = (blob: Blob) => readFile(blob, 'readAsText');
