/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jade');
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'public/js/**/*.js', 'test/**/*.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'public/js/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: ['<config:lint.files>','<config:jade.amd.src>'],
      tasks: 'lint test jade'
    },
    jade: {
      amd: {
        src: ['app/views/*.jade'],
        dest: 'public/javascripts/templates',
        wrapper: {
          amd: true,
          dependencies: 'jade'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint test concat min');

};
