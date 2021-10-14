export const Timeout = (time: number) => {
	let controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);

	return controller;
};

export const getAllTests = async (url: string) => {
  try {
    const response = await fetch(url, {signal: Timeout(10).signal});
    if (response.status >= 400) {
      throw new Error('Server down');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
