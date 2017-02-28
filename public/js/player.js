(function ($) {

	$.fn.player = function(extras) {
		var playerGUI = "#" + $(this).attr('id');
		var playerID  = "#" + $(this).find("#mainPlayer").attr('id');
		var settings = extras;
		createPlayer(playerGUI, playerID, settings, extras);
	}


	function createPlayer(playerGUI, mainPlayer, settings, extras) {

		// Get supplied media from MEDIA array
		var supplied = new Array;
		$.each(settings.media, function(key, value) { if (key != 'poster') {supplied.push(key);}});
		formats = supplied.join(', ');

		var options = {

			ready: function () {
				$(this).jPlayer("setMedia", settings.media);
				if (settings.autoplay != null && settings.autoplay == true) {
					$(mainPlayer).jPlayer('play');
				}
			},

			// Extra Settings
			supplied: formats,
			solution: 'html',
			volume: 0.5,
			smoothPlayBar: false,
			keyEnabled: false,

			// CSS Selectors
			cssSelectorAncestor: playerGUI,
			cssSelector: {
				play: ".play",
				pause: ".pause",
				volumeBar: ".currentVolume",
				volumeBarValue: ".currentVolume .curvol",
				currentTime: ".time",
				gui: ".player",
				noSolution: ".noSolution"
			},

			error: function(event) {
				if(event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
					// Setup the media stream again and play it.
					$(this).jPlayer("setMedia", settings.media).jPlayer('play');
				}
			},

			play: function() {
				$(this).on('click', function() { $(mainPlayer).jPlayer('pause');});
				$(this).jPlayer("pauseOthers");
			},

			pause: function() {
				$(playerGUI + ' .playerScreen').unbind('click');
			},

			volumechange: function(event) {
				if(event.jPlayer.options.muted) {
					$(playerGUI + ' .currentVolume').val(0);
				} else {
					$(playerGUI + ' .currentVolume').val(event.jPlayer.options.volume);
				}
			},

			ended: function() {
				$(this).jPlayer("setMedia", settings.media);
			}
		};

		// Create the volume slider control
		$(playerGUI + ' .currentVolume').slider({
			range: [0, 1],
			step: 0.01,
			start : 0.5,
			handles: 1,
			slide: function() {
				var value = $(this).val();
				$(mainPlayer).jPlayer("option", "muted", false);
				$(mainPlayer).jPlayer("option", "volume", value);
			}
		});

		// Initialize Player
		$.extend(options, extras);
		$(mainPlayer).jPlayer(options);
	}


})(jQuery);