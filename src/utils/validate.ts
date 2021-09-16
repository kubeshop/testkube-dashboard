export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
   "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    "((\\d{1,3}\\.){3}\\d{1,3}))" +
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    "(\\?[;&a-z\\d%_.~+=-]*)?" +
    "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(url);
};

export const getQueryStringFromUrl = (url: string) => {
  const params = new URL(url).searchParams;
  return params.get('apiEndpoint');
};
