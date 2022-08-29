require([
  "esri/Map",
  "esri/layers/TileLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/layers/WMSLayer",
  "esri/geometry/Point",
  "esri/views/MapView",
   "esri/Basemap",
  "esri/widgets/Search",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/widgets/Swipe",
  "esri/widgets/TimeSlider",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/widgets/LayerList",
  "esri/smartMapping/symbology/support/colorRamps",
  "esri/symbols/support/symbolUtils",
  "esri/PopupTemplate",
  "esri/popup/content/CustomContent",
  "esri/rest/support/Query",
  "esri/rest/query"
], function(Map, TileLayer,FeatureLayer,VectorTileLayer,WMSLayer,Point, MapView,Basemap,Search,Expand,Legend,Swipe,TimeSlider,Home,Locate,LayerList,colorRamps,symbolUtils,PopupTemplate,CustomContent,Query,query) {
  
    let url_head = 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/';

    let url_end = '/MapServer';

    var lyr_url = 'https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/clt_history_annual/MapServer';

    var legend_dict = {
      'clt': 'Cloud cover (%)',
      'flashrate': 'Lightning (No. of flashes)',
      'hurs': 'Relative humidity (%)',
      'huss': 'Specific humidity (%)',
      'pr': 'Precipitation (mm/day)',
      'prsn': 'Snow: snowfall amount (mm)',
      'psl': 'Sea level pressure (hPa)',
      'rls': 'Radiation, net long wave (Wm-2)',
      'rss': 'Radiation, net short wave (Wm-2)',
      'sfcWind': 'Wind speed (m/s)',
      'snw': 'Snow: lying snow amount (mm)',
      'tas': 'Temperature, Mean (°C)',
      'tasmax': 'Temperature, maximum (°C)',
      'tasmin': 'Temperature, minimum (°C)',
      'uas': 'Wind speed eastwards (m/s)',
      'vas': 'Wind speed northwards (m/s)',
      'wsgmax10m': 'Wind gusts (m/s)'
    };
  
    function show_lyr() {
      view.popup.visible = false;
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
  
      var vtlLayer = new TileLayer({
      url: lyr_url,
      spatialReference: 27700,
      title: legend_dict[var_value]
      });


      // view.ui.empty("manual");
      map.removeAll();
      

      map.layers.add(vtlLayer);
      map.layers.add(boundary_lyr);
      map.layers.add(boundary_lyr_mosa);
      map.layers.add(vtlLayer_GB);


      // view.ui.remove(legend);
      view.ui.empty("bottom-right");

      
      view.ui.add(new Legend({
        view: view,
        layerInfos: [
          {
            layer: vtlLayer,
            title: legend_dict[var_value]
          }
        ]
      }), "bottom-right");

    }
  
    var vtlLayer = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/clt_history_annual/MapServer",
    spatialReference: 27700,
    title: "Cloud cover (%)"
    });
  
    var vtlLayer2 = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/SfF67lOzKAmtSACX/arcgis/rest/services/pr_1980_spring/MapServer",
    spatialReference: 27700
    });
  
    // Create featurelayer from feature service
    const boundary_lyr = new FeatureLayer({
      // URL to the service
      url: "https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/GBR_adm1/FeatureServer",
      title: "GB boundary"
      // labelingInfo: [labelClass],
    });

    var boundary_lyr_mosa = new FeatureLayer({
      // URL to the vector tile service
      // url: "https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/GBR_adm2_black/FeatureServer",
      url: "https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/GBR_adm2_popup/FeatureServer",
      title: "Authority boundaries"
    });

    var fealayer = new FeatureLayer({
      // URL to the vector tile service
      url: "https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/socio_eco_uk/FeatureServer",
      title: "Economic activity"
    });

    var fealayer3 = new FeatureLayer({
      // URL to the vector tile service
      url: "https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/all_residents/FeatureServer",
      title: 'Number of residents'
    });

    var vtlLayer_GB = new VectorTileLayer({
      // URL to the vector tile service
      url: "https://uomanchester.maps.arcgis.com/sharing/rest/content/items/796bcd7e487b416ba3420d1ffc8649d7/resources/styles/root.json",
      title: 'Label'
    });
    

    // // Create pop-up template object
    // const template = {
    //   // NAME and COUNTY are fields in the service containing the Census Tract (NAME) and county of the feature
    //   title: "{NAME_2}, {NAME_1}",
    // };

    // boundary_lyr_mosa.popupTemplate = template;


    var map = new Map({
      basemap: {
        portalItem: {
          id: "a118075240bc4e4f8062265ecdad0e7e" // Open Grey
        }
      },
      layers: [vtlLayer,boundary_lyr,boundary_lyr_mosa,vtlLayer_GB]
    });

    var view = new MapView({
      spatialReference: 27700, 
      container: "viewDiv",
      map: map,
      center: new Point({x: 350000, y: 500000, spatialReference: 27700}),
      zoom: 4,

    });

    view.constraints = {
      minZoom: 4,
      maxZoom: 9
      };
    
    // Set the extent on the view
    // view.extent = new Extent({
    //   xmin: 350000,
    //   ymin: 500000,
    //   xmax: 350000,
    //   ymax: 500000,
    //   spatialReference:  27700
    // });

    view.ui.add("titleDiv", "top-right");

    // Add legend
    const activeLayer = map.layers.getItemAt(0);

    const legend = new Legend({
      view: view,
      layerInfos: [
        {
          layer: activeLayer,
          title: "Cloud cover (%)"
        }
      ]
    });

    // Add widget to the bottom right corner of the view
    view.ui.add(legend, "bottom-right");

    // Add home button
    const homeBtn = new Home({
      view: view
    });

    view.ui.add(homeBtn, "top-left");

    // Add locate button
    const locateBtn = new Locate({
      view: view
    });

    view.ui.add(locateBtn, {
      position: "top-left"
    });


    // Add layerlist widget
    let layerList = new LayerList({
      view: view
    });
    layerListExpand = new Expand({
      expandIconClass: "esri-icon-layer-list",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
      // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
      view: view,
      content: layerList
    });
    view.ui.add(layerListExpand, "top-left");


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


    // This custom content contains a widget
    let customContentWidget = new CustomContent({
      outFields: ["*"],
      creator: function(event) {
        var radios = document.getElementsByName('var');
        var var_name;
        var legend_name;
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            // do whatever you want with the checked radio
            var_name = radios[i].value;
            legend_name = legend_dict[var_name]
            if (var_name === 'flashrate') {var_name = 'flash'}
            if (var_name === 'wsgmax10m') {var_name = 'wsgmax'}
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        radios = document.getElementsByName('per');
        var per_name;
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            // do whatever you want with the checked radio
            per_name = i;
            
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        radios = document.getElementsByName('sea');
        var sea_name;
        for (var i = 0, length = radios.length; i < length; i++) {
          if (radios[i].checked) {
            // do whatever you want with the checked radio
            sea_name = i;
            
            // only one radio can be logically checked, don't check the rest
            break;
          }
        }

        // refer to name in attribute table; per_name: history&current&future
        // if sea_name == 0!!!
        selected_name = var_name + per_name + sea_name;
        

        // Query URL for authority boungaries
        // const queryUrl = "https://services1.arcgis.com/SfF67lOzKAmtSACX/arcgis/rest/services/GBR_adm2_black/FeatureServer/0";

        // query the selected field name to get value and return
        if (sea_name != 0) {
          let popup_val = event.graphic.attributes[selected_name].toFixed(2);
          return `${legend_name} : <b>${popup_val}</b> (mean) <br/><br/>`;
        }  
        
        if (sea_name === 0){
          let win_val = event.graphic.attributes[ var_name + per_name + '0'];
          let spr_val = event.graphic.attributes[ var_name + per_name + '1'];
          let sum_val = event.graphic.attributes[ var_name + per_name + '2'];
          let aut_val = event.graphic.attributes[ var_name + per_name + '3'];
          let popup_val = (win_val+spr_val+sum_val+aut_val)/4;
          popup_val = popup_val.toFixed(2);
          return `${legend_name} : <b>${popup_val}</b> (mean) <br/><br/>`;
        }
      }
    });

     // This custom content element contains the Search widget
     const contentWidget = new CustomContent({
      outFields: ["*"],
      creator: () => {
        return searchWidget;
      }
    });

    // Create search widget in popup
    // Create the Search widget
    let searchWidget = new Search({
      view: view,
      includeDefaultSources: false,
      locationEnabled: false,
      popupEnabled: true,
      searchAllEnabled: false,
      suggestionsEnabled: true,
      sources: [
        {
          layer: boundary_lyr_mosa,
          searchFields: ["NAME_2"],
          displayField: "NAME_2",
          exactMatch: false,
          outFields: ["*"],
          name: "NAME_2",
          placeholder: "Search by local authority"
        }
      ]
    });

    // Create the PopupTemplate and reference the two custom content elements
    const template = new PopupTemplate({
      outFields: ["*"],
      title: "{NAME_2}, {NAME_1}",
      content: [contentWidget,customContentWidget]
    });

    boundary_lyr_mosa.popupTemplate = template;

    view.popup.autoCloseEnabled = true;
  
});





