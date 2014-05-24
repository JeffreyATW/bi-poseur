//= require "plugins"
//= require "bower_components/jquery/dist/jquery.js"

(function () {
  var $hero = $('.hero');
  window.onYouTubeIframeAPIReady = function () {
    $('.video__play').on('click', function (e) {
      var player,
        $playerClose = $('<button class="btn player__close">&times;</button>'),
        $playerFade = $('<div class="player__fade"></div>'),
        removeFade = function () {
          $playerFade.remove();
        },
        destroyPlayer = function () {
          player.destroy();
          $playerClose.remove();
          $.support.transition ?
            $playerFade.one($.support.transition.end, removeFade).emulateTransitionEnd(1000) :
            removeFade();
          $playerFade.removeClass('in');
        },
        appendPlayer = function () {
          $hero.append('<iframe id="player" class="player" type="text/html" width="100%" height="100%" src="' +
            'http://www.youtube.com/embed/DXraeuq5Lhc?autoplay=1&autohide=1&enablejsapi=1&showinfo=0&modestbranding=1&rel=0&origin=' +
            window.location.protocol + '//' + window.location.host +
            '" frameborder="0">').append($playerClose);

          $playerClose.on('click', destroyPlayer);

          player = new YT.Player('player', {
            events: {
              'onStateChange': function (e) {
                if (e.data === 0) {
                  destroyPlayer();
                }
              }
            }
          });
        };
      e.preventDefault();

      $hero.append($playerFade);
      setTimeout(function () {
        $playerFade.addClass('in');

        $.support.transition ?
          $playerFade.one($.support.transition.end, appendPlayer).emulateTransitionEnd(1000) :
          appendPlayer();
      }, 1);
    });
  };
  $('script').first().before('<script src="' + window.location.protocol + '//www.youtube.com/iframe_api">');
}());