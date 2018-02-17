"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.DemolishMenuItem = function(params) {
    AntColony.validateParams(params, "scale");

    this.buildingType = AntColony.BuildingTypes.AntMound;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/redX.png"),
        scale: params.scale,
        name: "Demolish"
    });
};