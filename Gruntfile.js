/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {jshintrc: '.jshintrc'},
      all: {
        src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
      }
    },

    /**
     * Run mocha tests.
     */
    mochaTest: {
      test: {
        options: {
          spawn: false,
          clearRequireCache: true,
          reporter: 'progress'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      dev: {
        files: '<%= jshint.all.src %>',
        tasks: ['test']
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-verb');

  // Tests to be run.
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // Dev task with watch
  grunt.registerTask('dev', ['test', 'watch']);

  // Default task.
  grunt.registerTask('default', ['test', 'verb']);

};
