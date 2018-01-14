"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Animation = function (params) {
    AntColony.validateParams(
        params, "entity", "spriteSheet",
        "frameStartX", "frameStartY",
        "frameWidth", "frameHeight",
        "frameCount", "framesPerSecond"
        );

    this.entity = params.entity;
    this.spriteSheet = params.spriteSheet;
    this.startX = params.frameStartX;
    this.startY = params.frameStartY;
    this.frameWidth = params.frameWidth;
    this.frameHeight = params.frameHeight;
    // console.log(this.entity);


    // TODO: Use frame refresher to manage advancing the frame.
    this.getFrame = function(){
        return 0;
    };
    // this.frameCount = params.frameCount;
    // this.framesPerSecond = params.framesPerSecond
    // this.currentFrame = 0;
};

AntColony.Animation.prototype.advanceFrame = function(params){
    // AntColony.validateParams(params, "context", "timestamp");
    // TODO: Use frame refresher to manage advancing the frame. Also setChanged iff this.getCamera().isOnScreen(this);
};

AntColony.Animation.prototype.draw = function(params){
    params.context.drawImage(
        AntColony.assetManager.getAsset(this.spriteSheet),
        this.startX + this.getFrame() * this.frameWidth,
        this.startY,
        this.frameWidth,
        this.frameHeight,
        this.entity.x - this.getCamera().x,
        this.entity.y - this.getCamera().y,
        this.entity.width,
        this.entity.height
        );
};