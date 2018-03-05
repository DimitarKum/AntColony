"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.AntMound = function(params){
    AntColony.validateParams(params, "scale");
    const width = params.scale * 1;
    const height = params.scale * 1;
    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/BuildingAnimations/moundMovement.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 32,
        frameHeight: 32,
        sheetWidth: 32 * 6,
        frameCount: 31,
        framesPerSecond: 8
    });
    const cost = [
        [AntColony.ResourceTypes.TastyBeetles, 20],
        [AntColony.ResourceTypes.Raspberries, 8]
    ];
    const bonusOnBuild = [
        [AntColony.ResourceTypes.Population, 5]
    ];
    const upkeep = [
        [AntColony.ResourceTypes.TastyBeetles, 1],
        [AntColony.ResourceTypes.Raspberries, 1],
        [AntColony.ResourceTypes.WoodChips, 1],
        [AntColony.ResourceTypes.GrazedGrass, 1],
        // [AntColony.ResourceTypes.Fertilizer, 1],
        // [AntColony.ResourceTypes.Leaves, 1],
        [AntColony.ResourceTypes.Pebbles, 1],
        // [AntColony.ResourceTypes.WaterBuckets, 1]
    ];
    const production = [
    ];
    AntColony.Building.call(this, {
        animation: animation,
        cost: cost,
        bonusOnBuild: bonusOnBuild,
        upkeep: upkeep,
        production: production,
        width: width,
        height: height,
        buildTerrain: [AntColony.Terrain.Earth, AntColony.Terrain.Grass, AntColony.Terrain.Forest] 
    });
    this.update = function(params){
        // console.log(this.resourceBank);
        AntColony.Globals.Player.dumpResourceBank({
            resourceBank: this.resourceBank
        });
    };
};