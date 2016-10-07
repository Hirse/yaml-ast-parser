import { Type } from '../type';

export const mapType = new Type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: (data) => { return null !== data ? data : {}; }
});
