"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

/*
Resource - building (8)
    population: Ant Mound
    waterBuckets: Well
    woodChips: Tree Infestation
    leaves: Tree Infestation
    tastyBeetles: Beetle Farm
    grazedGrass: Grasshoper Meadow
    fertilizer: Grasshoper Meadow
    raspberries: Raspberry Farm
    pebbles: Pebble Quarry
*/

AntColony.PlayerStatusPanel = function(params){
    AntColony.validateParams(params, "canvas", "scale", "player");
    this.canvas = params.canvas;
    this.scale = params.scale;
    this.player = params.player;
};

AntColony.PlayerStatusPanel.prototype.draw = function(params){

};


