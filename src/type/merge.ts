import { Type } from '../type';

function resolveYamlMerge(data) {
  return '<<' === data || null === data;
}

export const mergeType = new Type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});
