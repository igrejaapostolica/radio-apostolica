(function ($) {

	$.fn.player = function(extras) {
		var playerGUI = "#" + $(this).attr('id');
		var playerID  = "#" + $(this).find("#mainPlayer").attr('id');
		var settings = extras;
		createPlayer(playerGUI, playerID, settings, extras);
	};

	function createPlayer(playerGUI, mainPlayer, settings, extras) {

		var supplied = [];
		$.each(settings.media, function(key, value) { if (key != 'poster') {supplied.push(key);}});
		formats = supplied.join(', ');

		var options = {

			ready: function () {
				$(this).jPlayer("setMedia", settings.media);
				if (settings.autoplay !== null && settings.autoplay === true) {
					$(mainPlayer).jPlayer('play');
				}
			},

			// Extra Settings
			supplied: formats,
			solution: 'html',
			volume: 1,
			smoothPlayBar: false,
			keyEnabled: false,

			// CSS Selectors
			cssSelectorAncestor: playerGUI,
			cssSelector: {
				play: ".play",
				pause: ".pause",
				currentTime: ".time",
				gui: ".player"
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

			ended: function() {
				$(this).jPlayer("setMedia", settings.media);
			}
		};

		// Initialize Player
		$.extend(options, extras);
		$(mainPlayer).jPlayer(options);
	}


})(jQuery);