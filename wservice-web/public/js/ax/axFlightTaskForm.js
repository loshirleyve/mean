/*!
 * mars
 * Copyright(c) 2015 huangbinglong
 * MIT Licensed
 */

angular.module("AXFlightTaskApp.aXFlightTaskForm", ["ui.neptune"])
    .factory("aXFlightTaskForm", function(nptFormlyStore) {
        return nptFormlyStore("aXFlightTaskForm", {
            fields: [
                {
                    key: 'postscript',
                    type: 'textarea',
                    templateOptions: {
                        label: '备注:',
                        required: false
                    }
                }
            ]
        });
    });