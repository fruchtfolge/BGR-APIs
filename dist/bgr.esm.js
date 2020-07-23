import fetch from 'node-fetch';
import * as DomParser from 'dom-parser';
import { bbox, toMercator, buffer, centroid } from '@turf/turf';

const noInfo = 'No information available for given query';

var utils = {
  createBBox(point) {
    const bboxArray = bbox(toMercator(buffer(point, 0.01, {units:'kilometers'})));
    return bboxArray.join('%2C')
  },

  sqrHtmlParsing(html) {
    const parser = new DomParser();
    const element = parser.parseFromString(html, 'text/html');
    if (element.getElementsByTagName('td').length == 4) {
      if (element.getElementsByTagName('td')[3]) {
        return Number(element.getElementsByTagName('td')[3].innerHTML)
      } else {
        return noInfo
      }
    } else {
      if (element.getElementsByTagName('td')[1]) {
        return Number(element.getElementsByTagName('td')[1].innerHTML)
      } else {
        return noInfo
      }
    }
  },

  soilTypeHtmlParsing(html, cell) {
    const parser = new DomParser();
    const element = parser.parseFromString(html, 'text/html');
    if (element.getElementsByTagName('td')[cell]) {
      return element.getElementsByTagName('td')[cell].innerHTML
    } else {
      return noInfo
    }
  },

  async request(url) {
    const response = await fetch(url);
    const body = await response.text();
    return body
  },

  createGeometry(point) {
    // when array is passed
    if (Object.prototype.toString.call(point) === '[object Array]') {
      if (point.length === 2) {
        return {
          'type': 'Point',
          'coordinates': point
        }
      }
      // when object is passed
    } else if (typeof point === 'object') {
      if (point.type === 'Point' && point.coordinates.length === 2) {
        return point
      } else if (point.type === 'Feature' || point.type === 'Polygon') {
        return centroid(point)
      } else {
        throw new Error('Invalid GeoJSON')
      }
      // when a string is passed
    } else {
      throw new Error('BGR function expected array of point coordinates, or a valid GeoJSON feature object. Received string instead.')
    }
  }
};

const bgr = {
  async soilType(point) {
    if (!point) throw new Error ('Invalid point passed to soilType function')
    const geometry = utils.createGeometry(point);
    const res = await utils.request(`https://services.bgr.de/wms/boden/boart1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`);
    return utils.soilTypeHtmlParsing(res,5)
  },

  async humusContent(point) {
    if (!point) throw new Error ('Invalid point passed to soilType function')
    const geometry = utils.createGeometry(point);
    const res = await utils.request(`https://services.bgr.de/wms/boden/humus1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`);
    return utils.soilTypeHtmlParsing(res,3)
  },

  async sqr(point, layer) {
    if (!point) throw new Error ('Invalid point passed to soilType function')
    if (!layer) layer = 32;
    const geometry = utils.createGeometry(point);
    const res = await utils.request(`https://services.bgr.de/wms/boden/sqr1000/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=830&WIDTH=561&LAYERS=${layer}&QUERY_LAYERS=${layer}&INFO_FORMAT=text%2Fhtml`);
    return utils.sqrHtmlParsing(res)
  }
};

export default bgr;
