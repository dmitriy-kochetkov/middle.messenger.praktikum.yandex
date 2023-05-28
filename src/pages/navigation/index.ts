import Block from '../../utils/Block';
import template from './navigation.hbs';

type link = {
  link: string;
  label: string;
};

interface INavigationPageProps {
  pages: link[];
}

export class NavigationPage extends Block {
  constructor(props: INavigationPageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props)
  }
}
