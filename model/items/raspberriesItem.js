"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.RaspberriesItem = function (params){
    AntColony.validateParams(params, "board", "scale", "startingPosition", "quantity");
    AntColony.validateParams(params.startingPosition, "x", "y");
    this.x = params.startingPosition.x;
    this.y = params.startingPosition.y;
    this.width = params.scale * 0.38;
    this.height = params.scale * 0.38;

    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/Items/raspberries.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 600,
        frameHeight: 735,
        sheetWidth: 600,
        frameCount: 1,
        framesPerSecond: 0
    });
    AntColony.Item.call(this, {
            board: params.board,
            resourceType: AntColony.ResourceTypes.Raspberries,
            // resourceType: AntColony.ResourceTypes.WoodChips,
            animation: animation,
            quantity: params.quantity
        }
    );
};