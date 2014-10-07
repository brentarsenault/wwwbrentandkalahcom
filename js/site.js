/* site.JS */
_NS = {}

var currentAbout = 1;
var largestAbout = 5;
var _root = undefined;

function callGoogleAnalytics ( cat,curPageUrl ) {
	ga( 'send', cat, curPageUrl );
	//_gaq.push(['_trackEvent', cat, curPageUrl ]);
}

$(document).ready( function () {

	$('#flexCarousel').bxSlider({
		maxSlides: 1,
		minSlides: 1,
		auto: true,
		//startSlide: 0,
		pause: 5000
	});

	function insertBridalButton ( len,sel ) {

		for ( var i=0; i<len; i++ ) {
			if ( i == 0) {
				$(sel + ' .bridalNav').append('<div class=\"bridalButton active\"></div>');
			} else {
				$(sel + ' .bridalNav').append('<div class=\"bridalButton\"></div>');
			}
		}
	}

	function renderBridalMemeber ( side,data ) {
		person = side + ' '+ side + '-person';

		$(person).empty();
		$('#bride-person, #groom-person').css('height','auto');

		var template = $('#bridal-party-tmpl').html();
		var tmpl = Mustache.to_html( template, { data: data } );
		$(person).append( tmpl );

		matchHeight();
	}

	function matchHeight() {
		brideHt = $('#bride').height();
		groomHt = $('#groom').height();

		if ( brideHt > groomHt ) {
			$('#bride-person, #groom-person').css('height',brideHt-24);
		} else {
			$('#bride-person, #groom-person').css('height',groomHt-24);
		}
	}

	function bindButtons() {
		$('.bridalButton').click(function ( e ) {
			var new_data,$section;
			var section = $(this).parent().parent().parent().attr('id');

			if ( section == 'bride' ) {
				new_data = _NS.party[0].bride[$(this).index()];
			} else {
				new_data = _NS.party[0].groom[$(this).index()];
			}

			$section = '#'+section;

			$(this).siblings().removeClass('active');
			$(this).addClass('active');

			console.log($section,new_data);

			callGoogleAnalytics( 'click | '+new_data.name, '#'+new_data.imageName );

			renderBridalMemeber( $section,new_data );
		});
	}

	$('#mobileMenu').click(function ( evt ) {

		evt.preventDefault();

		if ( $('#mobileNav').hasClass('hidden') ) {
			$('#mobileNav').removeClass('hidden');
		} else {
			$('#mobileNav').addClass('hidden');
		}
	});

	$(window).resize(function () {
		//$('#flexCarousel').reloadShow();

		$('#bride-person, #groom-person').css('height','auto');
		matchHeight();
	});

	$(window).load(function () {
		//maybe
	});

	$.ajax({
	 	type: 'GET',
	 	cache: false,
        url: 'data/bridal-party.json',
        dataType: 'json',
	    success: function( data,textStatus) {
	       var b,g,$b='#bride',$g='#groom';

	       _NS = data;
	       _root = data.party[0];

	       b = data.party[0].bride.length;
	       g = data.party[0].groom.length;

	       renderBridalMemeber( $b,_root.bride[0]);
	       renderBridalMemeber( $g,_root.groom[0]);
	       
	      insertBridalButton( b,$b );
	      insertBridalButton( g,$g );

	    bindButtons();

	    },
	    error: function( xhr,textStatus,errorThrown ) {

	    }
	});

	$('.arrow').click( function ( e ) {
		if ( $(this).attr('id') == 'right' ) {
			$('#aboutUs-'+currentAbout).addClass('hidden');
			currentAbout++;
			if ( currentAbout >= largestAbout ) {
				currentAbout = 1;
				$('#aboutUs-'+currentAbout).removeClass('hidden');
			} else {
				$('#aboutUs-'+currentAbout).removeClass('hidden');
			}

			$('.polaroid img').attr('src','images/polaroid-'+currentAbout+'.jpg');
		} else {
			$('#aboutUs-'+currentAbout).addClass('hidden');
			currentAbout--;
			if ( currentAbout == 0 ) {
				currentAbout = largestAbout-1;
				$('#aboutUs-'+currentAbout).removeClass('hidden');
			} else {
				$('#aboutUs-'+currentAbout).removeClass('hidden');
			}

			$('.polaroid img').attr('src','images/polaroid-'+currentAbout+'.jpg');
		}
	});
});