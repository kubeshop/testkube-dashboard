export const prettifyArguments = (args: string) =>
  Array.from(args.match(/(\\.|("(\\.|[^"])*")|('(\\.|[^'])*')|\S)+/g) || [])
    .map(x => x.trim())
    .join('\n');
