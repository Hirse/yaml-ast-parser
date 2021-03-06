import { Type } from '../type';

let _toString = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (null === data) {
    return true;
  }

  let index, length, pair, keys, result,
    object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if ('[object Object]' !== _toString.call(pair)) {
      return false;
    }

    keys = Object.keys(pair);

    if (1 !== keys.length) {
      return false;
    }

    result[index] = [keys[0], pair[keys[0]]];
  }

  return true;
}

function constructYamlPairs(data) {
  if (null === data) {
    return [];
  }

  let index, length, pair, keys, result,
    object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [keys[0], pair[keys[0]]];
  }

  return result;
}

export const pairsType = new Type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
