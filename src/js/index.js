import $ from 'jquery';
import { addAnchor } from './utils';


$(document).ready(() => {
  const $headings = $('.layout-content')
    .find('h1,h2,h3,h4,h5,h6')
    .not('.title__main, .title__secondary');

  $headings.each((i, h) => {addAnchor(h, i)});
});
