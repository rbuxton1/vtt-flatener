const {ipcRenderer, dialog} = require("electron");

var inputFile = "", outputFile = "";

$(document).ready(() => {
  $("#input").click(async () => {
    //ipcRenderer.invoke("flatten", $("#input").val(), $("#output").val());
    var ret = await ipcRenderer.invoke("selectInput");
    inputFile = ret[0];
    $("#input").html(inputFile);
  });
  $("#output").click(async () => {
    //ipcRenderer.invoke("flatten", $("#input").val(), $("#output").val());
    outputFile = await ipcRenderer.invoke("selectOutput");
    //outputFile = ret[0];
    $("#output").html(outputFile);
  });
  $("#go").click(async () => {
    await ipcRenderer.invoke("flatten", inputFile, outputFile);
    alert("Flattened!");
  });
});
