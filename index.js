$(window).on('load', function() {

	var isInit = true;

	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		onInit: function(s) {

			$('.swiper-container').css('visibility', 'visible');
			$('#loading').remove();

			showAni(s);
		},
		onSlideChangeEnd: function(s) {
			showAni(s);

		},
		loop: true,
		loopedSlides: 7
	});


	function showAni(mySwiper) {
		var curIndex = mySwiper.activeIndex % 7;
		var curNum = curIndex + 1;
		var preIndex = mySwiper.previousIndex % 7;


		if (curNum == 7) {

			$('.seven-photos .photo-item').removeClass('flyOutLeft').addClass('flyInLeft delay');

			$('.seven-action-children').css('display', 'block');
			$('.seven-action').css('z-index', 100);

			$('.J-seven-btn').on('click', function() {
				$('.seven-action-children').css('display', 'none');
				$('.seven-action').css('z-index', 1);
				$('.seven-bomb').addClass('block');
				$('.swiper-7').find('.animated').addClass('block');

				$('.J-seven-btn').off('click');
			});

			$('.seven-action').find('.animated').not('.seven-bomb').addClass('block');

		} else {
			$('.swiper_item_' + curNum).find('.animated').addClass('block');
		}
		if (preIndex != curIndex)
			$('.swiper_item_' + (preIndex + 1)).find('.animated').removeClass('block');
	}

	function DyPager(selector) {
		this.container = $(selector);
		this.items = this.container.children();

		this._curIndex = 0;
		this._timer = null;

		this._init();
	}

	DyPager.prototype = {

		_init: function() {
			var self = this;
			var container = self.container;


			container.on('touchstart', function(evt) {
				var touchObj = evt.changedTouches[0],
					touchEndObj;
				var pageX = touchObj.pageX;
				var pageY = touchObj.pageY;
				var pageXEnd, pageYEnd;

				container.on('touchmove', function(evt) {

					evt.preventDefault();
				});

				container.on('touchend', function(evt) {
					touchEndObj = evt.changedTouches[evt.changedTouches.length - 1];
					pageXEnd = touchEndObj.pageX;
					pageYEnd = touchEndObj.pageY;

					if (Math.abs(pageXEnd - pageX) > 2) {
						if (pageXEnd - pageX > 0) { //右滑
							self._toRight();
						} else { //左滑
							self._toLeft();
						}

					}

					container.off('touchmove');
					container.off('touchend');

					evt.preventDefault();
				});

				evt.preventDefault();
			});

			//  		self.container.on('swipeLeft', function(evt) {
			// 	self._toLeft(evt);
			// }).on('swipeRight', function(evt) {
			// 	self._toRight(evt);
			// });
		},

		_toLeft: function() {
			var self = this;

			if (self._curIndex >= self.items.length - 1) {
				return;
			} else if (self._curIndex < 0) {
				self._curIndex = 0;
			}
			var $cur = $(self.items[self._curIndex]);

			$cur.removeClass('flyInLeft delay');
			$cur.addClass('flyOutLeft');
			self._curIndex++;
		},

		_toRight: function() {
			var self = this;

			self._curIndex--;

			if (self._curIndex < 0) {
				return;
			}
			var $cur = $(self.items[self._curIndex]);

			$cur.removeClass('flyOutLeft delay');
			$cur.addClass('flyInLeft');


		}

	};

	$('.seven-photos').each(function(i, c) {
		new DyPager(c);
	});

});