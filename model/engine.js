"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

/*
* gameSpeed - currently unused
* frameRate - frames per second
*/
AntColony.Engine = function(params){
    AntColony.validateParams(params, "canvas", "context", "board", "gameSpeed", "frameRate");
    this.canvas = params.canvas;
    this.context = params.context;
    // this.gameSpeed = params.gameSpeed;
    // this.frameRate = params.frameRate;
    // this.gameTime = 0;
    // this.updateDrawInterval = Math.floor(1000 / this.frameRate) + 1;
    // console.log("Frame rate is: " + this.frameRate + ", interval = " + this.updateDrawInterval);

    this.board = params.board;
};

AntColony.Engine.prototype.start = function(){
    const that = this;
    function step(timestamp){
        // console.log(timestamp);
        that.board.update();
        that.board.draw({context: that.context, timestamp: timestamp});
        window.requestAnimationFrame(function(timestamp){
            step(timestamp);
        });
    };
    window.requestAnimationFrame(function(timestamp){
        step(timestamp);
    });
};

// // Figures out which tiles
// AntColony.Engine.prototype.addChangedRegion = function(params){
//     AntColony.validateParams(params, "x", "y", "width", "height")
// };