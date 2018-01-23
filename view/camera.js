"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

// Camera keeps track of the current viewing window.
AntColony.Camera = function(params){
    AntColony.validateParams(params, "viewingWidth", "viewingHeight" ,"gridWidth", "gridHeight", "scale");

    this.x = 0;
    this.y = 0;

    this.viewingWidth = params.viewingWidth;
    this.viewingHeight = params.viewingHeight;
    this.maxX = params.gridWidth * params.scale - params.viewingWidth;
    this.maxY = params.gridHeight * params.scale - params.viewingWidth;
};


// entity is expected to have .x, .y, .width, .height
AntColony.Camera.prototype.isOnScreen = function(entity){
    return entity.x < this.x + this.viewingWidth && entity.x + entity.width > this.x &&
        entity.y < this.y + this.viewingHeight && entity.y + entity.height > this.y;
};
