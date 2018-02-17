"use strict";
"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.WellMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.Well;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/well.jpg"),
        // icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/well.png"),
        scale: params.scale,
        name: "Water Well"
    });
};



