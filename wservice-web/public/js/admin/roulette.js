angular.module("rouletteApp", ["ui.neptune",
    "wservice.common",
    "ui-notification"])
    .controller("rouletteController", function ($scope, nptSession, nptMessageBox, Notification, QueryTopicsRepo, QueryMsgBySceneRepo) {
        var vm = this;
        vm.topicTemplate = "测试年会抽奖";
        vm.prizes = [];

        // 查询主题
        vm.queryTopics = function () {
            QueryTopicsRepo.post({name: vm.topicTemplate})
                .then(function (response) {
                    if (response.data && response.data.length > 0) {
                        vm.prizes = response.data;
                        vm.choicePrize();
                    } else {
                        Notification.error({
                            title: "错误",
                            message: "没有找到主题：" + vm.topicTemplate
                        });
                    }

                }, function (err) {
                    Notification.error({
                        title: "异常",
                        message: err.message
                    });
                });
        };

        vm.selectCard = function(card) {

        };

        // 根据主题查询消息卡片
        vm.queryCards = function (topic) {
            QueryMsgBySceneRepo.post({
                topic: topic.name,
                sence: "topic"
            }).then(function (response) {
                // 获取参与人
                if (!response.data || response.data.length === 0) {
                    Notification.error({
                        title: "错误",
                        message: topic.name + " 主题下面未能找到消息卡片"
                    });
                    return;
                }
                if (response.data.length === 1) {
                    vm.selectCard(response.data[0]);
                } else {
                    vm.choiceCardModal = nptMessageBox.open({
                        title: "选择消息卡片",
                        content: '<div ng-repeat="item in $$ms.list" class="list-group">' +
                        '<button class="list-group-item btn btn-success" style="font-size:18px;" ng-click="$$ms.choice(item)">{{item.content}}</button>' +
                        '</div>',
                        showCancel: false,
                        modal: {
                            size: "sm"
                        },
                        scope: {
                            list: response.data,
                            choice: function (item) {
                                vm.selectCard(item);
                                vm.choiceCardModal.uibModal().dismiss();
                            }
                        }
                    });
                }
            }, function (err) {
                Notification.error({
                    title: "异常",
                    message: err.message
                });
            });
        };


        // 弹出选择主题的弹出框
        vm.choicePrize = function () {
            if (!vm.prizes || vm.prizes.length === 0) {
                Notification.error({
                    title: "错误",
                    message: "没有找到主题：" + vm.topicTemplate
                });
                return;
            }
            vm.choiceTopicModal = nptMessageBox.open({
                title: "选择奖项",
                content: '<div ng-repeat="item in $$ms.list" class="list-group">' +
                '<button class="list-group-item btn btn-success" style="font-size:18px;" ng-click="$$ms.choice(item)">{{item.name}}</button>' +
                '</div>',
                showCancel: false,
                modal: {
                    size: "sm"
                },
                scope: {
                    list: vm.prizes,
                    choice: function (item) {
                        $(window.document.body).focus();
                        vm.queryCards(item);
                        vm.choiceTopicModal.uibModal().dismiss();
                    }
                }
            });
        };


        // 加载主题
        nptSession().then(function () {
            vm.queryTopics();
        });

    }).factory("QueryMsgBySceneRepo", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryMsgByScene").addRequestInterceptor(function (request) {
            request.params.userid = nptSessionManager.getSession().getUser().id;
            return request;
        });
    }).factory("QueryTopicsRepo", function (nptRepository, nptSessionManager) {
        return nptRepository("QueryTopics").addRequestInterceptor(function (request) {
            request.params.userid = nptSessionManager.getSession().getUser().id;
            request.params.instid = nptSessionManager.getSession().getInst().id;
            return request;
        });
    }).run(function () {
        $(window.document.body).css("backgroundImage", "url(/image/roulette_background.jpg)");
        $(window.document.body).css("background-size", $(window).width() + "px " + $(window).height() + "px");
        $(window.document.body).css("background-repeat", "no-repeat");
    });
