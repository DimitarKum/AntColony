"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.drawOdds = function(params){
    AntColony.validateParams(params, "odds", "outOf");
    return params.odds >= Math.random() * params.outOf;
};


AntColony.randInt = function(params){
    AntColony.validateParams(params, "from", "to");
    return Math.floor(params.from + Math.random() * (params.to - params.from + 1));
};