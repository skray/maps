# maps - An adventure with leaflet.js [![Build Status](https://travis-ci.org/skray/maps.svg?branch=master)](https://travis-ci.org/skray/maps)

This is a tool I am slowly building to both learn about web mapping tools, and to create a platform to make maps I am interested in.

It is written using AngularJS and the [angular-leaflet-directive](https://github.com/tombatossals/angular-leaflet-directive) wrapper for [leaflet.js](http://leafletjs.com/).

### Development
If anyone is for some reason interested in trying this out locally, it is built and run with [gulp.js](http://gulpjs.com/), so just pull down the repo, `npm install`, and then run `gulp`. The app will be available at [localhost:8000](http://localhost:8000).

All files are edited in the `src/` directory, and gulp will do its magic and put everything in `public/` for consumption by the client.

Tests are run with `karma start`.
