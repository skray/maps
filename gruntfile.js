module.exports = function(grunt) {

  grunt.initConfig({
    'gh-pages': {
        options: {
            base: 'src'
        },
        src: ['**']
    },
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('release', ['gh-pages']);

};