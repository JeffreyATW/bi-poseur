//= require plugins
//= require bower_components/jquery/dist/jquery
//= require vendor/bootstrap.custom
//= require vendor/froogaloop

(function () {
  var $hero = $('.hero');

  $('.hero__trailer').on('click', function (e) {
    var player,
      $iframe = $('<iframe class="player" width="100%" height="100%" src="' +
        window.location.protocol + '//player.vimeo.com/video/108026836?api=1">'),
      $playerClose = $('<button class="btn player__close">&times;</button>'),
      $playerFade = $('<div class="player__fade"></div>'),
      removeFade = function () {
        $playerFade.remove();
      },
      destroyPlayer = function () {
        $iframe.remove();
        $playerClose.remove();
        $.support.transition ?
          $playerFade.one($.support.transition.end, removeFade).emulateTransitionEnd(1000) :
          removeFade();
        $hero.removeClass('hero--playing');
      },
      appendPlayer = function () {
        $hero.append($iframe).append($playerClose)

        $playerClose.on('click', destroyPlayer);

        player = $f($iframe[0]);

        player.addEvent('ready', function () {
          player.play();
        });

        player.addEvent('finish', destroyPlayer);
      };
    e.preventDefault();

    $hero.append($playerFade);
    setTimeout(function () {
      $hero.addClass('hero--playing');

      $.support.transition ?
        $playerFade.one($.support.transition.end, appendPlayer).emulateTransitionEnd(1000) :
        appendPlayer();
    }, 1);
  });

  var comingSoon = function () {
    alert('Coming soon!');
    return false;
  };
  $('.hero__cta').on('click', comingSoon);
}());