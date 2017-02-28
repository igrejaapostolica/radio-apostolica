(function($) {

  var radioConfig = {
    host: '72.55.156.247',
    port: 9910,
    stream: '/stream'
  }

  $(document).ready(function(){
    $('#radio').player({
      autoplay: false,
      media: { 
        m4a: "http://" + radioConfig.host + ":" + radioConfig.port + radioConfig.stream 
      }
    });

    $.SHOUTcast({
      host : radioConfig.host,
      port : radioConfig.port,
      interval : 5000,
      stats : function() {
        $('#title').text(this.get('songtitle'));

        // Ouvintes
        var listeners = this.get('currentlisteners');

        if (listeners > 0) {
          $('.listeners').text(listeners + (listeners == 1 ? " ouvinte" : " ouvintes"));
        }
      }
    }).startStats();
  });
})(jQuery);