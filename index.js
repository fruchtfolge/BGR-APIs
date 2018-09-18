const utils = require('src/utils');

module.exports = {
  soilType(point) {
    return new Promise((resolve,reject) => {
      if (!point) return reject(this.invalidRequest)

      const {geometry, error} = utils.createGeometry(point,reject)
      if (error) reject(error)
      const url = `https://services.bgr.de/wms/boden/boart1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`

      utils.request(url)
        .then(res => {
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

      const {geometry, error} = utils.createGeometry(point,reject)
      if (error) reject(error)
      const url = `'https://services.bgr.de/wms/boden/sqr1000/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${createBBox(geometry)}&HEIGHT=830&WIDTH=561&LAYERS=${layer}&QUERY_LAYERS=${layer}&INFO_FORMAT=text%2Fhtml`

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
