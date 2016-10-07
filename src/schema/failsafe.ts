/**
 * Standard YAML's Failsafe schema.
 * http://www.yaml.org/spec/1.2/spec.html#id2802346
 */

import { Schema } from '../schema';
import { mapType } from '../type/map';
import { seqType } from '../type/seq';
import { strType } from '../type/str';

export const failsafeSchema = new Schema({
  explicit: [
    mapType,
    seqType,
    strType
  ]
});
