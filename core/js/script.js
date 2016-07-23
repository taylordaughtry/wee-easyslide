Wee.fn.make('easySlide', {
	init: function(options) {
		var conf = $.extend({
				arrows: 'arrow',
				elementRef: 'galleryImage',
				enableSwipe: true,
				resizeParent: false,
				trackerRef: false
			}, options);

		this.$elements = $('ref:' + conf.elementRef);
		this.$arrows = $('ref:' + conf.arrows);
		this.resizeParent = conf.resizeParent;
		this.index = 0;

		if (this.resizeParent) {
			this.$elements.parent().height(this.$elements.first().height());
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
		var disabledClass = '-is-disabled';

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
	}
});