const assert = require('assert')
const bgr = require('../index')
const plotGeometry = { 'type': 'Feature', 'properties': { 'name': '1', 'id': '1' }, 'geometry': { 'type': 'Polygon', 'coordinates': [ [ [ 8.472359282984609, 52.098940574732026 ], [ 8.472385841011695, 52.09888405181575 ], [ 8.472541458742908, 52.098705607139166 ], [ 8.472664055554583, 52.09858672762726 ], [ 8.472745844081068, 52.098502499839256 ], [ 8.473077777958407, 52.09813594759476 ], [ 8.473632197332014, 52.09814014501764 ], [ 8.475482330304995, 52.0982115903363 ], [ 8.475920404239684, 52.09823183315378 ], [ 8.47742474945971, 52.09823849626592 ], [ 8.47750387554873, 52.09824000139136 ], [ 8.477296712383492, 52.09937612246312 ], [ 8.477214758007113, 52.09936312148708 ], [ 8.47698713952333, 52.09935257892118 ], [ 8.476785502568358, 52.099341574902894 ], [ 8.47600993138795, 52.09932525914868 ], [ 8.475115881120201, 52.09930881547615 ], [ 8.47454397874537, 52.099295856537175 ], [ 8.473916828515828, 52.099281634139224 ], [ 8.473577919894248, 52.09927260230557 ], [ 8.47355993067331, 52.09927213537339 ], [ 8.473389282086671, 52.09926068849093 ], [ 8.473339776614914, 52.09925736729662 ], [ 8.47315219767625, 52.099229937742344 ], [ 8.473015646461512, 52.09920278003861 ], [ 8.47287497373195, 52.099161413412745 ], [ 8.472728963971086, 52.09910728714095 ], [ 8.472552781073777, 52.099026711139864 ], [ 8.472359282984609, 52.098940574732026 ] ] ] } }

/*

// Test soil quality for given point as GeoJSON
bgr.sqr({
  type: 'Point',
  coordinates: [6.9977272,50.778018]
}, 32)
  .then(res => {
    assert.deepStrictEqual(res,72)
  })
  .catch(err => {
    console.log(err)
  })


// same point as array
bgr.sqr([6.9977272,50.778018], 32)
  .then(res => {
    assert.deepStrictEqual(res,72)
  })
  .catch(err => {
    console.log(err)
  })

// testing a plot
bgr.sqr(plotGeometry, 32)
  .then(res => {
    assert.deepStrictEqual(res,70.5)
  })
  .catch(err => {
    console.log(err)
  })

// check humus content for point
bgr.humusContent({
  type: 'Point',
  coordinates: [8.350689,52.087511]
})
  .then(res => {
    assert.deepStrictEqual(res,'2 - <3%')
  })
  .catch(err => {
    console.log(err)
  })

// check humus content for point as array
bgr.humusContent([8.350689,52.087511])
  .then(res => {
    assert.deepStrictEqual(res,'2 - <3%')
  })
  .catch(err => {
    console.log(err)
  })

// humusContent for point given as plot geometry
bgr.humusContent(plotGeometry)
  .then(res => {
    assert.deepStrictEqual(res,'2 - <3%')
  })
  .catch(err => {
    console.log(err)
  })
*/
// soil type for point
bgr.soilType({
  type: 'Point',
  coordinates: [6.9977272,50.778018]
})
  .then(res => {
    assert.deepStrictEqual(res,'Lehmsande (ls)')
  })
  .catch(err => {
    console.log(err)
  })

/*
// soil type for point given as array
bgr.soilType([6.9977272,50.778018])
  .then(res => {
    assert.deepStrictEqual(res,'Lehmsande (ls)')
  })
  .catch(err => {
    console.log(err)
  })

// soil type for point given as plot geometry
bgr.soilType(plotGeometry)
  .then(res => {
    assert.deepStrictEqual(res,'Tonschluffe (tu)')
  })
  .catch(err => {
    console.log(err)
  })
*/