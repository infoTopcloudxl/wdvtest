// jQuery Wrapper
(function($) {
  "use strict";

  /*
   *----------------------------------------------------------------------
   * Document Ready
   *----------------------------------------------------------------------
   */
  $(document).ready(function() {

    /**
     * [stSwitcher description]
     */
    var stSwitcher = $('.rex-style-switcher');

    if(localStorage.getItem('rex-layout') !== null) {
      var layout = localStorage.getItem('rex-layout');

      $('body').removeClass('boxlayout').addClass(layout);
      $('.rex-layout').find('a').removeClass('active');
      $('.rex-layout').find('a.'+layout).addClass('active');
    }

    if(localStorage.getItem('rex-color') !== null) {
      $('head').append('<link class="rex-color-changer" rel="stylesheet" href="css/colors/color-'+localStorage.getItem('rex-color')+'.css">');
    }

    if(localStorage.getItem('rex-pattern') !== null) {
      if($('body').hasClass('boxed')){
        $('body').css('background-image', 'url(images/'+ localStorage.getItem('rex-pattern') +'.png)');
      }
    }



    $('.rex-settings').click(function(event) {
      event.preventDefault();

      if (stSwitcher.hasClass('open')) {
        stSwitcher.css('left', '-280px').removeClass('open').addClass('closed');
      }else{
        stSwitcher.css('left', '0').removeClass('closed').addClass('open');
      }
    });

    $('.rex-layout').on('click', 'a', function(event) {
      event.preventDefault();
      $('a.active').removeClass('active');
      $(this).addClass('active');
      localStorage.setItem('rex-layout', $(this).data('layout'));

      if( $(this).data('layout') == 'boxed' ){
        $('body').addClass('boxlayout');
        location.reload();
      }else if( $(this).data('layout') == 'wide' ){
        $('body').removeClass('boxlayout');
        location.reload();
      }
      $('body').removeClass('wide boxlayout').addClass($(this).data('layout'));
    });

    $('.rex-color a').each(function() {
      $(this).parent('li').css('background-color', $(this).data('color'));
    });

    $('.rex-color').on('click', 'a', function(event) {
      event.preventDefault();
      $('link.rex-color-changer').remove();
      localStorage.setItem('rex-color', $(this).data('color-name'));

      if ($(this).data('color-name') == 'orange') {return};
      $('head').append('<link class="rex-color-changer" rel="stylesheet" href="css/colors/color-'+$(this).data('color-name')+'.css">');
    });

    $('.rex-bg-pattern a').each(function() {
      $(this).parent('li').css('background-image', 'url(images/pattern_' + $(this).data('pattern') + '.png)');
    });

    $('.rex-bg-pattern').on('click', 'a', function(event) {
      event.preventDefault();

      if($('body').hasClass('boxed')){
        localStorage.setItem('rex-pattern', $(this).data('pattern'));
        $('body').css('background-image', 'url(images/'+ $(this).data('pattern') +'.png)');
      }

    });

  });// DOM Ready
}(jQuery));
