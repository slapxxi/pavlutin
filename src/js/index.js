import $ from 'jquery';

$(document).ready(() => {
  const $headings = $('.layout-content')
    .find('h1,h2,h3,h4,h5,h6')
    .not('.title__main, .title__secondary');

  $headings.each(function(i, heading) {
    const $heading = $(heading);
    const attr = toUniqueID(i, $heading.text());
    const Link = $(`<a class="anchor" href="#${attr}">#</a>`);
    $heading.addClass('anchor__hook');
    $heading.attr('id', attr);
    $heading.prepend(Link);
  });
});

function toUniqueID(id, text) {
  return '_section__' + id + '__' + toDashCase(text);
}

function toDashCase(text) {
  return text.replace(' ', '-').toLowerCase();
}
