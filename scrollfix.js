(function() {
	'use strict';
	
	/**
	 * Elements fixed
	 * @var array
	 */
	var items = [];
	
	var win = $(window);
	
	$.fn.scrollfix = function(settings) {
		// jquery chain
		return this.each(function() {
			// get initial values used in scroll
			this.style.overflow = 'hidden';
			var rect = this.getBoundingClientRect();
			this.style.overflow = 'initial';
			
			// group base data
			this.sf = {
				top: rect.top - document.body.getBoundingClientRect().top,
				marginTop: settings.marginTop || 0,
				height: rect.height,
				limit: settings.limit,
				fixed: false
			};
			
			// height undefined
			if (!this.sf.height) {
				// use this area to try to get the height
				var child = this.firstElementChild;
				if (child) {
					// by property like 00x00..
					var size = child.id.match(/\d+x(\d{2,})/);
					if (size) {
						this.sf.height = parseFloat(size[1]);
					}
				}
			}
			
			// changing element style
			this.style.width = rect.width + 'px';
			
			// keep elements near by limit
			for (var i = items.length; i--; )
				if (items[i].sf.limit === this.sf.limit)
					break;
			
			// put the element in the right position
			items.splice(i == -1 ? 0 : 1, 0, this);
		});
	}
	
	//
	// For all elements
	//
	
	win.on('scroll', function() {
		var top = win.scrollTop();
		var item;
		var limit;
		
		for (var i = items.length; i--; ) {
			item = items[i];
			
			limit = item.sf.limit.offset().top + item.sf.limit.height() - item.sf.height;
			
			// interaction area
			if (top + item.sf.marginTop >= item.sf.top && top < limit) {
				if ('fixed' != item.style.position) {
					item.style.top = item.sf.marginTop + 'px';
					item.style.position = 'fixed';
				}
			}
			// above
			else if (top + item.sf.marginTop < item.sf.top) {
				if ('initial' != item.style.position) {
					item.style.position = 'initial';
					item.style.top = '0';
				}
			}
			// below
			else if ('absolute' != item.style.position) {
				item.style.position = 'absolute';
				item.style.top = limit + 'px';
				// fine ajustment of top
				var otop = $(item).offset().top;
				if (otop != limit)
					item.style.top = limit - (otop - limit) + 'px';
			}
		}
	});
})();