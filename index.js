import utils from './src/utils'

const bgr = {
  async soilType(point) {
    if (!point) throw new Error ('Invalid point passed to soilType function')
    const geometry = utils.createGeometry(point)
    const res = await utils.request(`https://services.bgr.de/wms/boden/boart1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`)
    return utils.soilTypeHtmlParsing(res,5)
  },

  async humusContent(point) {
    if (!point) throw new Error ('Invalid point passed to soilType function')
    const geometry = utils.createGeometry(point)
    const res = await utils.request(`https://services.bgr.de/wms/boden/humus1000ob/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=880&WIDTH=514&LAYERS=0&QUERY_LAYERS=0&INFO_FORMAT=text%2Fhtml&I=452&J=371`)
    return utils.soilTypeHtmlParsing(res,3)
  },

  async sqr(point, layer) {
    if (!point) throw new Error ('Invalid point passed to soilType function')
    if (!layer) layer = 32
    const geometry = utils.createGeometry(point)
    const res = await utils.request(`https://services.bgr.de/wms/boden/sqr1000/?&REQUEST=GetFeatureInfo&SERVICE=WMS&CRS=EPSG%3A3857&STYLES=default&TRANSPARENT=true&VERSION=1.3.0&FORMAT=image%2Fpng&BBOX=${utils.createBBox(geometry)}&HEIGHT=830&WIDTH=561&LAYERS=${layer}&QUERY_LAYERS=${layer}&INFO_FORMAT=text%2Fhtml`)
    return utils.sqrHtmlParsing(res)
  }
}

export default bgr
