import * as esprima from 'esprima';

import { Type } from '../../type';

function resolveJavascriptFunction(data) {
  if (null === data) {
    return false;
  }

  try {
    let source = '(' + data + ')',
        ast    = esprima.parse(source, { range: true });

    if ('Program'             !== ast.type         ||
        1                     !== ast.body.length  ||
        'ExpressionStatement' !== ast.body[0].type ||
        'FunctionExpression'  !== ast.body[0]['expression'].type) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}

function constructJavascriptFunction(data) {

  let source = '(' + data + ')',
      ast    = esprima.parse(source, { range: true }),
      params: string[] = [],
      body;

  if ('Program'             !== ast.type         ||
      1                     !== ast.body.length  ||
      'ExpressionStatement' !== ast.body[0].type ||
      'FunctionExpression'  !== ast.body[0]['expression'].type) {
    throw new Error('Failed to resolve function');
  }

  ast.body[0]['expression'].params.forEach((param) => {
    params.push(param.name);
  });

  body = ast.body[0]['expression'].body.range;

  // Esprima's ranges include the first '{' and the last '}' characters on
  // function expressions. So cut them out.
  return new (<any> Function)(params, source.slice(body[0] + 1, body[1] - 1));
}

function representJavascriptFunction(object /*, style*/) {
  return object.toString();
}

function isFunction(object) {
  return '[object Function]' === Object.prototype.toString.call(object);
}

export const functionType = new Type('tag:yaml.org,2002:js/function', {
  kind: 'scalar',
  resolve: resolveJavascriptFunction,
  construct: constructJavascriptFunction,
  predicate: isFunction,
  represent: representJavascriptFunction
});
