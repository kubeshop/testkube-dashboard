export const testEndpoint = 'http://localhost:4000/executions';

export const getAllTests = async () => {
  try {
    const response = await fetch(testEndpoint);
    if (response.status >= 500) {
      throw new Error('Server down');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
