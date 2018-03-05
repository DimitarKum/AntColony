"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Board = function(params){
    AntColony.validateParams(params, "width", "height", "scale", "camera");
        // "canvas");
    this.width = params.width;  
    this.height = params.height;
    this.scale = params.scale;
    this.regionGrid = new AntColony.Grid({width: this.width, height: this.height});
    this.tiles = AntColony.createTiles({
        columns: this.width,
        rows: this.height,
        scale: this.scale
    });
    this.camera = params.camera;
    this.init();
    // this.canvas = params.canvas;
    // params.canvas.width = params.width * params.scale / 2;
    // params.canvas.height = params.height * params.scale / 2;

    this.trails = [];
    this.buildings = [];
    this.items = [];

    this.buildingShadow = null;

    this.textEffects = [];
};

AntColony.Board.prototype.init = function(){
    const that = this;
    this.tiles.forEach(function(tile){
        that.regionGrid.setElement({
            i: tile.gridX,
            j: tile.gridY,
            value: new AntColony.Region({tile: tile, scale: that.scale, camera: that.camera})
        });
    });
};

AntColony.Board.prototype.addTextEffect = function(params){
    AntColony.validateParams(params, "text", "duration");
    this.textEffects.push(params);
};

AntColony.Board.prototype.addItem = function(itemToAdd){
    itemToAdd.isChanged = true;
    itemToAdd.regionsOccupied = [];
    const camera = this.camera;
    itemToAdd.hasChanged = function(){
        itemToAdd.regionsOccupied.forEach(function(region){
            region.setChanged();
        });
    };
    
    const that = this;
    itemToAdd.changePosition = function(params){
        // AntColony.validateParams(params, "x", "y");
        const x = params.x, y = params.y;
        itemToAdd.hasChanged();
        itemToAdd.regionsOccupied.forEach(function(region){
            region.items.remove(itemToAdd);
        });

        itemToAdd.x = x;
        itemToAdd.y = y;
        itemToAdd.regionsOccupied = that.getRegionsForBox({
            x: itemToAdd.x,
            y: itemToAdd.y,
            width: itemToAdd.width,
            height: itemToAdd.height
        });
        itemToAdd.regionsOccupied.forEach(function(region){
            region.items.push(itemToAdd);
        });
        itemToAdd.isChanged = false;
        itemToAdd.hasChanged();
    };

    this.items.push(itemToAdd);
    itemToAdd.changePosition({
        x: itemToAdd.x, 
        y: itemToAdd.y
    });


};

AntColony.Board.prototype.getBuildings = function(){
    return this.buildings;
};

AntColony.Board.prototype.addTrail = function(trailToAdd){
    this.trails.push(trailToAdd);
};

AntColony.Board.prototype.addBuilding = function(buildingToAdd){
    // TODO: Add hasChanged and changePosition to the building
    buildingToAdd.isChanged = true;
    buildingToAdd.regionsOccupied = [];
    const camera = this.camera;
    buildingToAdd.hasChanged = function(){
        buildingToAdd.regionsOccupied.forEach(function(region){
            region.setChanged();
        });
    };

    buildingToAdd.select = function(){
        buildingToAdd.isSelected = true;
        buildingToAdd.isChanged = true;
    };
    
    buildingToAdd.deselect = function(){
        buildingToAdd.isSelected = false;
        buildingToAdd.isChanged = true;
    };

    const that = this;
    buildingToAdd.changePosition = function(params){
        // AntColony.validateParams(params, "x", "y");
        const x = params.x, y = params.y;
        buildingToAdd.hasChanged();
        buildingToAdd.regionsOccupied.forEach(function(region){
            region.buildings.remove(buildingToAdd);
        });

        buildingToAdd.x = x;
        buildingToAdd.y = y;
        buildingToAdd.regionsOccupied = that.getRegionsForBox({
            x: buildingToAdd.x,
            y: buildingToAdd.y,
            width: buildingToAdd.width,
            height: buildingToAdd.height
        });
        buildingToAdd.regionsOccupied.forEach(function(region){
            region.buildings.push(buildingToAdd);
        });
        buildingToAdd.isChanged = false;
        buildingToAdd.hasChanged();
    };

    this.buildings.push(buildingToAdd);
    buildingToAdd.changePosition({
        x: buildingToAdd.x, 
        y: buildingToAdd.y
    });
};

