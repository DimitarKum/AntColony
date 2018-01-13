"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Board = function(params){
    AntColony.validateParams(params, "width", "height", "scale", "canvas");
    this.width = params.width;  
    this.height = params.height;
    this.scale = params.scale;
    this.regionGrid = new AntColony.Grid({width: this.width, height: this.height});
    this.tiles = AntColony.createTiles({
        columns: this.width,
        rows: this.height,
        scale: this.scale
    });
    this.init();

    this.canvas = params.canvas;
    params.canvas.width = params.width * params.scale;
    params.canvas.height = params.height * params.scale;

    this.trails = [];
    this.buildings = [];
    this.items = [];
};

AntColony.Board.prototype.init = function(){
    const that = this;
    this.tiles.forEach(function(tile){
        that.regionGrid.setElement({
            i: tile.gridX,
            j: tile.gridY,
            value: new AntColony.Region({tile: tile})
        });
    });
};

AntColony.Board.prototype.addBuilding = function(buildingToAdd){
    // TODO: Add hasChanged and changePosition to the building
    buildingToAdd.isChanged = true;
    buildingToAdd.regionsOccupied = [];
    buildingToAdd.hasChanged = function(){
        buildingToAdd.regionsOccupied.forEach(function(region){
            region.setChanged();
        });
    };
    
    const that = this;
    buildingToAdd.changePosition = function(x, y){
        buildingToAdd.hasChanged();

        buildingToAdd.regionsOccupied.forEach(function(region){
            region.buildings.remove(buildingToAdd);
        });

        buildingToAdd.x = x;
        buildingToAdd.y = y;
        buildingToAdd.regionsOccupied = that.getRegionsForBox({
            x: buildingToAdd.x,
            y: buildingToAdd.y,
            width: 32,
            height: 32
        });
        buildingToAdd.regionsOccupied.forEach(function(region){
            region.buildings.push(buildingToAdd);
        });
    };

    this.buildings.push(buildingToAdd);
    buildingToAdd.changePosition(buildingToAdd.x, buildingToAdd.y);
};

AntColony.Board.prototype.update = function(){
    this.buildings.forEach(function(building){
        building.update();
    });
    this.items.forEach(function(item){
        item.update();
    });
};

AntColony.Board.prototype.draw = function(params){
    // AntColony.validateParams(params, "context", "timestamp");
    
    // const time1 = window.performance.now();
        // (new Date()).getTime();
    // let tileDrawn = 0;

    // Advance frames
    this.buildings.forEach(function(building){
        building.advanceFrame(params);
    });

    this.tiles.forEach(function(tile){
        if(tile.isChanged){
            // ++tileDrawn;
            tile.draw(params);
        }
    });

    // this.drawTiles(params.context);

    this.buildings.forEach(function(building){
        if(building.isChanged){
            building.draw(params);
        }
    });

    this.items.forEach(function(item){
        this.item.draw(params);
    });

    // Make isChanged = false for all entities.
    this.resetRegions();

    // const time2 = window.performance.now();
        // (new Date()).getTime();
    // console.log("Draw took " + (time2    - time1) * 1000 + " microseconds. Tiles drawn: " + tileDrawn);
};

AntColony.Board.prototype.resetRegions = function(){
    this.regionGrid.forEach(function(params){
        params.currentElement.setUnchanged();
    });
    // TODO: .resetChanged each region.
};


/*
* Returns an Optional of a Region that contains the x, y coordinates.
* The Optional.isPresent() === false iff the x, y coordinate is outside of the canvas.
*/
AntColony.Board.prototype.getRegionForCoordinate = function(x, y){
    const rect = this.canvas.getBoundingClientRect();
    const i = Math.floor(x / this.scale),
        j = Math.floor(y / this.scale);
    if(i < 0 || j < 0 || i >= this.width || j >= this.height){
        return AntColony.Optional.Empty;
    }
    return new AntColony.Optional(this.regionGrid.getElement(i, j));
};

/*
* Returns an array containing all Regions touched by the params bounding box (params.x/y/width/height)
* This method may return regions which are slightly outside of the params bounding box.
*/
AntColony.Board.prototype.getRegionsForBox = function(params){
    // TODO: remove validateParams
    // AntColony.validateParams(params, "x", "y", "width", "height")
    const regions = [];
    for(let i = -1; i <= params.width + this.scale; i += this.scale){
        for(let j = -1; j <= params.height + this.scale; j += this.scale){
            const optionalRegion = this.getRegionForCoordinate(params.x + i, params.y + j);
            if(optionalRegion.isPresent()){
                regions.push(optionalRegion.getValue());
            }
        }
    }
    return regions;
};