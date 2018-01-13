"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

// Represents a grid/2darray/matrix of any objects
AntColony.Grid = function(params){
    AntColony.validateParams(params, "width", "height");
    this.width = params.width;
    this.height = params.height;

    this.array = [];
    for(let i = 0; i < this.width; ++i){
        const currentRow = [];
        for(let j = 0; j < this.height; ++j){
            currentRow.push(0);
        }
        this.array.push(currentRow);
    }
};

// callback({currentElement, i, j})
AntColony.Grid.prototype.forEach = function(callback){
    for(let i = 0; i < this.width; ++i){
        for(let j = 0; j < this.height; ++j){
            callback({
                currentElement: this.array[i][j],
                i: i,
                j: j
            });
        }
    }
};

AntColony.Grid.prototype.getElement = function(i, j){
    return this.array[i][j];
};

AntColony.Grid.prototype.setElement = function(params){
    // validateParams(params, "i", "j", "value");
    this.array[params.i][params.j] = params.value;
};

AntColony.Grid.prototype.setEachElement = function(callback){
    for(let i = 0; i < this.width; ++i){
        for(let j = 0; j < this.height; ++j){
            this.array[i][j] = callback({
                currentElement: this.array[i][j],
                i: i,
                j: j
            });
        }
    }
};