"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.PebbleQuarry = function(params){
    AntColony.validateParams(params, "scale");
    const width = params.scale * 1;
    const height = params.scale * 1;
    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/BuildingAnimations/pebbleQuarry.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 280,
        frameHeight: 218,
        sheetWidth: 218,
        frameCount: 1,
        framesPerSecond: 0
    });
    const cost = [
        [AntColony.ResourceTypes.Population, 1]
    ];
    const bonusOnBuild = [
    ];
    const upkeep = [
    ];
    const production = [
        [AntColony.ResourceTypes.Pebbles, 1]    
    ];
    AntColony.Building.call(this, {
        animation: animation,
        cost: cost,
        bonusOnBuild: bonusOnBuild,
        upkeep: upkeep,
        production: production,
        width: width,
        height: height,
        buildTerrain: [AntColony.Terrain.Rock] 
    });
};