//mock data
var jsonData = [
	{'id':'001234',"name":"Company0","profit":0,"risk":0,"succ":0, 'sortSample1':'1', 'sortSample':'1'},
	{'id':'001630',"name":"Company1","profit":250000,"risk":12,"succ":80, 'sortSample1':'1', 'sortSample2':'1'},
	{'id':'001256',"name":"Company2","profit":225000,"risk":15,"succ":80, 'sortSample1':'1', 'sortSample2':'2'},
	{'id':'001684',"name":"Company3","profit":200000,"risk":84,"succ":80, 'sortSample1':'1', 'sortSample2':'1'},
	{'id':'005555',"name":"Company4","profit":185000,"risk":23,"succ":80, 'sortSample1':'1', 'sortSample2':'2'},
	{'id':'008465',"name":"Company5","profit":175000,"risk":22,"succ":80, 'sortSample1':'1', 'sortSample2':'1'},
	{'id':'001635',"name":"Company6","profit":165000,"risk":15,"succ":80, 'sortSample1':'1', 'sortSample2':'2'},
	{'id':'011234',"name":"Company7","profit":155000,"risk":95,"succ":80, 'sortSample1':'1', 'sortSample2':'1'},
	{'id':'012345',"name":"Company8","profit":145000,"risk":76,"succ":80, 'sortSample1':'1', 'sortSample2':'2'},
	{'id':'018468',"name":"Company9","profit":135000,"risk":67,"succ":80, 'sortSample1':'1', 'sortSample2':'1'},
	{'id':'001400',"name":"Company10","profit":250000,"risk":15,"succ":80, 'sortSample1':'2', 'sortSample2':'2'},
	{'id':'000530',"name":"Company11","profit":155000,"risk":11,"succ":80, 'sortSample1':'2', 'sortSample2':'1'},
	{'id':'000120',"name":"Company12","profit":145000,"risk":76,"succ":80, 'sortSample1':'2', 'sortSample2':'2'},
	{'id':'000870',"name":"Company13","profit":165000,"risk":15,"succ":80, 'sortSample1':'2', 'sortSample2':'1'},
	{'id':'030050',"name":"Company14","profit":155000,"risk":11,"succ":80, 'sortSample1':'2', 'sortSample2':'2'},
	{'id':'020050',"name":"Company15","profit":145000,"risk":76,"succ":80, 'sortSample1':'2', 'sortSample2':'1'},
	{'id':'040400',"name":"Company16","profit":165000,"risk":15,"succ":80, 'sortSample1':'2', 'sortSample2':'2'},
	{'id':'000550',"name":"Company17","profit":155000,"risk":11,"succ":80, 'sortSample1':'2', 'sortSample2':'1'},
	{'id':'000220',"name":"Company18","profit":145000,"risk":76,"succ":80, 'sortSample1':'2', 'sortSample2':'2'},
	{'id':'000440',"name":"Company19","profit":135000,"risk":67,"succ":80, 'sortSample1':'2', 'sortSample2':'2'}
];
var filterData = {select1:'', select2:''};

var titles = {"profit":"수익지수","risk":"위험지수","succ":"상승확률"};

var chartColor = [
	["FF0F00", "FF6600", "FF9E01", "FCD202", "F8FF01"],
	["66CCFF", "CC99FF", "FF99CC", "CCFF99", "99FFCC"]
];

