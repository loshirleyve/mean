/**
 * Created by rxy on 15/10/19.
 */



var script = document.createElement("script");
script.type = "text/javascript";
script.src = "../vendor/jQuery/jQuery-2.1.4.min.js"
script.src="../vendor/bootstrap/js/bootstrap.min.js"
var link = document.createElement("link");
link.rel='stylesheet'
link.href='../vendor/bootstrap/css/bootstrap-theme.css'
link.href='../vendor/bootstrap/css/bootstrap.css'

function $(id) {
    return document.getElementById(id);
}

function addRow(table) {
    var _tab = $(table);
    var _row = _tab.insertRow(1);
    var colums = _tab.rows[0].cells.length;
    for (var i = 1; i <= colums; i++) {
        var cell = _row.insertCell();
        cell.className="text-center";
        if (i == 1) {
            cell.innerHTML = "1";
        }
        else if (i == colums) {
            cell.innerHTML = "<a class='btn btn-default btn-sm'>编辑</a><a class='btn btn-default btn-sm' onclick='deleteRow(_tab,_row);'>删除</a>";
        }
    }
}

function deleteRow(table,row)
{
    alert("11111");
    table.deleteRow(row.rowIndex);
}