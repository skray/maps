module.exports = function(grunt) {

  grunt.initConfig({
    'gh-pages': {
        options: {
            base: 'src'
        },
        src: ['index.html', 'mapstuff.css', 'mapstuff.js']
    },
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('release', ['gh-pages']);

};