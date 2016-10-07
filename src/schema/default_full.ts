/**
 * JS-YAML's default schema for `load` function.
 * It is not described in the YAML specification.
 *
 * This schema is based on JS-YAML's default safe schema and includes
 * JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
 *
 * Also this schema is used as default base schema at `Schema.create` function.
 */

import { Schema } from '../schema';
import { regexpType } from '../type/js/regexp';
import { undefinedType } from '../type/js/undefined';
import { defaultSafeSchema } from './default_safe';

export const defaultFullSchema = new Schema({
  include: [
    defaultSafeSchema
  ],
  explicit: [
    undefinedType,
    regexpType
  ]
});
