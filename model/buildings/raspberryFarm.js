"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.RaspberryFarm = function(params){
    AntColony.validateParams(params, "scale");
    const width = params.scale * 1;
    const height = params.scale * 1;
    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/BuildingAnimations/raspberryFarm.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 32,
        frameHeight: 32,
        sheetWidth: 32,
        frameCount: 1,
        framesPerSecond: 0
    });
    const cost = [
        [AntColony.ResourceTypes.Population, 3],
        [AntColony.ResourceTypes.WoodChips, 10]
    ];
    const bonusOnBuild = [
    ];
    const upkeep = [
        [AntColony.ResourceTypes.WaterBuckets, 2],
        [AntColony.ResourceTypes.Fertilizer, 1]
    ];
    const production = [
        [AntColony.ResourceTypes.Raspberries, 4]
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