var state = 0;
var stateMax = 4;

function next() {
	console.log("Next", state);
	// browser side functions here
}

function back() {
	console.log("Back", state);
	// browser side functions here
}

$("#next").click(function () {
	if (state < stateMax) {
		next();

		state += 1;

		// Enables 'back' button if disabled
		$("#back").removeClass("disabled");

		// Adds class to make nodes green
		$(".nConfirm" + state).each(function () {
			$(this).addClass("done");
		});

		// Progress bar animation
		var pBar = (state / stateMax) * 100;
		$(".pBar").css("width", `${pBar}%`);

		// Disables 'next' button if end of steps
		if (state == 4) {
			$("#next").addClass("disabled");
		}
	}
});

$("#back").click(function () {
	if (state > 0) {
		back();

		// Enables 'next' button if disabled
		$("#next").removeClass("disabled");

		// removes class that makes nodes green
		$(".nConfirm" + state).each(function () {
			$(this).removeClass("done");
		});

		state -= 1;

		// Progress bar animation
		var pBar = (state / stateMax) * 100;
		$(".pBar").css("width", `${pBar}%`);

		// Disables 'back' button if end of steps
		if (state == 0) {
			$("#back").addClass("disabled");
		}
	}
});
