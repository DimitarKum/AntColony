"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingTypes = {
    NO_BUILDING: -1,
    AntMound: 0,
    TreeInfestation: 1,
    PebbleQuarry: 2,
    Well: 3,
    BeetleFarm: 4,
    RaspberryFarm: 5,
    GrasshopperMeadow: 6
};

AntColony.BuildingTypes.getBuildingForType = function(params) {
    AntColony.validateParams(params, "buildingType", "scale");

    switch(params.buildingType){
        case AntColony.BuildingTypes.AntMound:
            return new AntColony.AntMound({
                scale: params.scale
            });
            break;
        case AntColony.BuildingTypes.TreeInfestation:
            return new AntColony.TreeInfestation({
                scale: params.scale
            });
            break;
        case AntColony.BuildingTypes.PebbleQuarry:
            return new AntColony.PebbleQuarry({
                scale: params.scale
            });
            break;
        case AntColony.BuildingTypes.Well:
            return new AntColony.Well({
                scale: params.scale
            });
            break;
        case AntColony.BuildingTypes.BeetleFarm:
            return new AntColony.BeetleFarm({
                scale: params.scale
            });
            break;
        case AntColony.BuildingTypes.RaspberryFarm:
            return new AntColony.RaspberryFarm({
                scale: params.scale
            });
            break;
        case AntColony.BuildingTypes.GrasshopperMeadow:
            return new AntColony.GrasshopperMeadow({
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