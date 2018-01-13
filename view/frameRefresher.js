"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.FrameRefresher = function(params){
    AntColony.validateParams(params, "startFrame", "endFrame", "framesPerSecond");

    const MAX_FPS = 60;
    if(params.framesPerSecond >= MAX_FPS){
        throw new Error("Cannot use [" + params.framesPerSecond + "] FPS for FrameRefresher. Maximum is [" + MAX_FPS + "].");
    }

    this.startFrame = params.startFrame;
    this.framesCount = params.endFrame - this.startFrame + 1;
    this.currentFrame = this.startFrame;
    this.lastTimestamp = 0;
    this.timeSinceLastFrame = 0;
    this.frameChangeInterval = Math.floor(1000 / params.framesPerSecond) + 1;
};

AntColony.FrameRefresher.prototype.getFrame = function(){
    return this.currentFrame + this.startFrame;
};

AntColony.FrameRefresher.prototype.updateTimestamp = function(timestamp){
    this.timeSinceLastFrame += timestamp - this.lastTimestamp;
    if(this.timeSinceLastFrame > this.frameChangeInterval){
        this.timeSinceLastFrame = this.timeSinceLastFrame % this.frameChangeInterval;
        this.currentFrame = (this.currentFrame + 1) % this.framesCount;
    }
    this.lastTimestamp = timestamp;
};