//mock data
var jsonData = [
	{"name":"Company0","profit":0,"risk":0,"succ":0},
	{"name":"Company1","profit":250000,"risk":12,"succ":80},
	{"name":"Company2","profit":225000,"risk":15,"succ":80},
	{"name":"Company3","profit":200000,"risk":84,"succ":80},
	{"name":"Company4","profit":185000,"risk":23,"succ":80},
	{"name":"Company5","profit":175000,"risk":22,"succ":80},
	{"name":"Company6","profit":165000,"risk":15,"succ":80},
	{"name":"Company7","profit":155000,"risk":95,"succ":80},
	{"name":"Company8","profit":145000,"risk":76,"succ":80},
	{"name":"Company9","profit":135000,"risk":67,"succ":80},
	{"name":"Company10","profit":250000,"risk":15,"succ":80},
	{"name":"Company11","profit":155000,"risk":11,"succ":80},
	{"name":"Company12","profit":145000,"risk":76,"succ":80},
	{"name":"Company13","profit":165000,"risk":15,"succ":80},
	{"name":"Company14","profit":155000,"risk":11,"succ":80},
	{"name":"Company15","profit":145000,"risk":76,"succ":80},
	{"name":"Company16","profit":165000,"risk":15,"succ":80},
	{"name":"Company17","profit":155000,"risk":11,"succ":80},
	{"name":"Company18","profit":145000,"risk":76,"succ":80},
	{"name":"Company19","profit":135000,"risk":67,"succ":80}
];

var varArr = ['profit', 'risk', 'succ']
var titles = {"profit":"수익지수","risk":"위험지수","succ":"상승확률"};

var chartColor = [
	["FF0F00", "FF6600", "FF9E01", "FCD202", "F8FF01"],
	["66CCFF", "CC99FF", "FF99CC", "CCFF99", "99FFCC"]
];

