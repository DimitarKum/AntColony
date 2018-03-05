"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.AntTrailMenuItem = function(params) {
    AntColony.validateParams(params, "scale");

    // this.buildingType = AntColony.BuildingTypes.AntMound;
    AntColony.BuildingMenuItem.call(this, {
        icon: AntColony.assetManager.getAsset("./assets/BuildingIcons/antTrail.png"),
        scale: params.scale,
        name: "Ant Trail"
    });
};