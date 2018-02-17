"use strict";
"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BeetleFarmMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.BeetleFarm;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/beetleFarm.png"),
        scale: params.scale,
        name: "Beetle Farm"
    });
};



