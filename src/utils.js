let proj4 = require('proj4')
// hack to ensure compatibilty to ES6 modules from Fruchtfolge main repo
if (proj4.default) {
  proj4 = require('proj4').default
}
const DomParser = require('dom-parser')
const https = require('https')
const bbox = require('@turf/bbox').default
const buffer = require('@turf/buffer').default
const centroid = require('@turf/centroid').default

const noInfo = 'No information available for given query'

module.exports = {
  createBBox(point) {
    const fromProjection = new proj4.Proj('WGS84')
    const toProjection = new proj4.Proj('EPSG:3857')

    const bboxArray = bbox(buffer(point, 0.01, {units:'kilometers'}))
    const boundFirst = bboxArray.splice(0, 2)
    const boundSecond = bboxArray

    const reprojectionFirst = proj4(fromProjection, toProjection, boundFirst)
    const reprojectionSecond = proj4(fromProjection, toProjection, boundSecond)

    const bboxString = reprojectionFirst.concat(reprojectionSecond).toString().replace(/,/g, '%2C')
    return bboxString
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

  soilTypeHtmlParsing(html) {
    const parser = new DomParser()
    const element = parser.parseFromString(html, 'text/html')
    if (element.getElementsByTagName('td')[3]) {
      return element.getElementsByTagName('td')[3].innerHTML
    } else {
      return noInfo
    }
  },

  request(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        const {
          statusCode
        } = res

        let error
        if (statusCode !== 200) {
          error = 'Request Failed.\n' + `Status Code: ${statusCode}`
        }

        if (error) {
          reject(error)
          res.resume()
          return
        }

        res.setEncoding('utf8')
        let html = ''
        res.on('data', (chunk) => {
          html += chunk
        })
        res.on('end', () => {
          resolve(html)
        })

      }).on('error', (error) => {
        reject(error)
      })
    })
  },

  invalidRequest() {
    return 'Invalid request.'
  },

  noInfo() {
    return 'No soil information available for given point.'
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
        return new Error(this.invalidRequest())
      }
      // when a string is passed
    } else {
      return new Error(this.invalidRequest())
    }
  }
}
