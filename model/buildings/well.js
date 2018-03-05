"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Well = function(params){
    AntColony.validateParams(params, "scale");
    const width = params.scale * 1;
    const height = params.scale * 1;
    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/BuildingAnimations/well.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 1024,
        frameHeight: 1024,
        sheetWidth: 1024,
        frameCount: 1,
        framesPerSecond: 0
    });
    const cost = [
        // [AntColony.ResourceTypes.Population, 2],
        [AntColony.ResourceTypes.Pebbles, 30]
    ];
    const bonusOnBuild = [
    ];
    const upkeep = [
    ];
    const production = [
        [AntColony.ResourceTypes.WaterBuckets, 1]
    ];
    AntColony.Building.call(this, {
        animation: animation,
        cost: cost,
        bonusOnBuild: bonusOnBuild,
        upkeep: upkeep,
        production: production,
        width: width,
        height: height,
        buildTerrain: [AntColony.Terrain.Water] 
    });
};