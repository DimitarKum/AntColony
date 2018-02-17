"use strict";
"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.AntMoundMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.AntMound;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/antMound.png"),
        scale: params.scale,
        name: "Ant Mound"
    });
};



