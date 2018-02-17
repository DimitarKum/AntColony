"use strict";
"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.GrasshopperMeadowMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.GrasshopperMeadow;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/grasshopperMeadow.png"),
        scale: params.scale,
        name: "Grasshopper Meadow"
    });
};



