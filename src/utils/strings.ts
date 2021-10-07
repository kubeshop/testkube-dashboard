export const truncateText = (text: string) => {
  if (text.length > 10) {
    return `${text.substring(0, 10)}...`;
  }
  return text;
};

export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
