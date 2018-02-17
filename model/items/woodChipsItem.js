"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.WoodChipsItem = function (params){
    AntColony.validateParams(params, "board", "scale", "startingPosition", "quantity");
    AntColony.validateParams(params.startingPosition, "x", "y");
    this.x = params.startingPosition.x;
    this.y = params.startingPosition.y;
    this.width = params.scale * 0.47;
    this.height = params.scale * 0.47;

    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/Items/woodChips.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 250,
        frameHeight: 190,
        sheetWidth: 250,
        frameCount: 1,
        framesPerSecond: 0
    });
    AntColony.Item.call(this, {
            board: params.board,
            resourceType: AntColony.ResourceTypes.WoodChips,
            animation: animation,
            quantity: params.quantity
        }
    );
};