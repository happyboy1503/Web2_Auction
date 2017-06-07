jQuery(document).ready(function($) {
		var setings =  new Array();
		jQuery("#option-box select").chosen({ disable_search_threshold: 10 });
		$('#option-box .icon').click(function() {
		    var $lefty = $(this).parent();
		    $lefty.toggleClass('opened');
		    $lefty.animate({
		      left: parseInt($lefty.css('left'),0) == 0 ?
		        -$lefty.outerWidth() :
		        0
		    });
		    
		    if( $lefty.hasClass('opened')){
			    if($('select[name="style"]').val() == 'custom'){
				$('#option-box .custom-style-container').fadeIn();
				var top = $('#option-box ').offset().top;
				 $('#option-box ').css('position','absolute');
				 $('#option-box ').css('top',top);
				}
			} else {
				 $('#option-box ').css('position','fixed');
			 	$('#option-box ').css('top','100px');
			}	
		  });
		
		
		$('select[name="style"]').change(function(e) {
				var setings =  new Array();
				if($(this).val() == 'custom'){
					var top = $('#option-box ').offset().top;
					$('#option-box .custom-style-container').fadeIn();
					$('#option-box ').css('position','absolute')
			 		$('#option-box ').css('top',top)
					$.cookie('ssc_essential_style',$(this).val());
				} else {
					$('#option-box .custom-style-container').fadeOut();
					$("#essential-color-style-css").attr("href",$(this).val());
					$("#ssc-color-style-css").attr("href",$(this).val());
					$.cookie('ssc_essential_style',$(this).val());
					 $('#option-box ').css('position','fixed');
			 		$('#option-box ').css('top','100px');
				}	
		});
		
		$('select[name="title-font"]').change(function(e) {
				$("#ssc-main-font").html("h1, h2, h3, h4, h5, h6, .widget .heading, #site-title a, #site-title, .entry-title {font-family: '"+$(this).val()+"' }");
				$("#ssc-mainfontlink").attr("href", "http://fonts.googleapis.com/css?family="+ $(this).val() );
				$.cookie('ssc_essential_title_font',$(this).val());
		});
		
		$('select[name="content-font"]').change(function(e) {
				$("#ssc-content-font").html("body {font-family: '"+$(this).val()+"' }");
				$("#ssc-contentfontlink").attr("href","http://fonts.googleapis.com/css?family="+ $(this).val());
				$.cookie('ssc_essential_content_font',$(this).val());
		});
		
		$('form#custom-stylecolors').submit(function(e){
			
			$.cookie('ssc_essential_custom_style',JSON.stringify($(this).serializeArray()));
			location.reload();
			return false;
		});
});
