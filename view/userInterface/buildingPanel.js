"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingPanel = function(params) {
    this;
};

AntColony.BuildingPanel.prototype.update = function(params){
    // AntColony.validateParams(params, "timestamp");
};

AntColony.BuildingPanel.prototype.draw = function(params){
    // AntColony.validateParams(params, "context", "timestamp");

    params.context.beginPath();
    params.context.moveTo(0,0);
    params.context.lineTo(300,150);
    params.context.stroke();
};