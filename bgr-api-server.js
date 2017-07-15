var express = require('express');
var app = express();
var turf = require('@turf/turf');
var proj4 = require("proj4");
var https = require('https');
var DomParser = require('dom-parser');

var invalidRequest = {Error: {Code: 400, Message: 'Invalid Request'}};
var noInfo = {Error: {Code: 404, Message: 'No data available for request'}};

function createBBox (req) {
	var lat = Number(req.query.lat);
	var lng = Number(req.query.lng);

	var geometry = {
	  "type": "Point",
	  "coordinates": [lng, lat]
	};

	var toProjection = new proj4.Proj('EPSG:3857');
	var fromProjection = new proj4.Proj('WGS84');

	var bboxArray = turf.bbox(turf.buffer(geometry, 0.01, 'kilometers'));
	var boundFirst = bboxArray.splice(0,2);
	var boundSecond = bboxArray;

	reprojectionFirst = proj4(fromProjection, toProjection, boundFirst);
	reprojectionSecond = proj4(fromProjection, toProjection, boundSecond);

	return bboxString = reprojectionFirst.concat(reprojectionSecond).toString().replace(/,/g,'%2C')
}

// example request: http://localhost:8000/sqr?lng=6.9977272&lat=50.778018
app.get('/sqr', function (req, res) {
	if (!req.query) {
		res.send (invalidRequest);
	}
	else if (Number(req.query.lat) == 'NaN' && Number(req.query.lng) == 'NaN' || Number(req.query.lat) == 'NaN' || Number(req.query.lng) == 'NaN') {
		res.send (invalidRequest);
	}
	else {
		if (!req.query.layer) {
			var layer = 18;
		}
		else {
			var layer = Number(req.query.layer);
		}
		var urlStringSQR = 'https://services.bgr.de/wms/boden/sqr1000/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=' + createBBox(req) + '&HEIGHT=830&WIDTH=561&LAYERS=' + layer + '&QUERY_LAYERS=' + layer + '&INFO_FORMAT=text%2Fhtml'

		https.get(urlStringSQR, function(data) {
		    if (data.statusCode !== 200) {
		    	return res.send({Error: {Code: data.statusCode, Message: 'Request failed.'}});
		    }
		    else {
		    	data.setEncoding('utf8');
			    data.on('data', function(chunk){
			        return res.send(sqrHtmlParsing(chunk));
			    });
		    }
		});
	}
});

// example request: http://localhost:8000/soilType?lng=6.9977272&lat=50.778018
app.get('/soilType', function (req, res) {
	if (!req.query) {
		res.send (invalidRequest);
	}
	else if (Number(req.query.lat) == 'NaN' && Number(req.query.lng) == 'NaN' || Number(req.query.lat) == 'NaN' || Number(req.query.lng) == 'NaN') {
		res.send (invalidRequest);
	}
	else {
		var urlStringSoilQuality = 'https://services.bgr.de/wms/boden/boart1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=' + createBBox(req) + '&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371'

		https.get(urlStringSoilQuality, function(data) {
		    if (data.statusCode !== 200) {
		    	return res.send({Error: {Code: data.statusCode, Message: 'Request failed.'}});
		    }
		    else {
		    	data.setEncoding('utf8');
			    data.on('data', function(chunk){
			        return res.send(soilTypeHtmlParsing(chunk));
			    });
		    }
		});
	}
});

function sqrHtmlParsing (html) {
    var parser = new DomParser();
    var element = parser.parseFromString(html, "text/html");
    if (element.getElementsByTagName("td").length == 4) {
	    if (typeof element.getElementsByTagName("td")[3] == 'undefined') {
	      return noInfo;
	    } else {
	      return {Ok: {Code: 200, Result: Number(element.getElementsByTagName("td")[3].innerHTML)}};
	    }
    }
    else {
	    if (typeof element.getElementsByTagName("td")[1] == 'undefined') {
	      return noInfo;
	    } else {
	      return {Ok: {Code: 200, Result: Number(element.getElementsByTagName("td")[1].innerHTML)}};
	    }  	
    }
}

function soilTypeHtmlParsing (html) {
    var parser = new DomParser();
    var element = parser.parseFromString(html, "text/html");
    if (typeof element.getElementsByTagName("td")[3] == 'undefined') {
      return noInfo;
    } else {
      return {Ok: {Code: 200, Result: element.getElementsByTagName("td")[3].innerHTML}};
    }
}
var server = app.listen(8002, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})