AntColony.Board.prototype.removeItem = function(params){
    AntColony.validateParams(params, "itemToRemove");
    params.itemToRemove.changePosition({
        x: -10 * this.scale,
        y: -10 * this.scale
    });
    this.items.remove(params.itemToRemove);
};
AntColony.Board.prototype.removeBuilding = function(params){
    AntColony.validateParams(params, "buildingToRemove");
    params.buildingToRemove.changePosition({
        x: -10 * this.scale,
        y: -10 * this.scale
    });

    const that = this;

    params.buildingToRemove.trails.forEach(function(trail){
        if(trail.consumer !== params.buildingToRemove){
            trail.consumer.trails.remove(trail);
        }
        if(trail.producer !== params.buildingToRemove){
            trail.producer.trails.remove(trail);
        }
        if(trail.itemCarried){
            that.removeItem({itemToRemove: trail.itemCarried});
        }
        that.trails.remove(trail);
    });
    params.buildingToRemove.producedItems.forEach(function(item){
        that.removeItem({itemToRemove: item});
    });
    this.buildings.remove(params.buildingToRemove);
};

// TODO: Refactored repeated code (almost same as addBuilding)
AntColony.Board.prototype.setBuildingShadow = function(buildingShadow){
    buildingShadow.isChanged = true;
    buildingShadow.regionsOccupied = [];
    const camera = this.camera;
    buildingShadow.hasChanged = function(){
        buildingShadow.regionsOccupied.forEach(function(region){
            region.setChanged();
        });
    };
    
    const that = this;
    buildingShadow.changePosition = function(params){
        // AntColony.validateParams(params, "x", "y");
        const x = params.x, y = params.y;
        buildingShadow.hasChanged();
        buildingShadow.regionsOccupied.forEach(function(region){
            region.buildings.remove(buildingShadow);
        });

        buildingShadow.x = x;
        buildingShadow.y = y;
        buildingShadow.regionsOccupied = that.getRegionsForBox({
            x: buildingShadow.x,
            y: buildingShadow.y,
            width: buildingShadow.width,
            height: buildingShadow.height
        });
        buildingShadow.regionsOccupied.forEach(function(region){
            region.buildings.push(buildingShadow);
        });
        buildingShadow.isChanged = false;
        buildingShadow.hasChanged();
    };

    this.buildingShadow = buildingShadow;

    buildingShadow.changePosition({
        x: buildingShadow.x,
        y: buildingShadow.y
    });
};

AntColony.Board.prototype.removeBuildingShadow = function(){
    if(this.buildingShadow){
        this.buildingShadow.hasChanged();
        this.buildingShadow = null;
    }
};

AntColony.Board.prototype.getBuildingShadow = function(){
    return this.buildingShadow;
};

AntColony.Board.prototype.update = function(){
    this.trails.forEach(function(trail){
        trail.update();
    });
    this.buildings.forEach(function(building){
        building.update();
    });
    this.items.forEach(function(item){
        item.update();
    });
};

