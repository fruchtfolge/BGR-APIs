const assert = require('assert')
const bgr = require('..')
const plotGeometry = require("./plot.json")

;(async () => {
  try {
    // Test soil quality for given point as GeoJSON
    const sqrPoint = await bgr.sqr({
      type: 'Point',
      coordinates: [6.9977272, 50.778018]
    }, 32)
    assert.deepStrictEqual(sqrPoint, 72)
  } catch (e) {
    console.error(e)
    process.exit()
  }

  // same point as array
  try {
    const sqrArr = await bgr.sqr({
      type: 'Point',
      coordinates: [6.9977272, 50.778018]
    }, 32)
    assert.deepStrictEqual(sqrArr, 72)
  } catch (e) {
    console.error(e)
    process.exit()
  }
  
  // testing a plot
  try {
    const sqrPlot = await bgr.sqr(plotGeometry, 32)
    assert.deepStrictEqual(sqrPlot, 70.5)
  } catch (e) {
    console.error(e)
    process.exit()
  }
  
  console.log('Passed all SQR tests')
  
  try {
    // check humus content for point
    const humusPoint = await bgr.humusContent({
      type: 'Point',
      coordinates: [6.9977272, 50.778018]
    })
    assert.deepStrictEqual(humusPoint, 'nicht bestimmt')
  } catch (e) {
    console.error(e)
    process.exit()
  }

  // check humus content for point as array
  try {
    const humusArr = await bgr.humusContent({
      type: 'Point',
      coordinates: [6.9977272, 50.778018]
    })
    assert.deepStrictEqual(humusArr, 'nicht bestimmt')
  } catch (e) {
    console.error(e)
    process.exit()
  }
  
  // humusContent for point given as plot geometry
  try {
    const humusPlot = await bgr.humusContent(plotGeometry)
    assert.deepStrictEqual(humusPlot, '2 - <3%')
  } catch (e) {
    console.error(e)
    process.exit()
  }
  
  console.log('Passed all humus content tests')
  
  try {
    // check soil type for point
    const soilTypePoint = await bgr.soilType({
      type: 'Point',
      coordinates: [6.9977272, 50.778018]
    })
    assert.deepStrictEqual(soilTypePoint, 'Lehmsande (ls)')
  } catch (e) {
    console.error(e)
    process.exit()
  }

  // check soil type for point as array
  try {
    const soilTypeArr = await bgr.soilType({
      type: 'Point',
      coordinates: [6.9977272, 50.778018]
    })
    assert.deepStrictEqual(soilTypeArr, 'Lehmsande (ls)')
  } catch (e) {
    console.error(e)
    process.exit()
  }
  
  // soil type for point given as plot geometry
  try {
    const soilTypePlot = await bgr.soilType(plotGeometry)
    assert.deepStrictEqual(soilTypePlot, 'Tonschluffe (tu)')
  } catch (e) {
    console.error(e)
    process.exit()
  }
  
  console.log('Passed all soil type tests')
})()