import fetch from 'node-fetch'
import * as DomParser from 'dom-parser'
import { bbox, buffer, centroid, toMercator } from '@turf/turf'

const noInfo = 'No information available for given query'

export default {
  createBBox(point) {
    const bboxArray = bbox(toMercator(buffer(point, 0.01, {units:'kilometers'})))
    return bboxArray.join('%2C')
  },

  sqrHtmlParsing(html) {
    const parser = new DomParser()
    const element = parser.parseFromString(html, 'text/html')
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
    const parser = new DomParser()
    const element = parser.parseFromString(html, 'text/html')
    if (element.getElementsByTagName('td')[cell]) {
      return element.getElementsByTagName('td')[cell].innerHTML
    } else {
      return noInfo
    }
  },

  async request(url) {
    const response = await fetch(url)
    const body = await response.text()
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
}
