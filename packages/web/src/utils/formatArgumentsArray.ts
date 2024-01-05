export const formatArgumentsArray = (args: string[]) => {
  return args.map(arg => (arg.includes(' ') ? `"${arg}"` : arg));
};
