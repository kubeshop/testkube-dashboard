export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
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

export const matchUrlProtocol = (url: string) => {
  const hostProtocol = window.location.protocol;
  if (!url) {
    alert("Invalid URL, You are trying to manipulate the url, please provide a correct url endpoint");
  }

  const apiEndpointProtocol = new URL(url).protocol;

  if (hostProtocol !== apiEndpointProtocol) {
    const matchedUrlProtocol = url.replace(apiEndpointProtocol, hostProtocol);
    localStorage.setItem('apiEndpoint', matchedUrlProtocol);
    return;
  }

  localStorage.setItem('apiEndpoint', url);
};
