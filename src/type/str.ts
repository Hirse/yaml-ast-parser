import { Type } from '../type';

export const strType = new Type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: (data) => {
    return null !== data ? data : '';
  }
});
