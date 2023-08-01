(function($){
	"use strict";

	// Mean Menu
	$('.mean-menu').meanmenu({
		meanScreenWidth: "1199"
	});

	// Header Sticky
	$(window).on('scroll',function() {
		if ($(this).scrollTop() > 120){  
			$('.navbar-area').addClass("is-sticky");
		}
		else{
			$('.navbar-area').removeClass("is-sticky");
		}
	});

	// Others Option For Responsive JS
	$(".others-option-for-responsive .dot-menu").on("click", function(){
		$(".others-option-for-responsive .container .container").toggleClass("active");
	});

	// Search Menu JS
	$(".others-option .search-btn").on("click", function(){
		$(".search-box").toggleClass("active");
		$(this).toggleClass("active");
	});

	// Refresh Btn
	$(".refresh-btn").on('click', function() {
		$(".refresh-alert").fadeIn(300).delay(1500).fadeOut(400);
	});

	// NFTs Filter Active
	$(".nfts-filter .blockchain-item, .nfts-filter .category .dropdown-menu button").on('click', function() {
		$(this).toggleClass('active');
	});

	// NFTs Filter Dropdown
	$(function() {
		$('.filter-dropdown .dropdown-toggle').on('click', function() {
			$(this).next('.filter-dropdown-menu').toggleClass('show');
		});
	});

	// NFTs Custom Active
	$(function() {
		$('.nfts-sidebar .box ul li button').on('click', function() {
			$(this).toggleClass('active');
		});
	});

	// NFTs Slides
	$('.nfts-slides').owlCarousel({
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		mouseDrag: false,
		autoplayHoverPause: true,
		navText: [
			"<i class='flaticon-left-arrow-1'></i>",
			"<i class='flaticon-next'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});

	// Collections Slides
	$('.collections-slides').owlCarousel({
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='flaticon-left-arrow-1'></i>",
			"<i class='flaticon-next'></i>",
		],
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 2
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});

	// Artists Slides
	$('.artists-slides').owlCarousel({
		nav: true,
		margin: 25,
		loop: true,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		navText: [
			"<i class='flaticon-left-arrow-1'></i>",
			"<i class='flaticon-next'></i>",
		],
		responsive: {
			0: {
				items: 2
			},
			576: {
				items: 2
			},
			768: {
				items: 3
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			},
			1400: {
				items: 5
			}
		}
	});

	// Data Table
	$('#myTable').DataTable({
		columnDefs: [
			{ orderable: false, targets: 4 }
		],
		order: [[4, 'asc']],
		"lengthMenu": [[12, 15, 18, 20], [12, 15, 18, 20]]
	});

	// Tooltip
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	});

	// Input Plus & Minus Number JS
	$('.input-counter').each(function() {
		var spinner = jQuery(this),
		input = spinner.find('input[type="text"]'),
		btnUp = spinner.find('.plus-btn'),
		btnDown = spinner.find('.minus-btn'),
		min = input.attr('min'),
		max = input.attr('max');
		
		btnUp.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue >= max) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue + 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
		btnDown.on('click', function() {
			var oldValue = parseFloat(input.val());
			if (oldValue <= min) {
				var newVal = oldValue;
			} else {
				var newVal = oldValue - 1;
			}
			spinner.find("input").val(newVal);
			spinner.find("input").trigger("change");
		});
	});

	// Load More NFTs
	$('.loadMoreNFTs').simpleLoadMore({
		btnText: 'Load More',
		item: '.col-xl-3',
		itemsToLoad: 4,
		count: 16,
	});

	// Load More Cryptocurrency
	$('.loadMoreCryptocurrency').simpleLoadMore({
		btnText: 'Show more options',
		item: 'li',
		itemsToLoad: 2,
		count: 4,
	});

	// Mixitup
	try {
        var mixer = mixitup('.shorting', {
            controls: {
                toggleDefault: 'none'
            }
        });
    } catch (err) {}

	// Custom Select
	$('.section-title select').customSelect();

	// Coming Soon Page Countdown
	$('.coming-soon-countdown').downCount({
		date: '12/27/2024 12:00:00'
	});

	// Popup Image
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		}
	});

	// Popup Video
	$('.popup-video').magnificPopup({
		disableOn: 320,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	// Subscribe form
	$(".newsletter-form").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			// handle the invalid form...
			formErrorSub();
			submitMSGSub(false, "Please enter your email correctly.");
		} else {
			// everything looks good!
			event.preventDefault();
		}
	});
	function callbackFunction (resp) {
		if (resp.result === "success") {
			formSuccessSub();
		}
		else {
			formErrorSub();
		}
	}
	function formSuccessSub(){
		$(".newsletter-form")[0].reset();
		submitMSGSub(true, "Thank you for subscribing!");
		setTimeout(function() {
			$("#validator-newsletter").addClass('hide');
		}, 4000)
	}
	function formErrorSub(){
		$(".newsletter-form").addClass("animated shake");
		setTimeout(function() {
			$(".newsletter-form").removeClass("animated shake");
		}, 1000)
	}
	function submitMSGSub(valid, msg){
		if(valid){
			var msgClasses = "validation-success";
		} else {
			var msgClasses = "validation-danger";
		}
		$("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
	}
	$(".newsletter-form").ajaxChimp({
		url: "https://envytheme.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9", // Your url MailChimp
		callback: callbackFunction
	});

	try {
		// Remove a plugin from the default setup.
		ClassicEditor
		.create( document.querySelector('#editor'), {})
		.catch( error => {
			console.log( error );
		});
	} catch (err) {}

	// Country Select
	try {
		$("#country_selector, #country_selector2").countrySelect({
			preferredCountries: ['ca', 'gb', 'us']
		});
	} catch (err) {}

	// Scroll Back to Top
	try {
		let progressPath = document.querySelector('.progress-wrap path');
		let pathLength = progressPath.getTotalLength();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
		progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
		progressPath.style.strokeDashoffset = pathLength;
		progressPath.getBoundingClientRect();
		progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
		let updateProgress = function () {
			let scroll = $(window).scrollTop();
			let height = $(document).height() - $(window).height();
			let progress = pathLength - (scroll * pathLength / height);
			progressPath.style.strokeDashoffset = progress;
		}
		updateProgress();
		$(window).on('scroll', updateProgress);	
		let offset = 50;
		let duration = 550;
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > offset) {
				$('.progress-wrap').addClass('active-progress');
			} else {
				$('.progress-wrap').removeClass('active-progress');
			}
		});				
		$('.progress-wrap').on('click', function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		});
	} catch (err) {}

	// Preloader
	$(window).on('load', function() {
		$('.preloader-area').addClass('deactivate');
	});

}(jQuery));

try {
	// function to set a given theme/color-scheme
	function setTheme(themeName) {
		localStorage.setItem('nofa_theme', themeName);
		document.documentElement.className = themeName;
	}
	// function to toggle between light and dark theme
	function toggleTheme() {
		if (localStorage.getItem('nofa_theme') === 'theme-dark') {
			setTheme('theme-light');
		} else {
			setTheme('theme-dark');
		}
	}
	// Immediately invoked function to set the theme on initial load
	(function () {
		if (localStorage.getItem('nofa_theme') === 'theme-dark') {
			setTheme('theme-dark');
			document.getElementById('slider').checked = false;
		} else {
			setTheme('theme-light');
		document.getElementById('slider').checked = true;
		}
	})();
} catch (err) {}