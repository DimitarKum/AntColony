"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Tile = function(params){
    AntColony.validateParams(params, "terrainType", "x", "y");
    this.terrainType = params.terrainType;
    this.x = params.x;
    this.y = params.y;
    this.isChanged = true;
};








/*
* params.width - represents number of cells width-wise
* params.height - represents number of cells height-wise
*/
AntColony.islandCount = 0;
AntColony.curIslandSize = 0;
AntColony.totalIslandsSize = 0;

AntColony.getAdjescentCoords = function (params){
    AntColony.validateParams(params,"x", "y", "maxX", "maxY");

    const coords = [];
    if(params.x != 0){
        coords.push({x: params.x - 1, y:params.y});
    }
    if(params.y != 0){
        coords.push({x: params.x, y:params.y - 1});
    }
    if(params.x < params.maxX - 1){
        coords.push({x: params.x + 1, y:params.y});
    }
    if(params.y < params.maxY - 1){
        coords.push({x: params.x, y:params.y + 1});
    }
    return coords;
};

AntColony.Terrain = {
    Earth: 1,
    Grass: 2,
    Water: 3,
    Rock: 4,
    Forest: 5
};

AntColony.randTerrain = function(){
    return AntColony.randInt({from: 1, to: 5});
};


AntColony.startAnIsle = function(params){
    AntColony.validateParams(params, "terrainType", "x", "y", "odds", "outOf", "tileGrid", "width", "height");
    // params.tileArray[params.x][params.y] = new AntColony.Tile({terrainType: params.terrainType});
    params.tileGrid.setElement({
        i: params.x,
        j: params.y,
        value: params.terrainType
    });


    AntColony.getAdjescentCoords({
        x: params.x,
        y: params.y,
        maxX: params.width,
        maxY: params.height
    }).forEach(function(coordinate){
            if(AntColony.drawOdds({ 
                odds: params.odds,
                outOf: params.outOf
            })){
                ++AntColony.curIslandSize;
                let nextOdds;
                if(params.tileGrid.getElement(coordinate.x, coordinate.y) ===
                    params.terrainType){ //Adjescent terrain already has same type
                    nextOdds = params.odds * 0.1;
                }else{
                    nextOdds = params.odds * 0.81;
                }

                AntColony.startAnIsle({
                    tileGrid: params.tileGrid,
                    width: params.width,
                    height: params.height,
                    terrainType: params.terrainType,
                    x: coordinate.x,
                    y: coordinate.y,
                    odds: nextOdds,
                    outOf: params.outOf
                });
            }
        });
};
AntColony.createTiles = function(width, height){
    const tileGrid = new AntColony.Grid({width: width, height: height});
    tileGrid.setEachElement(function(params){
        // validateParams(params, "currentElement", "i", "j");
        return AntColony.Terrain.Earth;
    });

    tileGrid.forEach(function(params){
        // validateParams(params, "currentElement", "i", "j");
        if(AntColony.drawOdds({
            odds: 1,
            outOf: 50
        })){
            AntColony.startAnIsle({
                tileGrid: tileGrid,
                width: width,
                height: height,
                terrainType: AntColony.randTerrain(),
                x: params.i,
                y: params.j,
                odds: 9,
                outOf: 10
            });
        }
    });
    const tileArray = [];
    (new AntColony.Grid({width: width, height: height})).forEach(function(params){
        tileArray.push(new AntColony.Tile({
            x: params.i,
            y: params.j,
            terrainType: tileGrid.getElement(params.i, params.j)
        }));
    });

    return tileArray;
};