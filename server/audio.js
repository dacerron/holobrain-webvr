var Audio = (function() {
    function prepareAudioStream(app) {
      var buffer = [];
      //every three seconds, delete the whole thing
      setTimeout(function() {
        buffer = [];
      }, 3000)

      return buffer;
    }

    return {
        prepareAudioStream
    }
})()

module.exports = Audio;
