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

			this.cycle(index, el.nextSibling === null);
		}.bind(this));

		$(this.$thumbs).on('click', function(e, el) {
			this.cycle($(el).index());
		}.bind(this));
	},

	cycle: function(index, forward) {
		if (index >= this.$elements.length) {
			this.index = 0;
		} else if (index < 0) {
			this.index = this.$elements.length - 1;
		} else {
			this.index = index;
		}

		this.cycleElements();

		if (this.$thumbs) {
			this.cycleThumbs(forward);
		}
	},

	cycleElements: function() {
		var disabledClass = '-is-disabled';

		this.$elements.eq(this.index)
			.removeClass(disabledClass)
			.siblings()
			.addClass(disabledClass);
	},

	cycleThumbs: function(forward) {
		var activeClass = '-is-active',
			$thumb = this.$thumbs.eq(this.index),
			halfOfParent = $thumb.parent().parent()[0].getBoundingClientRect().width / 2,
			offset = $thumb[0].offsetWidth + this.thumbMargin;

		$thumb.addClass(activeClass)
			.siblings()
			.removeClass(activeClass);

		if ($thumb[0].offsetLeft > halfOfParent) {
			forward ? this.thumbOffset += offset : this.thumbOffset -= offset;
		}

		$thumb.parent().css('left', '-' + this.thumbOffset + 'px');

		if (forward && this.index === this.$thumbs.length - 1) {
			this.thumbOffset = 0;
		} else if (! forward && this.index === this.$thumbs.length - 1) {
			this.thumbOffset = (this.$thumbs.length / 2) * offset;

			$thumb.parent().css('left', '-' + this.thumbOffset + 'px');
		}
	}
});