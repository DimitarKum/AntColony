"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Player = function(params){
    AntColony.validateParams(params, "board", "gameWorld");

    this.board = params.board;

    this.state = AntColony.Player.State.SELECT;
    this.selectedBuilding = AntColony.BuildingTypes.NO_BUILDING;
    this.gameWorld = params.gameWorld;
    // State can be selection or build. Build state also knows about current building
};

AntColony.Player.prototype.setState = function(newState){
    this.state = newState;
};

AntColony.Player.prototype.selectBuilding = function(params){
    AntColony.validateParams(params, "buildingToSelect", "buildingShadow");

    this.gameWorld.style.cursor = "none";

    this.state = AntColony.Player.State.BUILD;
    this.selectedBuilding = params.buildingToSelect;
    this.board.setBuildingShadow(params.buildingShadow);
};

AntColony.Player.prototype.getSelectedBuildingType = function(){
    return this.selectedBuilding;
};

AntColony.Player.prototype.resetSelectionState = function(){
    this.gameWorld.style.cursor = "";

    this.state = AntColony.Player.State.SELECT;
    this.selectedBuilding = AntColony.BuildingTypes.NO_BUILDING;
    this.board.removeBuildingShadow();
};


AntColony.Player.State = {
    SELECT: 0,
    BUILD: 1,
    DEMOLISH: 2
};