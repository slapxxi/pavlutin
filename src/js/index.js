import $ from 'jquery';
import { addAnchors } from './utils';


$(document).ready(() => {
  addAnchors();

  const $header = $('.l-header');
  const $nav = $header.find('> .nav');
  const $menu = $('<a href="#" class="button">Menu</a>');

  $menu.on('click', function(e) {
    $(this).text(toggleText);
    $header.toggleClass('l-header_fullscreen');
    $header.siblings().toggle();
    return false;
  });

  $header.addClass('l-header_dynamic');
  $header.prepend($menu);
});

function toggleText(i, text) {
  return text.toLowerCase() === 'menu' ? 'close' : 'menu';
}
