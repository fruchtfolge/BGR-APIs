const utils = require('./src/utils')

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

      const options = {
        hostname: 'services.bgr.de',
        port: 443,
        path: `/wms/boden/boart1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`,
        method: 'GET'
      }

      utils.request(options)
        .then(res => {
          resolve(utils.soilTypeHtmlParsing(res,5))
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

      const options = {
        hostname: 'services.bgr.de',
        port: 443,
        path: `/wms/boden/humus1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`,
        method: 'GET'
      }

      utils.request(options)
        .then(res => {
          resolve(utils.soilTypeHtmlParsing(res,3))
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  sqr(point, layer) {
    return new Promise((resolve,reject) => {
      if (!point) return reject(this.invalidRequest)
      if (!layer) layer = 32

      let geometry
      try {
        geometry = utils.createGeometry(point,reject)
      } catch (error) {
        return resolve(error)
      }

      const options = {
        hostname: 'services.bgr.de',
        port: 443,
        path: `/wms/boden/sqr1000/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=830&WIDTH=561&LAYERS=${layer}&QUERY_LAYERS=${layer}&INFO_FORMAT=text%2Fhtml`,
        method: 'GET'
      }

      utils.request(options)
        .then(res => {
          resolve(utils.sqrHtmlParsing(res))
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