//차트 초기화
$(function() {
	//to-do move amchart label to the right
	console.log('initializing functions');
	makeAmChart('chart1', 'profit');			//현제 AmChart는 모든 데이타를 출력 중
	makeAmChart('chart2', 'risk', 2);
	makeAmChart('chart3', 'succ', 3);
//	makeEasyPieChart('chart7', 1, 0);
//	makeEasyPieChart('chart8', 2, 1);
	initDynamicTables(1);
	initDynamicTables(2);
	initDynamicTables(3);
	
	//this toggles the left menu bar when the toggle box is clicked
	//uses the niceScroll API
	$('.sidebar-toggle-box .fa-bars').click(function (e) {
		/*$(".leftside-navigation").niceScroll({
			cursorcolor: "#1FB5AD",
			cursorborder: "0px solid #fff",
			cursorborderradius: "0px",
			cursorwidth: "3px"
		});*/
		$('#sidebar').toggleClass('hide-left-bar');
		/* if ($('#sidebar').hasClass('hide-left-bar')) {
			$(".leftside-navigation").getNiceScroll().hide();
		}
		$(".leftside-navigation").getNiceScroll().show(); */
		$('#main-content').toggleClass('merge-left');
		e.stopPropagation();
		// if ($('#container').hasClass('open-right-panel')) {
			$('#container').removeClass('open-right-panel')
		// }
		// if ($('.right-sidebar').hasClass('open-right-bar')) {
			$('.right-sidebar').removeClass('open-right-bar')
		// }
		// if ($('.header').hasClass('merge-header')) {
			$('.header').removeClass('merge-header')
		// }
	});
	
	//panel up and down
	$('.panel .tools .fa').click(function () {
		var el = $(this).parents(".panel").children(".panel-body");
		if ($(this).hasClass("fa-chevron-down")) {
			$(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
			el.slideUp(200);
		} else {
			$(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			el.slideDown(200); }
	});
	//panel close
	$('.panel .tools .fa-times').click(function () {
		$(this).parents(".panel").parent().remove();
	});
});

//AmChart 함수
function makeAmChart(chartName, chartVar, chartType, chartLength, chartTheme){
	var _jsonDataSort = orderDataByKey(jsonData, chartVar);
	
	if (chartType == null){
		chartType = 1;
	}
	if (chartLength == null || chartLength > _jsonDataSort.length){
		chartLength = 5;
	}
	if (chartTheme == null || chartTheme > chartColor.length){
		chartTheme = 0;
	}
	
	var dataProvider = [];
	
	for (var i = 0; i < chartLength; i++){
		dataProvider.push({
			"name": _jsonDataSort[i]["name"],
			"values": _jsonDataSort[i][chartVar],
			"color": "#"+chartColor[chartTheme][i]
		});
	}
	
	var theme = "theme";
	var type = "serial";
	
	if (chartType == 1){
		var angle = 30;
		var startDuration = 0;
		var depth3D = 20;
		var valueAxes = [{"title": titles[chartVar]}];
		var graphs = [{
			"balloonText": "[[category]]:[[value]]",
			"fillColorsField": "color",
			"fillAlphas": 1,
			"lineAlpha": 0.2,
			"title": chartVar,
			"type": "column",
			"valueField": "values"
		}];
		var rotate = true;
		var categoryAxis = {
			"gridPosition": "start",
			"fillAlpha": 0.05,
			"position": "left"
		};
		var categoryField = "name";
		var chartCursor = null;
	} else if (chartType == 2) {
		var angle = 0;
		var startDuration = 1;
		var depth3D = 0;
		var valueAxes = [{
			"position": "left",
			"axisAlpha":0,
			"gridAlpha":0,
			"guides":[{
				"fillAlpha": 0.8,
				"fillColor": "#888888",
				"lineAlpha": 0.8,
				"lineColor": "#abcdef",
				lineThickness:10,
				"toValue": 80,
				"value": 80,
				"label":"sample text",
				"inside":true
			}]
		}];
		var graphs = [{
			"balloonText": "[[category]]:[[value]]",
			"colorField": "color",
			"fillAlphas": 0.85,
			"lineAlpha": 0.1,
			"type": "column",
			"valueField": "values"
		}];
		var rotate = false;
		var categoryAxis = {
			"category": "80",
			"label": "fines for speeding increased",
			"gridPosition": "start",
			"axisAlpha":0,
			"gridAlpha":0,
			"labelRotation": 45,
			"title": titles[chartVar]
		};
		var categoryField = "name"; //could create an empty field in the data array to remove labels
		var chartCursor = {
			"categoryBalloonEnabled": false,
			"cursorAlpha": 0,
			"zoomable": false
		}
	} else {	//if chartType = 3
		var angle = 30;
		var startDuration = 2;
		var depth3D = 40;
		var valueAxes = [{"position": "left","axisAlpha":0,"gridAlpha":0}];
		var graphs = [{
			"balloonText": "[[category]]:[[value]]",
			"colorField": "color",
			"fillAlphas": 0.85,
			"lineAlpha": 0.1,
			"type": "column",
			"topRadius":1,
			"valueField": "values"
		}];
		var rotate = false;
		var categoryAxis = {
			"gridPosition": "start",
			"axisAlpha":0,
			"gridAlpha":0,
			"labelRotation": 45,
			"title": titles[chartVar]
		};
		var categoryField = "name";
		var chartCursor = {
			"categoryBalloonEnabled": false,
			"cursorAlpha": 0,
			"zoomable": false
		}
	}
		
	AmCharts.makeChart(chartName, {
		"theme": theme,
		"type": type,
		"startDuration": startDuration,
		"dataProvider": dataProvider,
		"valueAxes": valueAxes,
		"graphs": graphs,
		"depth3D": depth3D,
		"angle": angle,
		"rotate": rotate,
		"categoryAxis": categoryAxis,
		"categoryField": categoryField,
		"chartCursor": chartCursor,
		"export": {
		  "enabled": true
		}
	});
};

function makeEasyPieChart(chartName, chartType, arrayIndex){
	if (chartType == 1){
		var _ops = {
			percent: jsonData[arrayIndex]['succ'],
			lineWidth: 20,
			trackColor: '#f1f2f3',
			barColor: '#4caf50',
			scaleColor: '#fff',
			size: 130,
			lineCap: 'butt',
			color: '#5c6bc0',
			animate: 3000
		}
	} else {
		var _ops = {
			percent: jsonData[arrayIndex]['succ'],
			lineWidth: 70,
			trackColor: '#fff',
			barColor: '#f1f2f3',
			scaleColor: '#fff',
			size: 130,
			lineCap: 'butt',
			animate: 5000
		}
	}
	$('#'+chartName).attr('data-percent', jsonData[arrayIndex]['succ']);
	$('#'+chartName+'_title').html(jsonData[arrayIndex]['name']);
	$('#'+chartName+'_percent').html(jsonData[arrayIndex]['succ']);
	//$('#'+chartName).easyPieChart(_ops);
	var element = document.querySelector('#'+chartName);
	new EasyPieChart(element, _ops); //uses the jquery plugin instead of the raw easypiechart
}


//use the advanced datatable api with assort and aocolumns
function initDynamicTables(chartNum){
	var aaData = [];
	for (var i = 0; i < jsonData.length; i++){
		var aData = [];
		aData.push(i);
		aData.push(jsonData[i]['name']);
		aData.push(jsonData[i][varArr[chartNum-1]]);
		aaData.push(aData);
	}
	
    $('#dynamic-table'+chartNum).dataTable({
		'aaData':aaData,
		"aoColumns": [
			{'sTitle':'종목코드'},
			{'sTitle':'종목명'},
			{'sTitle':titles[varArr[chartNum-1]]},
		],
		"aaSorting": [[ 2, "desc" ]]
    });
}

function orderDataByKey(objArr, key){
	return objArr.sort(function(a, b){
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	})
}