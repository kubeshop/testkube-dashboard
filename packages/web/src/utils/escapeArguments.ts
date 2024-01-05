export const escapeArguments = (args: string[]) => {
  return args.map(arg => (arg.includes(' ') ? `"${arg}"` : arg));
};
