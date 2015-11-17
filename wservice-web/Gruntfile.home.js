/**
 * Created by leon on 15/10/30.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: [
                    "public/js/home/app.js",
                    "public/js/home/navigation.js",
                    "public/js/home/storeLocalStorage.js",
                    "public/js/home/services/*.js"
                ],
                dest: "dist/wservice-home-<%= pkg.version%>.js"
            }
        },
        uglify: {
            options: {
                banner: '/*! wservice-home  <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            dist: {
                files: {
                    "dist/wservice-home-<%= pkg.version%>.min.js": ["<%= concat.dist.dest%>"]
                }
            }
        },
        jshint: {
            files: ["public/js/home/**/*.js"],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ["<%= jshint.files%>"],
            tasks: ["jshint", "concat"]
        },
        clean: ["dist/*.js"]
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask("clean", ["clean"]);
    grunt.registerTask("test", ["jshint"]);
    grunt.registerTask("default", ["jshint", "concat", "uglify"]);
}