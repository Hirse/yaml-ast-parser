import * as common from './common';
import { YAMLException } from './exception';
import { Type } from './type';

function compileList(schema, name, result) {
  let exclude = [];

  schema.include.forEach((includedSchema) => {
    result = compileList(includedSchema, name, result);
  });

  schema[name].forEach((currentType) => {
    result.forEach((previousType, previousIndex) => {
      if (previousType.tag === currentType.tag) {
        exclude.push(previousIndex);
      }
    });

    result.push(currentType);
  });

  return result.filter((type, index) => {
    return -1 === exclude.indexOf(index);
  });
}

function compileMap(/* lists... */) {
  let result = {}, index, length;

  function collectType(type) {
    result[type.tag] = type;
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }

  return result;
}

export class Schema {
  public static DEFAULT = null;
  // tslint:disable-next-line only-arrow-functions
  public static create = function createSchema() {
    let schemas, types;

    switch (arguments.length) {
      case 1:
        schemas = Schema.DEFAULT;
        types = arguments[0];
        break;

      case 2:
        schemas = arguments[0];
        types = arguments[1];
        break;

      default:
        throw new YAMLException('Wrong number of arguments for Schema.create function');
    }

    schemas = common.toArray(schemas);
    types = common.toArray(types);

    if (!schemas.every((schema) => { return schema instanceof Schema; })) {
      throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
    }

    if (!types.every((type) => { return type instanceof Type; })) {
      throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    return new Schema({
      include: schemas,
      explicit: types
    });
  };

  public include: any[];
  public implicit: any[];
  public explicit: any[];

  public compiledImplicit: any[];
  public compiledExplicit: any[];
  public compiledTypeMap: any[];

  constructor(definition: any) {
    this.include = definition.include || [];
    this.implicit = definition.implicit || [];
    this.explicit = definition.explicit || [];

    this.implicit.forEach((type) => {
      if (type.loadKind && 'scalar' !== type.loadKind) {
        throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
      }
    });

    this.compiledImplicit = compileList(this, 'implicit', []);
    this.compiledExplicit = compileList(this, 'explicit', []);
    this.compiledTypeMap = (<any> compileMap)(this.compiledImplicit, this.compiledExplicit);
  }
}
