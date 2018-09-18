const proj4 = require("proj4")
const DomParser = require('dom-parser')
const https = require('https')
const bbox = require('@turf/bbox').default
const buffer = require('@turf/buffer')
const centroid = require('@turf/centroid').default

module.exports = {
  createBBox(point) {
    const fromProjection = new proj4.Proj('WGS84')
    const toProjection = new proj4.Proj('EPSG:3857')

    const bboxArray = bbox(buffer(point, 0.01, {units:'kilometers'}))
    const boundFirst = bboxArray.splice(0, 2)
    const boundSecond = bboxArray

    reprojectionFirst = proj4(fromProjection, toProjection, boundFirst)
    reprojectionSecond = proj4(fromProjection, toProjection, boundSecond)

    return bboxString = reprojectionFirst.concat(reprojectionSecond).toString().replace(/,/g, '%2C')
  },

  sqrHtmlParsing(html) {
    const parser = new DomParser()
    const element = parser.parseFromString(html, "text/html")
    if (element.getElementsByTagName("td").length == 4) {
      if (element.getElementsByTagName("td")[3]) {
        return Number(element.getElementsByTagName("td")[3].innerHTML)
      } else {
        return noInfo
      }
    } else {
      if (element.getElementsByTagName("td")[1]) {
        return Number(element.getElementsByTagName("td")[1].innerHTML)
      } else {
        return noInfo
      }
    }
  },

  soilTypeHtmlParsing(html) {
    const parser = new DomParser()
    const element = parser.parseFromString(html, "text/html")
    if (element.getElementsByTagName("td")[3]) {
      return element.getElementsByTagName("td")[3].innerHTML
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
        const contentType = res.headers['content-type']

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
            "type": "Point",
            "coordinates": point
          }
      }
    // when object is passed
  } else if (typeof point === 'object') {
      if (point.type === 'Point' && point.coordinates.length === 2) {
        return point
      } else if (point.type === 'Feature') {
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
