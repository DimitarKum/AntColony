"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.TastyBeetlesItem = function (params){
    AntColony.validateParams(params, "board", "scale", "startingPosition", "quantity");
    AntColony.validateParams(params.startingPosition, "x", "y");
    this.x = params.startingPosition.x;
    this.y = params.startingPosition.y;
    this.width = params.scale * 0.43;
    this.height = params.scale * 0.43;

    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/Items/beetle.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 200,
        frameHeight: 200,
        sheetWidth: 200,
        frameCount: 1,
        framesPerSecond: 0
    });
    AntColony.Item.call(this, {
            board: params.board,
            resourceType: AntColony.ResourceTypes.TastyBeetles,
            animation: animation,
            quantity: params.quantity
        }
    );
};