"use strict";
"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.RaspberryFarmMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.RaspberryFarm;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/raspberryFarm.png"),
        scale: params.scale,
        name: "Raspberry Farm"
    });
};



