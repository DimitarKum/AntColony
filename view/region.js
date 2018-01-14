"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

// Represents a single cell in the game grid. Knows about all items and buildings inside the cell.
AntColony.Region = function(params){
    AntColony.validateParams(params, "tile", "scale", "camera");

    this.tile = params.tile;
    this.x = this.tile.gridX * params.scale;
    this.y = this.tile.gridY * params.scale;
    this.width = params.scale;
    this.height = params.scale;
    this.camera = params.camera;
    this.buildings = [];
    this.items = [];
    this.isChanged = true;
};

AntColony.Region.prototype.setChanged = function(){
    if(!this.isChanged && this.camera.isOnScreen(this)){
        this.isChanged = true;
        this.forEachEntity(function(entity){
            entity.isChanged = true;
        });
    }
};


AntColony.Region.prototype.setUnchanged = function(){
    if(this.isChanged){
        this.isChanged = false;
        this.forEachEntity(function(entity){
            entity.isChanged = false;
        });
    }
};

AntColony.Region.prototype.forEachEntity = function(callback){
    callback(this.tile);

    this.buildings.forEach(function(building){
        callback(building);
    });

    this.items.forEach(function(item){
        callback(item);
    });

};

AntColony.Region.prototype.getHasChanged = function(){
    const that = this;

    return function(){
        that.forEachEntity(function(entity){
            entity.isChanged = true;
        });
    };
};

