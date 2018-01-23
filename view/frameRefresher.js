"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.FrameRefresher = function(params){
    AntColony.validateParams(params, "frameCount", "framesPerSecond");

    if(params.frameCount === 1 || params.framesPerSecond === 0){
        this.advanceFrame = function(){};
        this.getFrame = function(){return 0};
        return this;
    }

    const MAX_FPS = 60;
    if(params.framesPerSecond >= MAX_FPS){
        throw new Error("Cannot use [" + params.framesPerSecond + "] FPS for FrameRefresher. Maximum is [" + MAX_FPS + "].");
    }
    this.frameCount = params.frameCount;
    this.currentFrame = 0;
    this.lastTimestamp = 0;
    this.timeSinceLastFrame = 0;
    this.frameChangeInterval = Math.floor(1000 / params.framesPerSecond) + 1;
};

AntColony.FrameRefresher.prototype.getFrame = function(){
    return this.currentFrame;
};

AntColony.FrameRefresher.prototype.advanceFrame = function(params){
    this.timeSinceLastFrame += params.timestamp - this.lastTimestamp;
    // console.log(this.timeSinceLastFrame);
    let hasChanged = false;

    if(this.timeSinceLastFrame > this.frameChangeInterval){
        this.timeSinceLastFrame = this.timeSinceLastFrame % this.frameChangeInterval;
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;
        hasChanged = true;
    }
    this.lastTimestamp = params.timestamp;
    return hasChanged;
};