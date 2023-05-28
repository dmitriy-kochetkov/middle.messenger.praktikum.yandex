import Block from '../../utils/Block';
import template from './input.hbs';

type InputMode = 'default' | 'error';

interface IInputProps {
  mode: InputMode,
  name: string,
  label: string,
  isPassword: boolean,
  value: string,
  disabled: boolean,
  errorMessage: string
  events: {
    click: (evt: PointerEvent) => void,
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

