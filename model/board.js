"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Board = function(params){
    AntColony.validateParams(params, "width", "height", "scale", "canvas");
    this.width = params.width;  
    this.height = params.height;
    this.scale = params.scale;
    this.regionGrid = new AntColony.Grid({width: this.width, height: this.height});
    this.tiles = AntColony.createTiles(this.width, this.height);
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
        // validateParams(params, "currentElement", "i", "j");
        that.regionGrid.setElement({
            i: tile.x,
            j: tile.y,
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
    // buildingToAdd.hasChanged = this.regionGrid.getElement(buildingToAdd.x / this.scale, buildingToAdd.y / this.scale).getHasChanged();
    
    const that = this;
    buildingToAdd.changePosition = function(x, y){
        buildingToAdd.hasChanged();

        buildingToAdd.regionsOccupied.forEach(function(region){
            region.buildings.splice(region.buildings.indexOf(buildingToAdd), 1);
        });

        buildingToAdd.x = x;
        buildingToAdd.y = y;
        buildingToAdd.regionsOccupied = that.getRegionsForBox({
            x: buildingToAdd.x,
            y: buildingToAdd.y,
            width: 32,
            height: 32
        });
        // buildingToAdd.hasChanged();

        // const oldX = buildingToAdd.x, oldY = buildingToAdd.y;
        // const oldRegionI = Math.floor(buildingToAdd.x / that.scale), oldRegionJ = Math.floor(buildingToAdd.y / that.scale);
        // // console.log("oldRegionI = " + oldRegionI + ", oldRegionJ = " + oldRegionJ);
        // const oldRegionBuildings = that.regionGrid.getElement(oldRegionI, oldRegionJ).buildings;
        // oldRegionBuildings.splice(oldRegionBuildings.indexOf(buildingToAdd), 1);

        // buildingToAdd.x = x;
        // buildingToAdd.y = y;
        // const newRegionI = Math.floor(buildingToAdd.x / that.scale), newRegionJ = Math.floor(buildingToAdd.y / that.scale);
        // if(newRegionI < 35 && newRegionJ < 35){
        //     // console.log("newRegionI = " + newRegionI + ", newRegionJ = " + newRegionJ);
        //     buildingToAdd.hasChanged = that.regionGrid.getElement(newRegionI, newRegionJ).getHasChanged();
        // }
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
    const time1 = (new Date()).getTime();
    // AntColony.validateParams(params, "context", "timestamp");
    // Advance frames
    this.buildings.forEach(function(building){
        building.advanceFrame(params);
    });




    this.drawTiles(params.context);

    this.buildings.forEach(function(building){
        if(building.isChanged){
            building.draw(params);
        }
    });

    this.items.forEach(function(item){
        this.item.draw(params.context);
    });

    this.resetRegions();

    const time2 = (new Date()).getTime();
    // console.log("Draw took " + (time2 - time1) + " milliseconds.");
};

AntColony.Board.prototype.resetRegions = function(){
    this.regionGrid.forEach(function(params){
        params.currentElement.setUnchanged();
    });
    // TODO: .resetChanged each region.
};


























AntColony.Board.prototype.getRegionForCoordinate = function(x, y){
    const rect = this.canvas.getBoundingClientRect();
    const i = Math.floor(x / this.scale),
        j = Math.floor(y / this.scale);
    if(i < 0 || j < 0 || i >= this.width || j >= this.height){
        return AntColony.Optional.Empty;
    }
    return new AntColony.Optional(this.regionGrid.getElement(i, j));
};



AntColony.Board.prototype.getRegionsForBox = function(params){
    // TODO: remove validateParams
    // AntColony.validateParams(params, "x", "y", "width", "height")
    const regions = [];

    for(let i = 0; i < params.width; i += this.scale - 1){
        for(let j = 0; j < params.height; j += this.scale - 1){
            const optionalRegion = this.getRegionForCoordinate(params.x + i, params.y + j);
            if(optionalRegion.isPresent()){
                regions.push(optionalRegion.getValue());
            }
        }
    }

    // console.log("For x = " + params.x + ", y = " + params.y);
    // console.log(regions);
    return regions;
};

AntColony.Board.prototype.drawTiles = function(context){

    const that = this;
    // TODO: Use a terrainType -> asset mapping
    this.tiles.forEach(function(tile){
        // validateParams(params, "currentElement", "i", "j");
        // console.log(params.currentElement);
        if(tile.isChanged){
            const x = that.scale * tile.x;
            const sx = 32 * tile.terrainType,
                sy = 832,
                swidth = 32,
                sheight = 32,
                y = that.scale * tile.y,
                width = that.scale,
                height = that.scale;
                context.drawImage(
                    AntColony.assetManager.getAsset("./assets/Tiles.png"),
                    sx,
                    sy,
                    swidth,
                    sheight,
                    x,
                    y,
                    width,
                    height
                    );
        }
    });


    // // TODO: Make this draw tiles actually corresponding to tileGrid[i][j]. Also optimize away calculations.
    // for(let i = 0; i < this.width; ++i){
    //     let x = this.scale * i;
    //     for(let j = 0; j < this.height; ++j){
    //         let sx = 32 * (this.tileGrid[i][j] - 1),
    //         sy = 832,
    //         swidth = 32,
    //         sheight = 32,
    //         y = this.scale * j,
    //         width = this.scale,
    //         height = this.scale;
    //         context.drawImage(
    //             AntColony.assetManager.getAsset("./assets/Tiles.png"),
    //             sx,
    //             sy,
    //             swidth,
    //             sheight,
    //             x,
    //             y,
    //             width,
    //             height
    //             );
    //     }
    // }
};
