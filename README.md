# BGR Soil Information

The [Bundesanstalt für Geowissenschaften und Rohstoffe (BGR)](https://www.bgr.bund.de/EN/Home/homepage_node_en.html) provides information on soil quality, types and other factors significant for agricultural use in Germany. As the information is solely available as a mapping service, this repo is aimed at providing a Node-JS client API to the information available.

## Installation

### Node.js / module bundlers
```
npm install bgr-apis
```

### Browser
Download the [minified file](https://raw.githubusercontent.com/fruchtfolge/BGR-APIs/master/dist/bgr.min.js), and include it in a script tag. This will expose a global variable named `bgr`. 
This module requires the global variable `turf` exported from `@turf/turf` to be available, as well as browser support for the [fetch API](https://developer.mozilla.org/de/docs/Web/API/Fetch_API). 
```html
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@5/turf.min.js"></script>
<script src="bgr.min.js" charset="utf-8"></script>
```

## Methods

### ```sqr(point,layer)```

```js
bgr.sqr({
  type: 'Point',
  coordinates: [6.9977272,50.778018]
}, 32)
.then(res => {
  // res = 72
})
.catch(err => {
  console.log(err)
})
```

Returns the soil quality rating (float) at a given point (see [Mueller et al. (2007)](http://www.zalf.de/de/forschung_lehre/publikationen/Documents/Publikation_Mueller_L/field_mueller.pdf) for infomation on the SQR method).  

`Point` can either be a GeoJSON point, an array of the form `[lng, lat]` or a GeoJSON feature (e.g. a plot). When a plot (GeoJSON feature) is entered, the centroid of the plot is used.

Optional parameters  
`layer` You can specify another layer if you need information other than the soil quality index (defaults to 32)  


| Layer | Description (German)                          |
|:------|:----------------------------------------------|
| 32    | Soil Quality Index (default)                  |
| 31    | Bewertung der Bodenarten                      |
| 29    | Bewertung des Humusvorrats                    |
| 27    | Bewertung der Bodenstruktur                   |
| 25    | Bewertung der Packungsdichte                  |
| 23    | Bewertung der effektiven Durchwurzelungstiefe |
| 21    | Bewertung des Bodenwasserdargebots            |
| 19    | Bewertung des mittleren Grundwassertiefstands |
| 17    | Bewertung der Hangneigung                     |
| 15    | Bewertung der standörtlichen Bodengüte        |
| 12    | Bewertung der Versauerungsgefährdung          |
| 10    | Bewertung der Gründigkeit                     |
| 8     | Bewertung der Trockenheitsgefährdung          |
| 6     | Bewertung des Steingehaltes im Wurzelraum     |
| 4     | Ertragslimitierende Faktoren                  |
| 2     | Gefährdungsindikatorwerte                     |



### ```soilType(point)```

```js
bgr.soilType({
  type: 'Point',
  coordinates: [6.9977272,50.778018]
})
.then(res => {
  // res = 'Lehmsande (ls)'
})
.catch(err => {
  // handle errors
})
```

Returns the soil type (string, UTF-8, german) at a given point.  
Possible categories are:

| Soil Types        |
|:------------------|
| Reinsande (ss)    |
| Lehmsande (ls)    |
| Schluffsande (us) |
| Sandlehme (sl)    |
| Normallehme (ll)  |
| Tonlehme (tl)     |
| Lehmschluffe (lu) |
| Tonschluffe (tu)  |
| Schlufftone (ut)  |
| Moore (mo)        |
| Watt              |
| Siedlung          |
| Abbauflächen      |
| Gewässer          |

`Point` can either be a GeoJSON point, an array of the form `[lng, lat]` or a GeoJSON feature (e.g. a plot). When a plot (GeoJSON feature) is entered, the centroid of the plot is used.

### ```humusContent(point)```

```js
bgr.humusContent({
  type: 'Point',
  coordinates: [8.350689,52.087511]
})
.then(res => {
  // res = '2 - <3%'
})
.catch(err => {
  // handle errors
})
```

Return the humus content (string, UTF-8, german) for a given point.
Possible categories are:

| Humus content   |
|:----------------|
| 1 - <2%         |
| 2 - <3%         |
| 3 - <4%         |
| 4 - <6%         |
| 6 - <8%         |
| 8 - <11,5%      |
| 11,5 - <15%     |
| 15 - <30%       |
| ≥30%            |
| Wattflächen     |
| Gewässerflächen |
| Siedlungen      |
| Abbauflächen    |
| nicht bestimmt  |

`Point` can either be a GeoJSON point, an array of the form `[lng, lat]` or a GeoJSON feature (e.g. a plot). When a plot (GeoJSON feature) is entered, the centroid of the plot is used.

## Contribution
Contribution is highly appreciated 👍!  
Please open an issue in case of questions / bug reports or a pull request if you implemented a new feature / bug fix.  
In the latter case, please make sure to run `npm test` (and adapt `test/test.js` to your changes) and / or update the `README` 🙂

## License
MIT @Christoph Pahmeyer

This software is crafted with :heart: at the [University of Bonn - EMAS Group](https://www.ilr.uni-bonn.de/em/em_e.htm)
