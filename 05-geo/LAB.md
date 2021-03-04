### Running the app
* From this directory, run `npm run serve`
* Click "Preview running application", and open it in a new window
* Add the Vue devtools browser extension

### Lab tasks

#### General tasks
* implement a simple HTML-only color legend in the header where it says "Legend Here". Use either CSS flex or grid to lay it out

#### SVG map
* implement the GeoJSON component for the SVG map
* try out different projections: see https://github.com/d3/d3-geo/blob/master/README.md#geoEqualEarth
* when a user hovers over a country, show the value that the color represents below the country name
* look at the structure of a GeoJSON object

#### Mapbox map
* get an API token from the Mapbox website, and put it in `.env.local`
* implement a brand new component for the Mapbox map
* try changing the starting center, zoom, and bounds
* start looking at [tutorials](https://docs.mapbox.com/help/tutorials/?product=Mapbox+GL+JS&language=JavaScript) on the Mapbox site, then dig into the API as you get more comfortable

#### Element+ (component library)
* explore the [API](https://element-plus.org/#/en-US/component/installation), and implement one more component of your choice