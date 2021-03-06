(function() {

    /**
     * Start the Wiard mode
     **/
    window.visualization = {};
    window.clickedIndicator = false;
    window.expandedCategory = false;

    var mapCreated = false;
    window.map;
    window.visualization.geoJsonLayers = {};
    window.visualization.geoJson = {};

    window.modalTitle = "";
    window.modalMessage = "";

    $('#modal').modal({
        show: false,
        keyboard: false
    }); // initialized with defaults

    $('#modal').on('show.bs.modal', function(event) {
        var modal = $(this)
        modal.find('.modal-title').text(window.modalTitle);
        modal.find('.modal-body').text(window.modalMessage);
        debugger;
        alert('here');
        console.log('console here');
        console.log(modal.find('p'));
        // modal.find('.modal-footer').find('.btn').text('button');
    });

    $(function() {
        // $('#vizTabs a:first').tab('show')
    });

    var geoJSONHandler = function(response, type) {

        function onEachFeature(feature, layer) {

            if (feature.properties) {
                // console.log(feature.properties);
                var name = feature.properties.sovereignt || feature.properties.usaid_reg || feature.properties.continent || feature.properties.dod_cmd || feature.properties.dos_region || feature.properties.wb_inc_lvl;
                //layer.bindPopup(name);
                layer.bindLabel(name, {noHide:true,direction:'right'});
            }
        }

        window.visualization.lastGeoJson = response;

        //if (!window.visualization.geoJsonLayers[type]) {
        //if layer doesnt exist then add it and symbolize as invisible
        window.visualization.geoJson[type] = response;

        window.visualization.geoJsonLayers[type] = L.geoJson(response, {
            style: {

                weight: 1, //no border
                opacity: 1,
                color: 'gray',
                //dashArray: '3',
                fillOpacity: 1.0, //DO NOT DISLAY
                fillColor: '#cccccc'
            },
            onEachFeature: onEachFeature
        });

        for (var _type in window.visualization.geoJsonLayers) {
            if (type == _type) {
                map.addLayer(window.visualization.geoJsonLayers[_type]);
            }
        }

    }

    window.visualization.changeGroup = function(groupId) {

        if (groupId == "all") {
            groupId = "sovereignt";
        }
        window.loader.loadGeoJSON(groupId, geoJSONHandler);

        return;

        // 
        // if (!window.visualization.geoJsonLayers[groupId]) {
        //     window.loader.loadGeoJSON(groupId, geoJSONHandler);
        // } else {
        //     //debugger;
        //     //move this layer on top
        //     //TODO: Leroy
        // }

    }

    window.visualization.createMap = function() {

        var defaultType = "sovereignt";
        //
        if (!mapCreated) {

            mapCreated = true;

            map = L.map('map').setView([0, 0], 1);

            //load geojson for countries
            window.visualization.changeGroup("all");
            //window.loader.loadGeoJSON(defaultType, geoJSONHandler);

        }

    }


    var eventBind = function() {

        $(".list-group-item").popover({
            trigger: "hover"
        });

        //var val = $('#filter-years').slider("option", "value");
        window.utils.flipCardEvent();

        // $('.dropdown-toggle').dropdown();


    }

    var model = window.vizModel;


    var indicatorListLoadHandler = function(response) {

        window.utils.bindIndicators(response, model);

        //enable knockout
        ko.applyBindings(model);

        eventBind();

    }

    indicatorListLoadHandler(window.preloadedData.categories_list);

    window.utils.bindCountries(window.preloadedData.countries_list, model);

    var indicatorDataLoadHandler = function(response) {

        var highChartsJson = window.prepareHighchartsJson(response, model.activeChart(), model.activeIndicators(), model.activeGroup(), model.activeRegion());
        model.activeData(highChartsJson);

        var highChartsJson = model.activeData();
        highChartsJson.title.text = model.activeIndicator();
        highChartsJson.chart.type = model.activeChart();
        highChartsJson.yAxis.title.text = "";
        //highChartsJson.subtitle.text = type;
        $('#viz-container').highcharts(model.activeData());
        $("#loading").hide();

    }


}())
