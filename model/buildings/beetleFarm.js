"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BeetleFarm = function(params){
    AntColony.validateParams(params, "scale");
    const width = params.scale * 1;
    const height = params.scale * 1;
    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/BuildingAnimations/beetleFarm.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 247,
        frameHeight: 247,
        sheetWidth: 247,
        frameCount: 1,
        framesPerSecond: 0
    });
    const cost = [
        [AntColony.ResourceTypes.WoodChips, 20],
        [AntColony.ResourceTypes.Population, 2]
    ];
    const bonusOnBuild = [
    ];
    const upkeep = [
        [AntColony.ResourceTypes.Leaves, 2],
        [AntColony.ResourceTypes.WaterBuckets, 2]
    ];
    const production = [
        [AntColony.ResourceTypes.TastyBeetles, 3],
        [AntColony.ResourceTypes.Fertilizer, 3]
    ];
    AntColony.Building.call(this, {
        animation: animation,
        cost: cost,
        bonusOnBuild: bonusOnBuild,
        upkeep: upkeep,
        production: production,
        width: width,
        height: height
    });
};