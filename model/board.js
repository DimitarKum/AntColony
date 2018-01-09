"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

/*
* params.width - represents number of cells width-wise
* params.height - represents number of cells height-wise
*/
AntColony.islandCount = 0;
AntColony.curIslandSize = 0;
AntColony.totalIslandsSize = 0;

AntColony.getAdjescentCoords = function (params){
    AntColony.validateParams(params,"x", "y", "maxX", "maxY");

    let coords = [];
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

AntColony.generateTileGrid = function(width, height){
    let tileGrid = [];
    for(let i = 0; i < width; ++i){
        let currentRow = [];
        for(let j = 0; j < height; ++j){
            currentRow.push(AntColony.Terrain.Earth);
        }
        tileGrid.push(currentRow);
    }

    function startAnIsle(params){
        AntColony.validateParams(params, "terrainType", "x", "y", "odds", "outOf", "tileGrid", "width", "height");
        params.tileGrid[params.x][params.y] = params.terrainType;

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
                    let nextOdds = params.tileGrid[coordinate.x][coordinate.y] === AntColony.Terrain ? params.odds * 0.1 : params.odds * 0.81;
                    startAnIsle({
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
    }
    
    for(let i = 0; i < width; ++i){
        for(let j = 0; j < height; ++j){
            if(AntColony.drawOdds({
                odds: 1,
                outOf: 50
            })){
                ++AntColony.islandCount;
                AntColony.curIslandSize = 0;
                startAnIsle({
                        tileGrid: tileGrid,
                        width: width,
                        height: height,
                        terrainType: AntColony.randTerrain(),
                        x: i,
                        y: j,
                        odds: 9,
                        outOf: 10
                    });
                AntColony.totalIslandsSize += AntColony.curIslandSize;
            }
        }
    }
    return tileGrid;
}

AntColony.Board = function(params){
    AntColony.validateParams(params, "width", "height", "scale");
    this.width = params.width;
    this.height = params.height;
    this.scale = params.scale;
    this.tileGrid = AntColony.generateTileGrid(this.width, this.height);

    this.draw = function(){
        console.dir(this.tileGrid);
        let screen = '';
        for(let i = 0; i < this.width; ++i){
            for(let j = 0; j < this.height; ++j){
                screen += this.tileGrid[i][j];
            }
            screen += '\n';
        }
        console.log(screen);
    }
};

let board = new AntColony.Board({
    width: 40,
    height: 60,
    scale: 5
});

board.draw();

board.printStats = function(){
    let terrainCounts = {1:0, 2:0, 3:0, 4:0, 5:0};
    for(let i = 0; i < this.width; ++i){
        for(let j = 0; j < this.height; ++j){
            ++terrainCounts[this.tileGrid[i][j]];
        }
    }
    console.log(
        "TerrainCounts:\nEarth:\t" + terrainCounts[1] +
        "\nGrass:\t" + terrainCounts[2] +
        "\nWater:\t" + terrainCounts[3] +
        "\nRock:\t" + terrainCounts[4] +
        "\nForest:\t" + terrainCounts[5]
        );
}
console.log("islandCount: " + AntColony.islandCount);
console.log("Avg island size: " + AntColony.totalIslandsSize / AntColony.islandCount);
board.printStats();
console.log("Legend:\n1: Earth\n2: Grass\n3: Water\n4: Rock\n5: Forest\n");

// AntColony.doOnEachAdjescent({
//                 callback: function(newX, newY){
//                     console.log('newX = ' + newX + ", newY = " + newY);
//                 },
//                 x: 39,
//                 y: 39,
//                 maxX: 40,
//                 maxY: 40
//             })