$(function () {
    /*
     *
     * MODIFY AS NEEDED
     *
     */
    var prizes = [
        "猴年大吉",
        "万事如意",
        "新春快乐",
        "恭喜发财",
        "好运连连",
        "大吉大利",
        "平平安安",
        "恭贺新春"];

    var scaleFactor = 0.17; // large decimal is bigger font
    var fontColor = "#FFFFFF"; // color of prize text
    var color = ["#F6312B", "#F98E0A", "#F2DE00", "#F93F7C"]; // alternating gaming peice colors
    var random = [744, 3478]; // [minimum number of rotations in degrees, max number of rotations]
    var seconds = 10000;  // how long animation runs
    var colorArrow = ["#000000", "#000000", 4]; // [fill color, border color, border width]

    /*
     *
     * DO NOT MODIFY
     *
     */
    var w = $(document).width(); // full w of html
    var h = $(document).height(); // full h of html
    var rOuter = h / 2.5; // prevents wheel edge from hitting viewport edge
    var rInner = rOuter * .40;
    var strokeWidth = 1;
    var sectionAngle = 360 / prizes.length;

    var curvePoint = Math.PI / 180;

    var arrow = null;
    var sections = [];
    var labels = [];


    var fontSize = null; // used by app to calculate scale don't touch
    var selected = null;

    // go full screen
    var paper = Raphael(0, 0, w, h);

    var center = {
        x: w / 2,
        y: (h / 2) - 50
    };

    var init = function () {

        $(document).keydown(function (evt) {
            if (evt.keyCode == 32) {
                spin();
            }
        });

        $logo = $('#logo');
        $logo.width(rOuter);

        drawSections();
        arrow = drawArrow();

    };

    /**
     * Finds the start and end point for arc on a circle with a given radius, start and end angle
     */
    var getPoints = function (centerX, centerY, rOuter, rInner, startAngle, endAngle) {

        var points = {};
        points.inner = {};
        points.outer = {};

        points.inner.x1 = center.x + rInner * Math.cos(startAngle * curvePoint);
        points.inner.y1 = center.y + rInner * Math.sin(startAngle * curvePoint);
        points.inner.x2 = center.x + rInner * Math.cos(endAngle * curvePoint);
        points.inner.y2 = center.y + rInner * Math.sin(endAngle * curvePoint);

        points.outer.x1 = center.x + rOuter * Math.cos(startAngle * curvePoint);
        points.outer.y1 = center.y + rOuter * Math.sin(startAngle * curvePoint);
        points.outer.x2 = center.x + rOuter * Math.cos(endAngle * curvePoint);
        points.outer.y2 = center.y + rOuter * Math.sin(endAngle * curvePoint);

        return points;
    };

    var getFontScale = function (_size) {
        var scaleSource = _size;
        fontSize = scaleSource * scaleFactor; //Multiply the width of the body by the scaling factor:

    };

    var drawSections = function () {

        var beginAngle = 0;
        var endAngle = sectionAngle;

        for (var i = 0; i < prizes.length; i++) {
            var points = getPoints(center.x, center.y, rOuter, rInner, beginAngle, endAngle);

            var edge1 = drawSectionBorder(points, true);

            var arc1 = drawArc(rOuter, beginAngle, endAngle, points);

            var edge2 = drawSectionBorder(points, false);

            var section = paper.path(edge1 + arc1 + edge2 + " z").attr({ // z close path
                stroke: color[i % color.length],
                "stroke-width": strokeWidth,
                'stroke-linejoin': 'round',
                fill: color[i % color.length]
            });
            section.toBack();
            section.node.id = 'section' + i;
            section.node.zIndex = 0;

            if (i === 0) {
                getFontScale(section.getBBox().width);
            }
            sections[i] = section;

            var label = drawLabel(prizes[i], beginAngle + sectionAngle / 2, i);
            label.toFront();
            label.node.id = 'label' + i;
            labels[i] = label;

            beginAngle = endAngle;
            endAngle += sectionAngle;
        }

    };

    var drawSectionBorder = function (points, isLeftBorder) {
        var _edge;
        if (isLeftBorder) {
            _edge = 'M' + points.inner.x1 + ' ' + points.inner.y1 + "L" + points.outer.x1 + ' ' + points.outer.y1;
        } else {
            _edge = 'L' + points.inner.x2 + ' ' + points.inner.y2;
        }
        return _edge;
    };

    var drawCircle = function () {
        var circle = paper.circle(center.x, center.y, rOuter);
        circle.attr({
            "stroke": "#E1E1E1",
            "stroke-width": strokeWidth
        });
        circle.id = "circle";
    };

    var drawArrow = function () {
        var arrowWidth = rOuter / 7;
        var arrowHeight = arrowWidth / 3;
        var arrow = paper.path("M" + (center.x + rOuter - arrowHeight) + " " + center.y + "l " + arrowWidth + " -" + arrowHeight + " l 0 " + (arrowHeight * 2) + " z").attr({
            stroke: colorArrow[1],
            "stroke-width": 4,
            'stroke-linejoin': 'round',
            fill: colorArrow[0]
        });
        arrow.toFront();
        arrow.node.id = "arrow";
        arrow.node.zIndex = 100;
        return arrow;

    };

    var drawLabel = function (label, angle, points, i) {

        var attr = {
            font: fontSize + 'px Arial, Helvetica',
            "text-anchor": 'start',
            fill: fontColor,
            "font-weight": "bold"

        };

        var text = paper.text(center.x + rInner + 10, center.y, label).attr(attr);
        text.node.id = 'text' + i;
        text.node.zIndex = 10;
        //text.node.setAttribute("filter", "url('filters.svg#dropShadow')");
        text.rotate(angle, center.x, center.y);
        return text;
    };

    var drawArc = function (radius, startAngle, endAngle, points) {
        return circularArcPath(radius, startAngle, endAngle, points);
    };

    var arcPath = function (startX, startY, endX, endY, radius1, radius2, angle) {
        var arcSVG = [radius1, radius2, angle, 0, 1, endX, endY].join(' ');
        return " a " + arcSVG;
    };

    var circularArcPath = function (radius, startAngle,
                                    endAngle, points) {

        return arcPath(points.outer.x1, points.outer.y1, points.outer.x2 - points.outer.x1, points.outer.y2 - points.outer.y1, radius, radius, 0);
    };

    var spin = function () {
        var degree = randomFromTo();

        if (selected) {
            selected.attr({
                "stroke-width": strokeWidth
            });
            arrow.show();
            var label = document.getElementById("label" + selected.node.id.split("section")[1]);
            selected.toBack();

        }

        for (var z = 0; z < prizes.length; z++) {

            if (sections[z].attr("rotation")) {
                if (z === 0) {
                    sections[z].stop().animate({rotation: (degree + +sections[z].attr("rotation").split(" ").shift()) + " " + center.x + " " + center.y}, seconds, '>', highlight);
                } else {
                    sections[z].stop().animateWith(sections[0], {rotation: (degree + +sections[z].attr("rotation").split(" ").shift()) + " " + center.x + " " + center.y}, seconds, '>');
                }
            } else {
                if (z === 0) {
                    sections[z].stop().animate({rotation: degree + " " + center.x + " " + center.y}, seconds, '>', highlight);
                }
                else {
                    sections[z].stop().animateWith(sections[0], {rotation: degree + " " + center.x + " " + center.y}, seconds, '>');
                }
            }
        }

        for (var i = 0; i < prizes.length; i++) {
            // node.attr("rotation") returns something like 50 200 200, so we have to split the string and grab the first number with shift
            labels[i].stop().animateWith(sections[0], {rotation: (degree + +labels[i].attr("rotation").split(" ").shift()) + " " + center.x + " " + center.y}, seconds, '>');
        }
    };

    var highlight = function () {
        var section = document.elementFromPoint(center.x + rInner + 2, center.y);

        if (section.raphael) {
            selected = section.raphael;
            //section.raphael.toBack();
            var label = document.getElementById("label" + section.id.split("section")[1]);
            arrow.hide();
            section.raphael.toFront();
            label.raphael.toFront();
            section.raphael.animate({"stroke-width": 30}, 2000, "elastic");

        }

    };

    var randomFromTo = function () {
        var number = Math.floor(Math.random() * (random[0] - random[1]) + random[1]);

        return number;
    };


    init();

    return {
        spin: spin
    };

});
