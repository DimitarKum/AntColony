"use strict";
"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.PebbleQuarryMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.PebbleQuarry;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/pebbleQuarry.jpg"),
        // icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/pebbleQuarry.png"),
        scale: params.scale,
        name: "Pebble Quarry"
    });
};