$(function() {
	//this toggles the left menu bar when the toggle box is clicked
	//uses the niceScroll API
	$('.sidebar-toggle-box .fa-bars').click(function (e) {
		$(".leftside-navigation").niceScroll({
			cursorcolor: "#1FB5AD",
			cursorborder: "0px solid #fff",
			cursorborderradius: "0px",
			cursorwidth: "3px"
		});
		$('#sidebar').toggleClass('hide-left-bar');
		e.stopPropagation();
		$('#container').removeClass('open-right-panel')
		$('.right-sidebar').removeClass('open-right-bar')
		$('.header').removeClass('merge-header')
	});
	
	//panel up and down
	$('.panel .tools .fa').click(function () {
		var el = $(this).parents(".panel").children(".panel-body");
		if ($(this).hasClass("fa-chevron-down")) {
			$(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
			el.slideUp(200);
		} else {
			$(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			el.slideDown(200);
		}
	});
	
	//panel close
	$('.panel .tools .fa-times').click(function () {
		$(this).parents(".panel").parent().remove();
	});
});


/** AmChart 생성하는 함수
* @chartName 차트 생성할 위치의 id
* @chartVar 읽을 데이타 명
* @chartLength 화면 표시할 데이터 갰수 
* @chartTheme 차트 색상 not in use
*
* @jsonData -data from server
* @filterData  -data from user
**/
function makeMainChart(chartName, chartVar, chartLength, chartTheme){
	var _jsonData = orderDataByKey(jsonData, chartVar);
	
	//to-do
	//data filtering change this to a function once the data types are shown
	if (filterData.select1 != ''){
		var _filteredData = [];
		for (var i = 0; i < _jsonData.length; i++){
			if (_jsonData[i].sortSample1 == filterData.select1){
				_filteredData.push(_jsonData[i]);
			}
		}
		_jsonData = _filteredData;
	}
	if (filterData.select2 != ''){
		var _filteredData = [];
		for (var i = 0; i < _jsonData.length; i++){
			if (_jsonData[i].sortSample2 == filterData.select2){
				_filteredData.push(_jsonData[i]);
			}
		}
		_jsonData = _filteredData;
	}
	
	if (chartLength == null){
		chartLength = 5;
	} else if (chartLength > _jsonData.length){
		chartLength = _jsonData.length;
	}
	//갰수로 높이 조정
	$('#'+chartName).css('height', (chartLength*50+100)+'px');
	
/* 	if (chartTheme == null || chartTheme > chartColor.length){
		chartTheme = 0;
	} */

	//insert data from json to array
	var dataProvider = [];
	for (var i = 0; i < chartLength; i++){
		dataProvider.push({
			"name": _jsonData[i]["name"],
			"values": _jsonData[i][chartVar],
			//"color": "#"+chartColor[chartTheme][i]
			"color": "#"+idToColor(_jsonData[i]['id'])
		});
		console.log(idToColor(_jsonData[i]['id']));
	}
	
	var _ops = {};
	_ops.theme = "theme";
	_ops.type = "serial";
	_ops.export = {"enabled": true};
	_ops.dataProvider = dataProvider;
	_ops.angle = 30;
	_ops.startDuration = 0;
	_ops.depth3D = 20;
	_ops.valueAxes = [{"title": titles[chartVar]}];
	_ops.graphs = [{
		"balloonText": "[[category]]:[[value]]",
		"fillColorsField": "color",
		"fillAlphas": 1,
		"lineAlpha": 0.2,
		"title": chartVar,
		"type": "column",
		"valueField": "values"
	}];
	_ops.rotate = true;
	_ops.categoryAxis = {
		"gridPosition": "start",
		"fillAlpha": 0.05,
		"position": "left"
	};
	_ops.categoryField = "name";
	_ops.chartCursor = null;
		
	AmCharts.makeChart(chartName, _ops);
	//제목삽입
	$('#'+chartName+'_title').text(titles[chartVar]+' 상위 top '+chartLength);
};

//to-do AmMap -- maybe?
//to-do AmChart with baseline -- name it makeDetailChart, similar vars as EasyPieChart?
	//see chartType 2, might need to make baseline adjustable
	//see AiT Finder
//to-do AmChart/AmStockChart 
	//see situation and spectrum
//to-do Progressbar to use instead of EasyPieChart for small graphs

/** EasyPieChart 생성하는 함수
* @chartName 차트 생성할 위치의 id
* @chartVar 읽을 데이타 명
* @chartType not in use
* @chartId not in use
* @chartTheme color theme
**/
function makeEasyPieChart(chartName, chartVar, chartType, chartId, chartTheme){
	// if (chartType == 1){
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
	// } else {
		// var _ops = {
			// percent: jsonData[arrayIndex]['succ'],
			// lineWidth: 70,
			// trackColor: '#fff',
			// barColor: '#f1f2f3',
			// scaleColor: '#fff',
			// size: 130,
			// lineCap: 'butt',
			// animate: 5000
		// }
	// }
	$('#'+chartName).attr('data-percent', jsonData[arrayIndex]['succ']);
	$('#'+chartName+'_title').html(jsonData[arrayIndex]['name']);
	$('#'+chartName+'_percent').html(jsonData[arrayIndex]['succ']);
	var element = document.querySelector('#'+chartName);
	new EasyPieChart(element, _ops);
}

/** dataTable 생성
* @chartName 차트 생성할 위치의 id
* @chartVar 읽을 데이타 명
*/
function initDynamicTables(chartName, chartVar){
	var aaData = [];
	for (var i = 0; i < jsonData.length; i++){
		var aData = [];
		aData.push(i);
		aData.push(jsonData[i]['name']);
		aData.push(jsonData[i][chartVar]);
		aaData.push(aData);
	}
	
    $('#'+chartName).dataTable({
		'aaData':aaData,
		"aoColumns": [
			{'sTitle':'종목코드'},
			{'sTitle':'종목명'},
			{'sTitle':titles[chartVar]},
		],
		"aaSorting": [[ 2, "desc" ]]
    });
}

/** 데이타 배열 소트
* @objArr 소트할 배열
* @key 소트기준 값
*/
function orderDataByKey(objArr, key){
	return objArr.sort(function(a, b){
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	})
}

//to-do label function
//function to convert id into color
function idToColor(itemId){
	var r;
	var b;
	var g;
	
	if (itemId.length < 6){
		r = itemId.substring(0,1);
		b = itemId.substring(1,2);
		g = itemId.substring(2,3);
	} else {
		r = itemId.substring(3,4);
		b = itemId.substring(4,5);
		g = itemId.substring(5,6);
	}
	
	r = parseInt(r * 255/10);
	b = parseInt(b * 255/10);
	g = parseInt(g * 255/10);
	
	return componentToHex(r) + componentToHex(b) + componentToHex(g);
}
//number to hex converter
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

/*	혹시 미래 사용 태마
	} else if (chartType == 2) {
		_ops.angle = 0;
		_ops.startDuration = 1;
		_ops.depth3D = 0;
		_ops.valueAxes = [{
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
		_ops.graphs = [{
			"balloonText": "[[category]]:[[value]]",
			"colorField": "color",
			"fillAlphas": 0.85,
			"lineAlpha": 0.1,
			"type": "column",
			"valueField": "values"
		}];
		_ops.rotate = false;
		_ops.categoryAxis = {
			"category": "80",
			"label": "fines for speeding increased",
			"gridPosition": "start",
			"axisAlpha":0,
			"gridAlpha":0,
			"labelRotation": 45,
			"title": titles[chartVar]
		};
		_ops.categoryField = "name"; //could create an empty field in the data array to remove labels
		_ops.chartCursor = {
			"categoryBalloonEnabled": false,
			"cursorAlpha": 0,
			"zoomable": false
		}
	} else {	//if chartType = 3
		_ops.angle = 30;
		_ops.startDuration = 2;
		_ops.depth3D = 40;
		_ops.valueAxes = [{"position": "left","axisAlpha":0,"gridAlpha":0}];
		_ops.graphs = [{
			"balloonText": "[[category]]:[[value]]",
			"colorField": "color",
			"fillAlphas": 0.85,
			"lineAlpha": 0.1,
			"type": "column",
			"topRadius":1,
			"valueField": "values"
		}];
		_ops.rotate = false;
		_ops.categoryAxis = {
			"gridPosition": "start",
			"axisAlpha":0,
			"gridAlpha":0,
			"labelRotation": 45,
			"title": titles[chartVar]
		};
		_ops.categoryField = "name";
		_ops.chartCursor = {
			"categoryBalloonEnabled": false,
			"cursorAlpha": 0,
			"zoomable": false
		}
	}
*/