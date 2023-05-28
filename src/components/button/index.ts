import Block from '../../utils/Block';
import template from './button.hbs';

type ButtonMode = 'primary' | 'secondary';

interface IButtonProps {
  label: string,
  submit: boolean,
  mode: ButtonMode
  events: {
      click: (evt: PointerEvent) => void,
  }
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}
