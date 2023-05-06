import Handlebars from "handlebars";
import template from './cat-card.hbs';
import catImage from '../static/cat2.webp';

window.addEventListener('load', () => {
    const rootNode = document.getElementById('root');
    rootNode.innerHTML = template({text: 'World', image: catImage});
})