# BGR Soil Information

The [Bundesanstalt für Geowissenschaften und Rohstoffe (BGR)](https://www.bgr.bund.de/EN/Home/homepage_node_en.html) provides information on soil quality, types and other factors significant for agricultural use in Germany. As the information is solely available as a mapping service, this repo is aimed at providing a Node-JS client API to the information available.

## Installation
```
npm install bgr-apis
```

## Methods

### ```sqr(point,layer)```

```js
bgr.sqr({
  type: 'Point',
  coordinates: [6.9977272,50.778018]
}, 18)
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
`layer` You can specify another layer if you need information other than the soil quality index (defaults to 18)  


| Layer | Description (German)                          |
|:------|:----------------------------------------------|
| 18    | Soil Quality Index (default)                  |
| 17    | Bewertung der Bodenarten                      |
| 16    | Bewertung des Humusvorrats                    |
| 15    | Bewertung der Bodenstruktur                   |
| 14    | Bewertung der Packungsdichte                  |
| 13    | Bewertung der effektiven Durchwurzelungstiefe |
| 12    | Bewertung des Bodenwasserdargebots            |
| 11    | Bewertung des mittleren Grundwassertiefstands |
| 10    | Bewertung der Hangneigung                     |
| 9     | Bewertung der standörtlichen Bodengüte        |
| 7     | Bewertung der Versauerungsgefährdung          |
| 6     | Bewertung der Gründigkeit                     |
| 5     | Bewertung der Trockenheitsgefährdung          |
| 4     | Bewertung des Steingehaltes im Wurzelraum     |
| 3     | Ertragslimitierende Faktoren                  |
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

`Point` can either be a GeoJSON point, an array of the form `[lng, lat]` or a GeoJSON feature (e.g. a plot). When a plot (GeoJSON feature) is entered, the centroid of the plot is used.



## Contribution  
Contribution is highly appreciated! If you have improvements in code quality and/or additional features just open a pull.
