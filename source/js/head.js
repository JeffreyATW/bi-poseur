//= require 'vendor/modernizr-2.6.1.min'
//= require 'bower_components/angular/angular.js'

angular.module("biPoseur", [])
  .controller("MainController", function ($scope, $sce) {
    $scope.youTubeIframeAPIReady = false;
    window.onYouTubeIframeAPIReady = function () {
      $scope.youTubeIframeAPIReady = true;
    }
    $scope.playing = false;
    $scope.playVideo = function () {
      if ($scope.youTubeIframeAPIReady) {
        $scope.videoUrl = $sce.trustAsResourceUrl(
          "http://www.youtube.com/embed/DXraeuq5Lhc?autoplay=1&amp;autohide=1&amp;enablejsapi=1&amp;showinfo=0&amp;modestbranding=1&amp;rel=0&amp;origin=" +
          window.location.protocol +
          "//" +
          window.location.host
        );
        $scope.playing = true;
      }
    }
  });