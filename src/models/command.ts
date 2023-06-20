import Colors from '@styles/Colors';

export const literalToColor: Record<string, Colors> = {
  kubectl: Colors.indigo300,
  testkube: Colors.indigo300,
  helm: Colors.indigo300,
  install: Colors.amber300,
  repo: Colors.amber300,
  context: Colors.amber300,
  apply: Colors.amber300,
  update: Colors.amber300,
  add: Colors.slate400,
  get: Colors.slate400,
  set: Colors.slate400,
  run: Colors.slate400,
  download: Colors.slate400,
  delete: Colors.slate400,
  upgrade: Colors.slate400,
  connect: Colors.amber400,
  cloud: Colors.amber400,
  environment: Colors.amber400,
  init: Colors.amber400,
  brew: Colors.indigo300,
  choco: Colors.indigo300,
  curl: Colors.indigo300,
  wget: Colors.indigo300,
  sh: Colors.indigo300,
  sudo: Colors.indigo300,
  echo: Colors.amber400,
  source: Colors.amber400,
};

export const getLiteralColor = (literal: string): Colors => {
  return literalToColor[literal] || Colors.whitePure;
};
