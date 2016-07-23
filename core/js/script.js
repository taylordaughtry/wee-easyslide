Wee.fn.make('easySlide', {
	init: function(options) {
		var conf = $.extend({
				arrows: 'arrow',
				elementRef: 'galleryImage',
				enableSwipe: true,
				resizeParent: false,
				trackerRef: false,
				thumbs: false
			}, options);

		this.$elements = $('ref:' + conf.elementRef);
		this.$arrows = $('ref:' + conf.arrows);
		this.index = 0;

		if (conf.thumbs) {
			this.$thumbs = $('ref:' + conf.thumbs);
			this.thumbOffset = 0;
			this.thumbMargin = parseInt(this.$thumbs.first().css('margin-right'));
		}

		this.bind();
	},

	bind: function() {
		$(this.$arrows).on('click', function(e, el) {
			var index = el.nextSibling === null ? this.index + 1 : this.index - 1;

			this.cycle(index);
		}.bind(this));
	},

	cycle: function(index) {
		var disabledClass = '-is-disabled',
			activeClass = '-is-active';

		if (index >= this.$elements.length) {
			this.index = 0;
		} else if (index < 0) {
			this.index = this.$elements.length - 1;
		} else {
			this.index = index;
		}

		this.$elements.eq(this.index)
			.removeClass(disabledClass)
			.siblings()
			.addClass(disabledClass);

		if (this.$thumbs) {
			var $newThumb = this.$thumbs.eq(this.index),
				parentWidth = $newThumb.parent()[0].getBoundingClientRect().width;

			$newThumb.addClass(activeClass)
				.siblings()
				.removeClass(activeClass);

			if ($newThumb[0].offsetLeft > parentWidth / 2) {
				this.thumbOffset += $newThumb[0].offsetWidth + this.thumbMargin;

				$newThumb.parent().css('left', '-' + this.thumbOffset + 'px');
			}
		}
	}
});