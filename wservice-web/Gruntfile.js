/**
 * Created by leon on 15/10/30.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        html2js: {
            options: {
                module: "wservice.common.tpls", // no bundle module for all the html2js templates
                base: '.',
                jade: {
                    doctype: "html"
                },
                rename: function (moduleName) {
                    return "/" + moduleName.replace(".jade", ".html").replace("public/","");
                }
            },
            main: {
                src: ["public/template/**/*.jade"],
                dest: "dist/templates.html.js"
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: [
                    "public/js/common/index.js",
                    "public/js/common/master.js",
                    "public/js/common/onIframeLoad.js",
                    "public/js/common/repository/*.js",
                    "public/js/common/service/*.js",
                    "public/js/common/store/*.js",
                    "public/js/common/directive/*.js",
                    "<%= html2js.main.dest%>"
                ],
                dest: "dist/wservice-common-<%= pkg.version%>.js"
            }
        },
        uglify: {
            options: {
                banner: '/*! wservice-common  <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            dist: {
                files: {
                    "dist/wservice-common-<%= pkg.version%>.min.js": ["<%= concat.dist.dest%>"]
                }
            }
        },
        jshint: {
            files: ["public/js/**/*.js"],
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
            tasks: ["jshint", "concatCommon"]
        },
        clean: ["dist/*.js"]
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-html2js");

    grunt.registerTask("clean", ["clean"]);
    grunt.registerTask("test", ["jshint"]);
    grunt.registerTask("default", ["jshint",'html2js', "concat", "uglify"]);
    grunt.registerTask("common", ['html2js',"concat", "uglify"]);
}