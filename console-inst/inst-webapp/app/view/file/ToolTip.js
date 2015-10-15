$(function() {
    var x = 10;
    var y = 10;
    $("a.tooltip").mouseover(function(e) {
        this.myTitle = this.title;
        this.title = "";
/*
        var tooltip = "<div id='tooltip'><img src='" + this.href + "' alt='产品预览图' width='250px' height='250px'/><\/div>"; //创建 div 元素
*/
        var tooltip = "<div id='tooltip'><p>打开原图</p><\/div>"; //创建 div 元素
        $("body").append(tooltip); //把它追加到文档中
        $("#tooltip")
            .css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            }).show("fast");   //设置x坐标和y坐标，并且显示
    }).mouseout(function() {
        this.title = this.myTitle;
        $("#tooltip").remove();  //移除
    }).mousemove(function(e) {
        $("#tooltip")
            .css({
                "top": (e.pageY + y) + "px",
                "left": (e.pageX + x) + "px"
            });
    });
})