export const getAllTests = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.status >= 500) {
      throw new Error('Server down');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
