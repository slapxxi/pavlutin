$(function() {
  $('body').addClass('js');

  const $header = $('.header');
  const $nav = $header.find('> .nav');
  const $menu = $('<button class="btn-menu header__menu"></button>');

  $menu.on('click.menu', function(e) {
    $(this).toggleClass('btn-menu_active');
    $header.toggleClass('header_fullscreen');
    $header.siblings().toggle();
    return false;
  });

  $(window).on('resize.menu', function(e) {
    const mq = window.matchMedia('(min-width: 600px)');
    if (mq.matches && $header.hasClass('header_fullscreen')) {
      $menu.trigger('click.menu');
    }
  });

  $header.prepend($menu);
});
