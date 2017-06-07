/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:100,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn)}else{if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector})}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut})}}var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}})(jQuery);

/*
 * 
 * Essential custom jQuery JavaScript
 * 
 */
jQuery(function ($) {
	
	
	$('#best-home, #sale-home, #new-home, #featured-home, #product-thumbnails, .carusel, .simple-slider-posts').tinycarousel();
	
	
	$(window).resize(function() {
  		$('#best-home, #sale-home, #new-home, #featured-home, #product-thumbnails, .carusel').tinycarousel();
	});
	
	
	$(document).ready(function(){
		
		
	  /* 
	   * 
	   * Product image zooming
	   * 
	   */    	
    	$('#product-thumbnails a').live('click', function(event){
    		var img = $(this).attr('href');
    		var zoom_img = $(this).children('img').attr('data-zoom-image');
    		var ez = $('#big-image-product img').data('elevateZoom');
    		ez.swaptheimage(img, zoom_img); 
    		event.preventDefault();
    	});
    	

	  /* 
	   * 
	   * Product hover expanding circle
	   * 
	   */    	
    	$("ul.products li").hoverIntent(function(){
    	 	$(this).addClass('zoom');
    	 	var curent = $(this).children('.circle-wrapper');
    	 	curent.addClass('opened');
			curent.children('span').animate({height:750,width:750, right:-200, bottom:-200,opacity: 0.6,position:'absolute'},500,function(){
				curent.addClass('opened');
				curent.parent().children('.action-buttons').fadeIn(100);
				});
		  }, function(){
		  	$(this).removeClass('zoom');
		  	var curent = $(this).children('.circle-wrapper');
		  	curent.parent().children('.action-buttons').hide();
		  	curent.children('span').animate({height:10,width:10, right:10, bottom:15,opacity: 1,position:'absolute'},500, function(){
		  			curent.removeClass('opened'); 
		  			curent.parent().children('.action-buttons').hide();
		  		});		  	
		  });
		  

	  /* 
	   * 
	   * Menu items
	   * 
	   */		  
	  $("#topmenu ul li.has-submenu, #topmenu ul li.menu-parent-item ").hoverIntent(
	  		function(){
			  		$(this).children('ul').slideDown();
			  		$(this).addClass('hover');
		  		},
		  	function(){
		  		$(this).children('ul').slideUp();
		  		$(this).removeClass('hover');
		  	}
	  );
	  
	  
	  /* 
	   * 
	   * Show / hide search
	   * 
	   */		  
	   $('#topmenu .search').hoverIntent(
   			function(){
	    		var hidden = $(this).children('form');
        		 $(this).animate({"width":"295px"}, "slow");},
  			function(){
  				var hidden = $(this).children('form');
        		 $(this).animate({"width":"40px"}, "slow");}	  				
	   );
	
	
	  /* 
	   * 
	   * Contact form ajax sendmail
	   * 
	   */
	  $('#buttonsend').click( function() {
	
	    var siteurl = $('#siteurl').val();	
	    var name    = $('#name').val();
	    var email   = $('#email').val();
	    var message = $('#message').val();
	    var postid = $('#postid').val();		       
	    $('.loading').fadeIn('fast');
	    
	    if (name != "" &&  email != "" && message != ""){	
	      $.ajax({	      	
		        url: siteurl+'/sendemail.php',
		        type: 'POST',
		        data: "name=" + name + "&email=" + email + "&message=" + message +"&postid=" + postid ,
		        success: function(result){
		        	
		          $('.loading').fadeOut('fast');
		          if(result == "email_error") {
		            $('#email').val("invalid email address").css({"color":"#FF8C8C","border":"1px solid #FF8C8C"});
		          } else {
		            $('#name, #subject, #email, #message').val("");
		            $('#emailSuccess').show().fadeOut(6000, function(){ $(this).remove(); });
		          }
		          
		        }
	      });
	      return false;
	      	
	    } else {
	    	
	      $('.loading').fadeOut('fast');
	      if(name == "") $('#name').css({"border":"1px solid #FF8C8C"});
	      if(email == "" ) $('#email').css({"border":"1px solid #FF8C8C"});
	      if(message == "") $('#message').css({"border":"1px solid #FF8C8C"});
	      return false;
	      
	    }
	  });
	
	
	  /* 
	   * 
	   * Picture zooming
	   * 
	   */
		if ($.prototype.elevateZoom){    
			jQuery('#big-image-product img').elevateZoom({
		  			zoomType: 	"inner",
		  			cursor: 	"crosshair"
			});
		}	

	
	  /* 
	   * 
	   * Add to cart ajax
	   * 
	   */
		$('body').bind( 'added_to_cart', function( event, fragments, cart_hash ) {
			if ( fragments ) {
				$.each(fragments, function(key, value) {
					$(key).replaceWith(value);					
				});				
			}			
		});
		
		$('.add_to_cart_button').live('click',function (event) {
		 	var current = $(this);
		 	if (current.parent().hasClass('action-buttons') ){
				current.parent().parent().find('.removed-compare').remove();
				current.parent().parent().find('.added-compare').remove();
				current.parent().parent().find('.added-wishlist').remove();
				current.parent().parent().find('.removed-wishlist').remove();
			}
		 });	
		 
	
	  /* 
	   * 
	   * Home page tabs
	   * 
	   */
		$('.tab').click(function (event) {
			  var new_active = $(this).attr('data-rel');	
			  $('#tabs_container > .tab_navigation > li.active').removeClass('active');
			  $(this).parent().addClass('active');	
			  $('#tabs_container >  .active').fadeOut(800, function() {
			  		$('#tabs_container >  div').hide();
				  	$('#tabs_container >  .active').removeClass('active');
				  	$(new_active).fadeIn(800).addClass('active');
					$('.viewport').each( function( index ) {
						// Call touchSwipe script on each parallax-slider
						jQuery(this).swipe({
						 swipeLeft:  function() { $(this).parent().find('.buttons.next').click(); },
						 swipeRight: function() { $(this).parent().find('.buttons.prev').click(); },
						});
					});
				 });
			 event.preventDefault();	 	
		 });		 

	 
	  /* 
	   * 
	   * Add to wishlist
	   * 
	   */
		 $('.add-wishlist').live('click',function (event) {
		 	var current = $(this);
		 	var product_id = current.attr('data-product-id');
			$.ajax({				
				url: EssentialAjax.ajaxurl,
				type: 'post',
				data: {'product_id' : product_id, 'action' : 'add_to_wishlist', nonce : EssentialAjax.ajaxnonce},				 
				success: function(data) {
					if (current.parent().hasClass('action-buttons') ){
						current.removeClass('add-wishlist').addClass('remove-wishlist remove');
						current.parent().children('.removed-wishlist').remove();
						current.parent().parent().find('.removed-compare').remove();
						current.parent().parent().find('.added-compare').remove();
						current.parent().parent().find('.added_to_cart').remove();
						current.after('<span data-icon="&#xe077;" class="added-wishlist message">'+data+'</span>');
					}	else {
						current.parent().html('<span data-icon="&#xe077;">'+data+'</span>');
					}
				}
			});
			 event.preventDefault();	
		 });
		 
	 
	  /* 
	   * 
	   * Remove to wishlist
	   * 
	   */
		 $('.remove-wishlist').live('click',function (event) {
		 	var current = $(this);
		 	var product_id = current.attr('data-product-id');
			$.ajax({				
				url: EssentialAjax.ajaxurl,
				type: 'post',
				data: {'product_id' : product_id, 'action' : 'remove_from_wishlist', nonce : EssentialAjax.ajaxnonce},				 
				success: function(data) {
					if (current.parent().hasClass('action-buttons') ){
						current.removeClass('remove-wishlist remove').addClass('add-wishlist');
						current.parent().children('.added-wishlist').remove();
						current.parent().parent().find('.removed-compare').remove();
						current.parent().parent().find('.added-compare').remove();
						current.parent().parent().find('.added_to_cart').remove();
						current.after('<span data-icon="&#xe077;" class="removed-wishlist message">'+data+'</span>');
					}	else {
						current.parent().html('<span data-icon="&#xe077;">'+data+'</span>');
					}					
				}
			});
			 event.preventDefault();	
		 });
		 
	 
	  /* 
	   * 
	   * Empty wishlist
	   * 
	   */
		 $('.empty-wishlist').click(function (event) {
		 	var current = $(this);
			$.ajax({
				url: EssentialAjax.ajaxurl,
				type: 'post',
				data: {'action' : 'empty_wishlist', nonce : EssentialAjax.ajaxnonce},				 
				success: function(data) {
				current.parent().html('<span data-icon="&#xe077;">'+data+'</span>');
				window.setTimeout(function(){location.reload()},1000);	
				}
			});
			 event.preventDefault();	
		 });
		 
	 
	  /* 
	   * 
	   * Add to compare
	   * 
	   */
		 $('.add-compare').live('click',function (event) {
		 	var current = $(this);
		 	var product_id = current.attr('data-product-id');
			$.ajax({			
				url: EssentialAjax.ajaxurl,
				type: 'post',
				data: {'product_id' : product_id, 'action' : 'add_to_compare', nonce : EssentialAjax.ajaxnonce},				 
				success: function(data) {
					if (current.parent().hasClass('action-buttons') ){
						current.removeClass('add-compare').addClass('remove-compare remove');
						current.parent().children('.removed-compare').remove();
						current.parent().parent().find('.added-wishlist').remove();
						current.parent().parent().find('.removed-wishlist').remove();
						current.parent().parent().find('.added_to_cart').remove();
						current.after('<span data-icon="&#xe077;" class="added-compare message">'+data+'</span>');
					}	else {
						current.parent().html('<span data-icon="&#xe077;">'+data+'</span>');
					}
				}
			});
			 event.preventDefault();	
		 });


	  /* 
	   * 
	   * Remove from compare
	   * 
	   */
		 $('.remove-compare').live('click',function (event) {
		 	var current = $(this);
		 	var product_id = current.attr('data-product-id');
			$.ajax({				
				url: EssentialAjax.ajaxurl,
				type: 'post',
				data: {'product_id' : product_id, 'action' : 'remove_from_compare', nonce : EssentialAjax.ajaxnonce},				 
				success: function(data) {
					if (current.parent().parent().hasClass('compared-product') ){
						current.parent().parent().fadeOut();
					} else if (current.parent().hasClass('action-buttons') ){
						current.removeClass('remove-compare remove').addClass('add-compare');
						current.parent().children('.added-compare').remove();
						current.parent().parent().find('.added-wishlist').remove();
						current.parent().parent().find('.removed-wishlist').remove();
						current.parent().parent().find('.added_to_cart').remove();
						current.after('<span data-icon="&#xe077;" class="removed-compare message">'+data+'</span>');
					} else { 
						current.parent().html('<span data-icon="&#xe077;">'+data+'</span>');
					}					
				}
			});
			 event.preventDefault();	
		 });
	 
	  /* 
	   * 
	   * Empty compare
	   * 
	   */
		 $('.empty-compare').click(function (event) {
		 	var current = $(this);
			$.ajax({
				url: EssentialAjax.ajaxurl,
				type: 'post',
				data: {'action' : 'empty_compare', nonce : EssentialAjax.ajaxnonce},				 
				success: function(data) {
					current.parent().html('<span data-icon="&#xe077;" class="right compare-cleared">'+data+'</span>');
					window.setTimeout(function(){location.reload()},1000);	
				}
			});
			 event.preventDefault();	
		 });
	 
	 
	  /* 
	   * 
	   * Megamenu
	   * 
	   */	 
		$('.megamenu').hover(function(){
			curentSubMenu = $(this).children('ul');
			curentSubMenu.show();
				var left = curentSubMenu.offset().left;
				var diff = ($('.inner').outerWidth() + $('.inner').offset().left) - (left + curentSubMenu.outerWidth());
				if(diff < 0){
					$(this).css('position','initial');
					curentSubMenu.css('left', 'auto');
					curentSubMenu.css('right', '0');
					curentSubMenu.css('top', '110px');
					
					curentSubMenu.css('background-image', 'none');
				}
			}, function(){
				
		});
	 
	  
	  /* 
	   * 
	   * touchSwipe - Call touchSwipe script on each parallax-slider
	   * 
	   */	  
	  	$('.viewport').each( function( index ) {
			$(this).swipe({
			 swipeLeft:  function() { $(this).parent().find('.buttons.next').click(); },
			 swipeRight: function() { $(this).parent().find('.buttons.prev').click(); },
			});
		});
	  
	  
	  $(" select:not(.chosen, .option-content select, .country_select, .state_select,.right-side-title .orderby, .variations select  )").selectbox({
			effect: "fade"
		});
	});
});