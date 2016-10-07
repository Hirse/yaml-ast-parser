import { Mark } from './mark';

export class YAMLException {
  public message: string;
  public reason: string;
  public name: string;
  public mark: Mark;

  constructor(reason: string, mark: Mark = null) {
    this.name = 'YAMLException';
    this.reason = reason;
    this.mark = mark;
    this.message = this.toString(false);
  }

  public toString(compact: boolean = false) {
    let result = 'JS-YAML: ' + (this.reason || '(unknown reason)');

    if (!compact && this.mark) {
      result += ' ' + this.mark.toString();
    }

    return result;
  }
}
