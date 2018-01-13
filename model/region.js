"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

// Represents a single cell in the game grid. Knows about all items and buildings inside the cell.
AntColony.Region = function(params){
    AntColony.validateParams(params, "tile");

    this.tile = params.tile;
    this.buildings = [];
    this.items = [];
    this.isChanged = true;
};

AntColony.Region.prototype.setChanged = function(){
    if(!this.isChanged){
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