AntColony.Board.prototype.draw = function(params){
    const that = this;
    // AntColony.validateParams(params, "context", "timestamp");
    // console.log("FPS.");
    // Advance frames
    this.buildings.forEach(function(building){
        building.advanceFrame(params);
    });
    if(this.buildingShadow && this.buildingShadow.advanceFrame){
        this.buildingShadow.advanceFrame(params);
    }

    // Draw 1) Tiles, 2) Buildings, 3) Items
    this.regionGrid.forEach(function(regionParams){
        // AntColony.validateParams(params, "regionParams", "i", "j");
        const tile = regionParams.currentElement.tile;
        // if(tile.isChanged){
        if(that.camera.isOnScreen(tile)){
            // ++tileDrawn;
            tile.draw(params);
        }
    });


    // this.tiles.forEach(function(tile){
    //     if(tile.isChanged){
    //         // ++tileDrawn;
    //         tile.draw(params);
    //     }
    // });

    this.buildings.forEach(function(building){
        // TODO: Find out why camera.isOnScreen(building) returns false here
        // if(building.isChanged){
        if(that.camera.isOnScreen(building)){
            building.draw(params);
            if(building.isSelected){
                const ctx = params.context;
                ctx.beginPath();
                ctx.save();
                ctx.strokeStyle = "#000000";
                const borderWidth = 4;
                ctx.lineWidth = borderWidth;
                ctx.rect(
                    building.x - that.camera.x + borderWidth,
                    building.y - that.camera.y + borderWidth,
                    building.width - 2 * borderWidth,
                    building.height - 2 * borderWidth
                );
                ctx.closePath();
                ctx.stroke();
                ctx.restore();  
            }
        }
    });

    this.items.forEach(function(item){
        if(that.camera.isOnScreen(item)){
            item.draw(params);
        }
    });

    this.trails.forEach(function(trail){
        // if(that.camera.isOnScreen(trail)){
            trail.draw(params);
        // }
    });

    if(this.buildingShadow
     // && this.buildingShadow.isChanged
     ){
        this.buildingShadow.draw(params);
    }

    let effectsToRemove = [];
    let effectNumber = 0;
    this.textEffects.forEach(function(textEffect){
        const ctx = params.context;
        ctx.beginPath();
        ctx.save();
        const fontSize = Math.floor(that.scale * .50);
        // ctx.font = "bold " + Math.floor(AntColony.Globals.Scale * 2.0) + "px Arial";
        ctx.font = "bold " + fontSize + "px Consolas";
        ctx.fillStyle = "#FFF";
        ctx.fillText(
            textEffect.text,
            that.scale * 1.5,
            that.scale * 6 + (fontSize + 1) * effectNumber
        );
        ++effectNumber;
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        --textEffect.duration;
        if(textEffect.duration <= 0){
            effectsToRemove.push(textEffect);
        }
    });
    effectsToRemove.forEach(function(textEffect){
        that.textEffects.remove(textEffect);
    });

    // Make isChanged = false for all entities.
    // this.resetRegions();

    // const time2 = window.performance.now();
        // (new Date()).getTime();
    // console.log("Draw took " + (time2    - time1) * 1000 + " microseconds. Tiles drawn: " + tileDrawn);
};

AntColony.Board.prototype.resetRegions = function(){
    this.regionGrid.forEach(function(params){
        params.currentElement.setUnchanged();
    });
};

AntColony.Board.prototype.setAllRegionsChanged = function(){
    // TODO: Only 
    const that = this;
    this.regionGrid.forEach(function(params){
        const region = params.currentElement;
        if(that.camera.isOnScreen(region)){
            region.setChanged();
        }
    });
};

/*
* Returns an Optional of a Region that contains the x, y coordinates.
* The Optional.isPresent() === false iff the x, y coordinate is outside of the canvas.
*/
AntColony.Board.prototype.getRegionForCoordinate = function(params){
    // AntColony.validateParams(params, "x", "y");
    const x = params.x, y = params.y;
    // const rect = this.canvas.getBoundingClientRect();
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
    // AntColony.validateParams(params, "x", "y", "width", "height")
    const regions = [];
    // for(let i = -1; i <= params.width + this.scale; i += this.scale){
    //     for(let j = -1; j <= params.height + this.scale; j += this.scale){
    //         const optionalRegion = this.getRegionForCoordinate({
    //             x: params.x + i,
    //             y: params.y + j   
    //         });
    //         if(optionalRegion.isPresent()){
    //             regions.push(optionalRegion.getValue());
    //         }
    //     }
    // }
    for(let i = 1; i <= params.width; i += this.scale){
        for(let j = 1; j <= params.height; j += this.scale ){
            const optionalRegion = this.getRegionForCoordinate({
                x: params.x + i,
                y: params.y + j
            });
            if(optionalRegion.isPresent()){
                regions.push(optionalRegion.getValue());
            }
        }
    }

    return regions;
};