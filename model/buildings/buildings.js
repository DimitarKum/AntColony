"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingTypes = {
    NO_BUILDING: -1,
    AntMound: 0
    // ...
};

AntColony.BuildingTypes.getBuildingForType = function(params) {
    AntColony.validateParams(params, "buildingType", "scale");

    switch(params.buildingType){
        case AntColony.BuildingTypes.AntMound:
            return new AntColony.AntMound({
                scale: params.scale
            });
            break;
        case AntColony.BuildingTypes.NO_BUILDING:
            throw new Error("Attempted to getBuildingForType() for AntColony.BuildingTypes.NO_BUILDING.");
            break;
        default:
            throw new Error("Attempted to getBuildingForType() for invalid buildingType[" + params.buildingType + "].");
            break;
    }
};