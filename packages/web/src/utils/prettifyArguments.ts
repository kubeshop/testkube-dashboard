export const prettifyArguments = (args: string) =>
  args
    .replace(/(".*?")|('.*?')|\s/g, (_: string, str1: string, str2: string) => str1 || str2 || '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
