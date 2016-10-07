/**
 * Standard YAML's JSON schema.
 * http://www.yaml.org/spec/1.2/spec.html#id2803231
 *
 * NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
 * So, this schema is not such strict as defined in the YAML specification.
 * It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.
 */

import { Schema } from '../schema';
import { boolType } from '../type/bool';
import { floatType } from '../type/float';
import { intType } from '../type/int';
import { nullType } from '../type/null';
import { failsafeSchema } from './failsafe';

export const jsonSchema = new Schema({
  include: [
    failsafeSchema
  ],
  implicit: [
    nullType,
    boolType,
    intType,
    floatType
  ]
});
