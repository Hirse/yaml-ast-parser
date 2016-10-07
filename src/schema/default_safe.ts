/**
 * JS-YAML's default schema for `safeLoad` function.
 * It is not described in the YAML specification.
 *
 * This schema is based on standard YAML's Core schema and includes most of
 * extra types described at YAML tag repository. (http://yaml.org/type/)
 */

import { Schema } from '../schema';
import { binaryType } from '../type/binary';
import { mergeType } from '../type/merge';
import { omapType } from '../type/omap';
import { pairsType } from '../type/pairs';
import { setType } from '../type/set';
import { timestampType } from '../type/timestamp';
import { coreSchema } from './core';

export const defaultSafeSchema = new Schema({
  include: [
    coreSchema
  ],
  implicit: [
    timestampType,
    mergeType
  ],
  explicit: [
    binaryType,
    omapType,
    pairsType,
    setType
  ]
});
