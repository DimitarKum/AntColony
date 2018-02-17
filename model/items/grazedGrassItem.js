"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.GrazedGrassItem = function (params){
    AntColony.validateParams(params, "board", "scale", "startingPosition", "quantity");
    AntColony.validateParams(params.startingPosition, "x", "y");
    this.x = params.startingPosition.x;
    this.y = params.startingPosition.y;
    this.width = params.scale * 0.25;
    this.height = params.scale * 0.25;

    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/Items/grazedGrass.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 300,
        frameHeight: 275,
        sheetWidth: 32,
        frameCount: 1,
        framesPerSecond: 0
    });
    AntColony.Item.call(this, {
            board: params.board,
            resourceType: AntColony.ResourceTypes.GrazedGrass,
            animation: animation,
            quantity: params.quantity
        }
    );
};