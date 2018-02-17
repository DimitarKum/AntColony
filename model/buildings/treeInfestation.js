"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.TreeInfestation = function(params){
    AntColony.validateParams(params, "scale");
    const width = params.scale * 1;
    const height = params.scale * 1;
    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/BuildingAnimations/treeInfestation.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 600,
        frameHeight: 598,
        sheetWidth: 600,
        frameCount: 1,
        framesPerSecond: 0
    });
    const cost = [
        [AntColony.ResourceTypes.Population, 2]
    ];
    const bonusOnBuild = [
    ];
    const upkeep = [
    ];
    const production = [
        [AntColony.ResourceTypes.WoodChips, 1],
        [AntColony.ResourceTypes.Leaves, 1]
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