"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Player = function(params){
    AntColony.validateParams(params, "board");

    this.board = params.board;

    this.state = AntColony.Player.State.SELECT;
    this.selectedBuilding = AntColony.Buildings.NO_BUILDING;
    // State can be selection or build. Build state also knows about current building
};

AntColony.Player.prototype.selectBuilding = function(params){
    AntColony.validateParams(params, "buildingToSelect", "buildingShadow");

    this.state = AntColony.Player.State.BUILD;
    this.selectedBuilding = params.buildingToSelect;
    this.board.setBuildingShadow(params.buildingShadow);
};

AntColony.Player.prototype.resetSelectionState = function(){
    this.state = AntColony.Player.State.SELECT;
    this.selectedBuilding = AntColony.Buildings.NO_BUILDING;
    this.board.removeBuildingShadow();
};


AntColony.Player.State = {
    SELECT: 0,
    BUILD: 1,
    DEMOLISH: 2
};