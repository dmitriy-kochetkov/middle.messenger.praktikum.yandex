import Block from '../../utils/Block';
import template from './input.hbs';


export interface IInputProps {
    label: string,
    name: string,
    type: "text" | "password",
    value: string,
    disabled: boolean,
    danger: boolean,
    enableErrorMessage: boolean,
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

