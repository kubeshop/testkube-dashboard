export const escapeArguments = (args: string[]) => {
  return args.map(arg => {
    const escapedArg = arg.replace(/(")/g, '\\$1');

    return /\s/.test(escapedArg) ? `"${escapedArg}"` : escapedArg;
  });
};
