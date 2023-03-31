import {Option} from '@models/form';
import {SourceWithRepository} from '@models/sources';

export const remapTestSources = (testSources: SourceWithRepository[]) => {
  if (!testSources || !testSources.length) {
    return [];
  }

  const array: Option[] = [];

  testSources.forEach(source => {
    const {name} = source;

    const optionValue = `$custom-git-dir-${name}`;
    const optionName = `Git source: ${name}`;

    array.push({value: optionValue, label: optionName});
  });

  return array;
};

export const testSourceBaseOptions: Option[] = [
  {value: 'git', label: 'Git'},
  {value: 'file-uri', label: 'File'},
  {value: 'string', label: 'String'},
];
