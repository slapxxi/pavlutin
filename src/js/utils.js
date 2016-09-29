import $ from 'jquery';


export function addAnchor(heading, id) {
  const $heading = $(heading);
  const attr = toUniqueID(id, $heading.text());
  const Link = $(`<a class="anchor" href="#${attr}">#</a>`);
  $heading.attr('id', attr);
  $heading.append(Link);
}

export function toUniqueID(id, text) {
  return '_section__' + id + '__' + toDashCase(text);
}

function toDashCase(text) {
  return text.replace(' ', '-').toLowerCase();
}
