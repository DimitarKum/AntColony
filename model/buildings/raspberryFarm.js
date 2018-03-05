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
        // [AntColony.ResourceTypes.Population, 6],
        [AntColony.ResourceTypes.WoodChips, 30]
    ];
    const bonusOnBuild = [
    ];
    const upkeep = [
        [AntColony.ResourceTypes.WaterBuckets, 8],
        [AntColony.ResourceTypes.Fertilizer, 6]
    ];
    const production = [
        [AntColony.ResourceTypes.Raspberries, 1]
    ];
    AntColony.Building.call(this, {
        animation: animation,
        cost: cost,
        bonusOnBuild: bonusOnBuild,
        upkeep: upkeep,
        production: production,
        width: width,
        height: height,
        buildTerrain: [AntColony.Terrain.Grass]
    });
};