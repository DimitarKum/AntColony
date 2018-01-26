"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.AntMound = function(params){
    AntColony.validateParams(params, "scale");

    this.x = 0;
    this.y = 0;
    this.width = params.scale * 2;
    this.height = params.scale * 2;

    const animation = new AntColony.Animation({
        entity: this,
        spriteSheet: "./assets/MoundMovement.png",
        frameStartX: 0,
        frameStartY: 0,
        frameWidth: 32,
        frameHeight: 32,
        sheetWidth: 32 * 6,
        frameCount: 31,
        framesPerSecond: 5
    });

    this.draw = function(params){
        return animation.draw(params);
    };
    this.advanceFrame = function(timestamp){
        if(animation.advanceFrame(timestamp)){
            this.hasChanged();
        }
    };
    this.update = function(){};
};
