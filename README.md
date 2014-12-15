Fix elements on scroll (jQuery plugin)

var elem = $('some').scrollAt({
	limit: $('unsurpassable'),
	top: 50, // top ajustment (optional)
	bottom: -30, // bottom ajustment (optional)
});

Refresh references (positions, width, etc.)

elem.rfs();