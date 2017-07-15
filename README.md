# BGR Soil Maps - APIs

The [Bundesanstalt für Geowissenschaften und Rohstoffe (BGR)](https://www.bgr.bund.de/EN/Home/homepage_node_en.html) provides information on soil quality, types and other factors significant for agricultural use in Germany. As the information is available as a mapping service, this repo is aimed at providing an API (via a Node JS server) to the information available.

## Methods

### ```/sqr```

Returns the soil quality rating (integer) at a given point (see [Mueller et al. (2007)](http://www.zalf.de/de/forschung_lehre/publikationen/Documents/Publikation_Mueller_L/field_mueller.pdf) for infomation on the SQR method).  
Required parameters  
```lng``` Longitude  
```lat``` Latitude  

Optional parameters
```layer``` You can specify another layer if you need other information than the soil quality index (defaults to 18)  


| Layer | Description (German)                          |
|-------|-----------------------------------------------|
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

Example request:  
[http://v-server-node.ilb.uni-bonn.de/sqr?lng=6.9977272&lat=50.778018](http://v-server-node.ilb.uni-bonn.de/sqr?lng=6.9977272&lat=50.778018)

returns:  
```json	
{
	"Ok": {
		"Code": 200,
		"Result": 72
	}
}
```

### ```/soilType```

Returns the soil type (string, UTF-8, german) at a given point.  
Required parameters  
```lng``` Longitude  
```lat``` Latitude  

Example request:  
[http://v-server-node.ilb.uni-bonn.de/soilType?lng=6.9977272&lat=50.778018](http://v-server-node.ilb.uni-bonn.de/soilType?lng=6.9977272&lat=50.778018)

returns:  
```json	
{
	"Ok": {
		"Code": 200,
		"Result": "Lehmsande (ls)"
	}
}
```

## Contribution  
Contribution is highly appreciated! If you have improvements in code quality and/or additional features just open a pull request or write me a mail. 

