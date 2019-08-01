$(function() {
  var $overlay = $('.overlay'),
    $overlayTrigger = $('.overlay-trigger button'),
    $overlayClose = $('.overlay-close'),
    openClass = 'is-open';

  $overlayTrigger.on('click', function() {
    var num = ('0' + ($(this).index() + 1)).slice(-2);
    $('.overlay' + num).addClass(openClass);
    $overlayClose.addClass(openClass);
  });

  $overlayClose.on('click', function() {
    $overlayClose.removeClass(openClass);
    $overlay.removeClass(openClass);
  });
});