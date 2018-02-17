"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.LeavesItem = function (params){
    AntColony.validateParams(params, "board", "scale", "startingPosition", "quantity");
    AntColony.validateParams(params.startingPosition, "x", "y");
    this.x = params.startingPosition.x;
    this.y = params.startingPosition.y;
    this.width = params.scale * 0.41;
    this.height = params.scale * 0.41;

    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/Items/leaf.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 300,
        frameHeight: 300,
        sheetWidth: 300,
        frameCount: 1,
        framesPerSecond: 0
    });
    AntColony.Item.call(this, {
            board: params.board,
            resourceType: AntColony.ResourceTypes.Leaves,
            animation: animation,
            quantity: params.quantity
        }
    );
};