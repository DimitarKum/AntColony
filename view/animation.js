"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Animation = function (params) {
    AntColony.validateParams(
        params, "entity", "spriteSheet",
        "frameStartX", "frameStartY",
        "frameWidth", "frameHeight", "sheetWidth",
        "framesPerSecond","frameCount"
        );

    this.entity = params.entity;
    this.spriteSheet = params.spriteSheet;
    this.startX = params.frameStartX;
    this.startY = params.frameStartY;
    this.frameWidth = params.frameWidth;
    this.frameHeight = params.frameHeight;
    if(params.frameCount <= 1){
        this.sheetWidth = 10000000;
    }else{
        this.sheetWidth = params.sheetWidth;
    }

    AntColony.validateParams(params, "frameCount", "framesPerSecond");
    const frameRefresher = new AntColony.FrameRefresher({
        frameCount: params.frameCount,
        framesPerSecond: params.framesPerSecond
    });
    this.getFrame = function(){return frameRefresher.getFrame();};
    this.advanceFrame = function(params){return frameRefresher.advanceFrame(params);};
};

AntColony.Animation.prototype.draw = function(params){
    let frameXScale = 1;
    const that = this;
    params.context.drawImage(
        AntColony.assetManager.getAsset(that.spriteSheet),
        // TODO: Reuse that.startX + that.getFrame() * that.frameWidth calculation!
        (that.startX + that.getFrame() * that.frameWidth) % that.sheetWidth,
        that.startY + this.frameHeight * Math.floor((that.startX + that.getFrame() * that.frameWidth) / that.sheetWidth),
        Math.floor(that.frameWidth * frameXScale),
        that.frameHeight,
        that.entity.x - that.getCamera().x,
        that.entity.y - that.getCamera().y,
        that.entity.width,
        that.entity.height
        );
};