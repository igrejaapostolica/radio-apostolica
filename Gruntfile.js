module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        jshint: {
            files: ['assets/javascripts/app.js', 'assets/javascripts/player.js'],
            options: {
                reporterOutput: ""
            }
        },
        uglify: {
            target: {
                files: {
                    'public/js/app.min.js': ['assets/javascripts/app.js', 'assets/javascripts/player.js']
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: "compressed"
            },
            dist: {
                files: {
                    'public/css/main.css': 'assets/stylesheets/main.scss',
                    'public/css/player.css': 'assets/stylesheets/player.scss'
                }
            }
        },
        watch: {
          scripts: {
            files: ['assets/javascripts/*.js', 'assets/stylesheets/*.scss'],
            tasks: ['jshint', 'uglify', 'sass']
          },
        }
    });

    grunt.registerTask('default', ['jshint', 'uglify', 'sass'])
};