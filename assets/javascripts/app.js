(function($) {

  var radioConfig = {
    host: '72.55.156.247',
    port: 9910,
    stream: '/stream'
  };

  $(document).ready(function(){
    var $mq = null;
    var songTitle = null;

    $('#radio').player({
      autoplay: true,
      media: { 
        m4a: "http://" + radioConfig.host + ":" + radioConfig.port + radioConfig.stream 
      }
    });

    $.SHOUTcast({
      host : radioConfig.host,
      port : radioConfig.port,
      interval : 5000,
      stats : function() {
        // Current Song
        setTitle(this.get('songtitle', 'Rádio Apostólica'));

        // Listeners
        var listeners = this.get('currentlisteners');

        if (listeners > 0) {
          $('.listeners').text(listeners + (listeners == 1 ? " ouvinte" : " ouvintes"));
        }
      }
    }).startStats();

    function setTitle(title) {
      // if title changed...
      if (songTitle != title) {
        // let's update it...
        songTitle = title;

        if ($mq) {
          $mq.marquee('destroy');
          $mq = null;
        }

        $('.radio-title').text(songTitle);

        if (songTitle.length > 36) {
          $mq = $('.radio-title').marquee({
                  duration: 10 * 1000,
                  delayBeforeStart: 2 * 1000,
                  gap: 35,
                  startVisible: true,
                  duplicated: true
                });
        }
      } // endif
    }

  });
})(jQuery);