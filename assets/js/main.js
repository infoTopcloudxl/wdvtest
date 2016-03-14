jQuery(document).ready(function($) {
	'use strict';
    
    var ASSETS_PATH = $('#basekit-variables').attr('data-assets-path');
    
    function asset(assetPath) {
        return ASSETS_PATH + assetPath;
    }
    
  // slider section
	$('#rex-owl-example').owlCarousel({
		singleItem : true,
		transitionStyle : 'fade',
		navigation : false,
    navigationText : ['<i class="fa fa-angle-left rx-angle-left-slider"></i>','<i class="fa fa-angle-right rx-angle-right-slider"></i>'],
    pagination : false,
    responsive : true
	});

 	// Testimonial section
	$('#rex-testimonial').owlCarousel({
		navigation : false,
		singleItem : true,
		transitionStyle : 'fade',
		pagination : true,
		navigationText : false,
		autoPlay : true
	});

 	// Client Slider
	$('#rex-Client').owlCarousel({
	    autoPlay: false, //Set AutoPlay to 3 seconds
	    navigation : true,
	    navigationText : ['<i class="fa fa-angle-left rx-angle-left"></i>','<i class="fa fa-angle-right rx-angle-right"></i>'],
	    pagination : false,
	    slideSpeed : 600,
	    paginationSpeed : 400,
	    items : 6,
	    loop: true,
	    responsiveClass:true,
	    responsive: {
	      0:{
	        items : 1
	      },
	      480:{
	        items : 2
	      },
	      768:{
	        items : 4
	      },
	      1200:{
	        items: 6
	      }
	    }
	  });

  /**
   * Blog Slider
   */
  $('#rx-blog-slider').owlCarousel({
    autoPlay: true, //Set AutoPlay to 3 seconds
    nav : true, // Show next and prev buttons
    navText : false,
    pagination : false,
    slideSpeed : 600,
    paginationSpeed : 400,
    dots : false,
    items : 1,
    itemsDesktop : [1000,1], //5 items between 1000px and 901px
    itemsDesktopSmall : [900,1], // betweem 900px and 601px
    itemsTablet: [600,1], //2 items between 600 and 0
    itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
  });

	// Smooth Scrolling
  $('.slimmenu li a').on( 'click', function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      var offset = $(target).data('scrolloffset') ? $(target).data('scrolloffset') : 0;
      console.log(offset);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top -offset
        }, 1000);
        return false;
      }
    }
  });

    $('.rex-testimonial').parallax({
        imageSrc: asset('/assets/images/klantenervaring/klantenervaring.png'),
    });

	// Fire UP Search
  $('a[href="#search"]').on('click', function(event) {
    event.preventDefault();
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus().attr('placeholder', '');
  });

  $('#search, #search button.close').on('click keyup', function(event) {
    if (event.target === this || event.target.className === 'close' || event.keyCode === 27) {
      $(this).removeClass('open');
    }
  });



  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }

  // custom formatting example
  $('.count-title').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });

  var waypoints = $('#achievment').waypoint({
    handler: function(down) {
      // start all the timers
      $('.timer').each(count);
      this.destroy();
    },
    offset: 600
  });

	/* Contact form hover effect class */
  $('form')
  	.on('focus', 'input,textarea', function(){
  		$(this).prev('i.fa').addClass('focus');
  	})
  	.on('blur', 'input,textarea', function(){
  		$(this).prev('i.fa').removeClass('focus');
  	});

	// Sticky Nav
	$('#rex-sticke-nav').sticky({topSpacing:0});

	/**
   * Modify navigation href on single pages
   */
  if( $('body').hasClass('single') ) {
    var $links = $('#rex-navigation li a');
    $links.each(function () {
      var currentHref = $(this).attr('href');
      $(this).attr('href', './' + currentHref);
    });
  }

	/**
   * Show & Hide back-to-top Button
   */
  $('.backtop').hide();
  $(window).on( 'scroll', function(){
    if ($(this).scrollTop() > 400) {
      $('.backtop').fadeIn();
    } else {
      $('.backtop').fadeOut();
    }
  });
  //Click event to scroll to top
  $('.backtop').on( 'click', function(){
    $('html, body').animate({scrollTop : 0},2500);
    return false;
  });


  new WOW().init();

	// slimmenu js
	var $slimmenu = $('#rex-navigation').slimmenu({
    resizeWidth: '800',
    collapserTitle: '',
    animSpeed: 'medium',
    easingEffect: null,
    indentChildren: false,
    childrenIndenter: false
	});

  var $menuCollapser = $('.rex-navigation-area').find('.menu-collapser');
  $menuCollapser.on('click', function(event) {
    $slimmenu.toggleClass('nav-collapsed nav-open');
  });

  $('body').on('click', function(event) {
    var $target = $(event.target);

    if ( $slimmenu.hasClass('nav-open') && !$target.closest($menuCollapser).length) {
      $slimmenu.slideToggle();
      $slimmenu.toggleClass('nav-collapsed nav-open');
    }
  });


    // DOM Content Load Event Actions;
  $( window ).load(function() {
    $('div.loading').remove();
    $('body').removeClass('loading');
  });


  $('html').niceScroll();


}); // End Ready
