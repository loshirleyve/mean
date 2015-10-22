/**
 * Created by rxy on 15/10/19.
 */



var script=document.createElement("script");
script.type="text/javascript";
script.src="../vendor/jQuery/jQuery-2.1.4.min.js"

var pos=0;
function whichElement(e)
{
    var targ
    if(!e) var e=window.event
    if(e.target) targ= e.target
    else if(e.srcElement)targ= e.srcElement
    if(targ.nodeType==3)
    targ=targ.parentNode
    if(targ.targName="TD")
    {
        pos=targ.parentNode.rowIndex+1
    }
    else if(targ.tagName=="INPUT")
    {

    }
    else
    {
        pos=0
    }
}

function addRow()
{
    var x=document.getElementById("myTable").insertRow(pos)
    var y= x.insertCell(0)
    var z= x.insertCell(1)
    y.innerHTML=document.getElementById("cell1").value
    z.innerHTML=docuemnt.getElementById("cell2").value
}
