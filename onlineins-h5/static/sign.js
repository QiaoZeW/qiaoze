var aeonlifeCA;
// var graphData = JSON.parse(localStorage.graphData);
var graphData = {
    agentName: '代理人姓名',
    agentCode: '业务ID 代理人工号',
    appntName: '投保人姓名',
    orderNo: '订单号',
    prtNo: '投保单号',
    insuredName: '被保人姓名',
};
aeonlifeCA = new AeonlifeCA();
aeonlifeCA.loadJSAndCSS('/static/aeonlifeCA/'); //JS相对路径修改方法
