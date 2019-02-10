const utils = require('./src/utils');
const fs = require('fs')

module.exports = {
  soilType(point) {
    return new Promise((resolve,reject) => {
      if (!point) return reject(this.invalidRequest)

      let geometry
      try {
        geometry = utils.createGeometry(point,reject)
      } catch (error) {
        return resolve(error)
      }

      const url = `https://services.bgr.de/wms/boden/boart1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`

      utils.request(url)
        .then(res => {
          resolve(utils.soilTypeHtmlParsing(res))
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  humusContent(point) {
    return new Promise((resolve,reject) => {
      if (!point) return reject(this.invalidRequest)

      let geometry
      try {
        geometry = utils.createGeometry(point,reject)
      } catch (error) {
        return resolve(error)
      }

      const url = `https://services.bgr.de/wms/boden/bodeneigenschaften/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=1&QUERY_LAYERS=1&INFO_FORMAT=text%2Fhtml&I=452&J=371`

      utils.request(url)
        .then(res => {
          fs.writeFileSync('test.html', res, 'utf8')
          resolve(utils.soilTypeHtmlParsing(res))
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  sqr(point, layer) {
    return new Promise((resolve,reject) => {
      if (!point) return reject(this.invalidRequest)
      if (!layer) layer = 18

      let geometry
      try {
        geometry = utils.createGeometry(point,reject)
      } catch (error) {
        return resolve(error)
      }

      const url = `https://services.bgr.de/wms/boden/sqr1000/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=830&WIDTH=561&LAYERS=${layer}&QUERY_LAYERS=${layer}&INFO_FORMAT=text%2Fhtml`

      utils.request(url)
        .then(res => {
          resolve(utils.sqrHtmlParsing(res))
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
