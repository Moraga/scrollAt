/**
 * Fix elements on scroll (jQuery plugin)
 *
 * Example:
 *
 * $('some').scrollAt({
 *    limit: $('unsurpassable'),
 *    top: 50, // top ajustment (optional)
 *    bottom: -30, // bottom ajustment (optional)
 * })
 *
 * @author Alejandro Moraga <moraga86@gmail.com>
 */
(function() {
	var	// elements listening
		mov = [],
		// window as jQuery
		win = $(window),
		// total elements listening
		len,
		// reserved to scroll top
		top;
	
	win.on('scroll', function() {
		// current scroll position
		top = win.scrollTop();
		
		for (var i=len, ofa, fix; i--;) {
			// moving
			if (mov[i].act) {
				// left from top
				if (top < mov[i].min) {
					mov[i].css({position: 'initial'});
					mov[i].act = false;
				}
				// left from bottom
				else if (top > mov[i].max) {
					mov[i].css({position: 'absolute', top: mov[i].max, left: mov[i].lft});
					// checks the new position
					ofa = mov[i].offset();
					fix = {};
					// ajust top and left if are different from expected
					if (ofa.top != mov[i].max)
						fix.top = mov[i].max - (ofa.top - mov[i].max);
					if (ofa.left != mov[i].lft)
						fix.left = mov[i].lft - (ofa.left - mov[i].lft);
					mov[i].css(fix).act = false;
				}
			}
			// stopped
			else {
				if (top >= mov[i].min && top < mov[i].max + mov[i].btm) {
					mov[i].css({
						position: 'fixed',
						top: mov[i].top,
						left: mov[i].lft,
						width: mov[i].wdt
					});
					mov[i].act = true;					
				}
			}
		}
	});
	
	$.fn.scrollAt = function(cnf) {
		this.lim = cnf.limit;
		this.top = cnf.top || 0;
		this.btm = cnf.bottom || false,
		this.act = false;
		this.rfs = function() {
			var ofs = this.offset();
			this.lft = ofs.lft;
			this.wdt = this.width();
			this.min = ofs.top - this.top;
			this.max = this.lim.offset().top;
			if (this.btm !== false)
				this.max -= this.outerHeight() + this.btm;
			return this;
		};
		len = mov.push(this);
		return this.rfs();
	};
})();