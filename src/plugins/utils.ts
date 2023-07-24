export const orderArray = (array: any[]) => {
  const result: any[] = [];
  array.forEach((item: any) => {
    if (!item) {
      return;
    }
    const index = result.findIndex(x => x.metadata.order < item.metadata.order);
    if (index === -1) {
      result.push(item);
    } else {
      result.splice(index, 0, item);
    }
  });
  return result.map(x => x.value);
};
