"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.InstructionsMenuItem = function(params) {
    AntColony.validateParams(params, "scale");

    // this.buildingType = AntColony.BuildingTypes.AntMound;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/instructions2.png"),
        scale: params.scale,
        name: "Instructions"
    });
};