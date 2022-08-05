/* create new Proj4Leaflet CRS:
  1. Proj4 and WKT definitions can be found at sites like https://epsg.io, https://spatialreference.org/ or by using gdalsrsinfo https://www.gdal.org/gdalsrsinfo.html
  2. Appropriate values to supply to the resolution and origin constructor options can be found in the ArcGIS Server tile server REST endpoint (ex: https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Background_2/MapServer).
  3. The numeric code within the first parameter (ex: `27700`) will be used to project the dynamic map layer on the fly
  */
  var crs = new L.Proj.CRS('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs', {
    origin: [-9597137.348713825, 4470073.533885086],
    resolutions: [
    78102.63553682675,
    39051.31776841338,
    19525.65888420669,
    9762.829442103344,
    4881.414721051672,
    2440.707360525836,
    1220.353680262918,
    610.176840131459,
    305.0884200657295,
    152.54421003286475,
    76.27210501643238,
    38.13605250821619,
    19.068026254108094,
    9.534013127054047,
    4.767006563527024,
    2.383503281763512,
    1.191751640881756,
    0.595875820440878,
    0.297937910220439
    ]
  });

  // var map = L.map('map', {
  //   crs: crs
  // }).setView([53.386, -2.319], 7);

  var baseL = L.tileLayer.wms('http://t0.ads.astuntechnology.com/open/osopen/service', {
            layers: 'osopen',
            format: 'image/png',
            maxZoom: 14,
            minZoom: 5,
            continuousWorld: true,
            attribution: 'Astun Data Service &copy; Ordnance Survey.'
        });

  var map = new L.Map('map', {
    crs: crs,
    continuousWorld: true,
    worldCopyJump: false,
    layers: [
        baseL]
}).setView([53.386, -2.319], 5);

  // The min/maxZoom values provided should match the actual cache thats been published. This information can be retrieved from the service endpoint directly.
  // L.esri.tiledMapLayer({
  //   url: 'https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Background_2/MapServer',
  //   maxZoom: 19,
  //   minZoom: 6
  // }).addTo(map);

  var leftL = L.esri.tiledMapLayer({
    url: 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/wsgmax10m_future_autumn/MapServer',
    maxZoom: 14,
    minZoom: 5
  })
  .addTo(map);

  var rightL= L.esri.tiledMapLayer({
    url: 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/tas_current_autumn/MapServer',
    maxZoom: 14,
    minZoom: 5
  })
  .addTo(map);






  // feature layers will be requested in WGS84 (4326) and reprojected
  // L.esri.featureLayer({
  //   url: 'https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/all_residents/FeatureServer',
    // where: 'POP_RANK < 5',
    // pointToLayer (geojson, latlng) {
    //   return L.shapeMarkers.diamondMarker(latlng, 5, {
    //     color: '#0099FF',
    //     weight: 2
    //   });
    // }
  // }).addTo(map);


  // var otherL = L.esri.featureLayer({
  //   url: "https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/all_residents/FeatureServer/0"
  // })
  // .addTo(map);


  var sideBySide = L.control.sideBySide([],[]).addTo(map);
  sideBySide.setLeftLayers([leftL]);
  sideBySide.setRightLayers([rightL]);

//   map.removeLayer(weatherL2);
//   map.removeLayer(weatherL);


//   var weatherL3 = L.esri.tiledMapLayer({
//     url: 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/flashrate_current_autumn/MapServer',
//     maxZoom: 14,
//     minZoom: 5
//   })
//   .addTo(map);

//   var weatherL4 = L.esri.tiledMapLayer({
//     url: 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/pr_current_autumn/MapServer',
//     maxZoom: 14,
//     minZoom: 5
//   })
//   .addTo(map);

//   sideBySide.setLeftLayers([weatherL3]);
//   sideBySide.setRightLayers([weatherL4]);

let url_head = 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/';

let url_end = '/MapServer';

var leftL;

var rightL;

var lyr_url = 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/clt_history_annual/MapServer';

  function show_lyr() {
    var radios = document.getElementsByName('var');
    var var_value;
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        var_value = radios[i].value;
        console.log(var_value)
        
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

    radios = document.getElementsByName('per');
    var per_value;
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        per_value = radios[i].value;
        
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

    radios = document.getElementsByName('sea');
    var sea_value;
    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        sea_value = radios[i].value;
        
        // only one radio can be logically checked, don't check the rest
        break;
      }
    }

    layer_name = var_value + '_' + per_value + '_' + sea_value

    lyr_url = (url_head.concat(layer_name)).concat(url_end);


    leftL = L.esri.tiledMapLayer({
        url: lyr_url,
        maxZoom: 14,
        minZoom: 5
    })
    .addTo(map);

    rightL = L.esri.tiledMapLayer({
        url: 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/pr_current_autumn/MapServer',
        maxZoom: 14,
        minZoom: 5
    })
    .addTo(map);

    sideBySide.setLeftLayers([leftL]);
    sideBySide.setRightLayers([rightL]);


  }


    // Add button behaviors
    var radios = document.getElementsByName('var');
    for (var i = 0, length = radios.length; i < length; i++) {
    var id_name = 'var_opt'+ (i+1);
    document.getElementById(id_name).addEventListener("click",show_lyr);
    }

    for (var i = 0, length = 3; i<length; i++) {
    var id_name = 'per_opt'+ (i+1);
    console.log(id_name)
    document.getElementById(id_name).addEventListener("click",show_lyr);
    }

    for (var i = 0, length = 5; i<length; i++) {
    var id_name = 'sea_opt'+ (i+1);
    console.log(id_name)
    document.getElementById(id_name).addEventListener("click",show_lyr);
    }

    for (var i = 0, length = 2; i<length; i++) {
    var id_name = 'pan_opt'+ (i+1);
    console.log(id_name)
    document.getElementById(id_name).addEventListener("click",show_lyr);
    }