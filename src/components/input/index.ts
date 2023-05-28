import Block from '../../utils/Block';
import template from './input.hbs';

type InputMode = 'default' | 'error';

export interface IInputProps {
  mode: InputMode,
  name: string,
  label: string,
  isPassword: boolean,
  value: string,
  disabled: boolean,
  errorMessage: string,
  events: {
      focusin: (evt: FocusEvent) => void,
      focusout: (evt: FocusEvent) => void
  }
}

export class Input extends Block {
  constructor(props: IInputProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

