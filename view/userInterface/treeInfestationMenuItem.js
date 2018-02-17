"use strict";
"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.TreeInfestationMenuItem = function(params){
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.TreeInfestation;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/treeInfestation.jpg"),
        // icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/treeInfestation.png"),
        scale: params.scale,
        name: "Tree Infestation"
    });
};



