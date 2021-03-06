import { YAMLException } from './exception';

let TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'defaultStyle',
  'styleAliases'
];

let YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  let result = {};

  if (null !== map) {
    Object.keys(map).forEach((style) => {
      map[style].forEach((alias) => {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

export function Type(tag, options): void {
  options = options || {};

  Object.keys(options).forEach((name) => {
    if (-1 === TYPE_CONSTRUCTOR_OPTIONS.indexOf(name)) {
      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.tag          = tag;
  this.kind         = options.kind         || null;
  this.resolve      = options.resolve      || (() => { return true; });
  this.construct    = options.construct    || ((data) => { return data; });
  this.instanceOf   = options.instanceOf   || null;
  this.predicate    = options.predicate    || null;
  this.represent    = options.represent    || null;
  this.defaultStyle = options.defaultStyle || null;
  this.styleAliases = compileStyleAliases(options.styleAliases || null);

  if (-1 === YAML_NODE_KINDS.indexOf(this.kind)) {
    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
