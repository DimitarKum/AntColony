"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Player = function(params){
    AntColony.validateParams(params, "board", "gameWorld", "scale");

    this.board = params.board;
    this.scale = params.scale;

    this.state = AntColony.Player.State.SELECT;
    this.selectedBuilding = AntColony.BuildingTypes.NO_BUILDING;
    this.gameWorld = params.gameWorld;

    this.resourceBank = new AntColony.ResourceBank();
    this.listeners = [];
};

AntColony.Player.prototype.addListener = function(params){
    AntColony.validateParams(params, "listener");

    this.listeners.push(params.listener);
};

AntColony.Player.prototype.dumpResourceBank = function(params){
    AntColony.validateParams(params, "resourceBank");
    this.resourceBank.dumpResourceBank(params);
    this.notify();
};
AntColony.Player.prototype.addResources = function(params){
    // AntColony.validateParams(params, "resources");
    this.resourceBank.addResources(params);
    // this.resourceBank.resources[params.resourceType] += params.quantity;
    this.notify();
};

AntColony.Player.prototype.pay = function(params){
    // AntColony.validateParams(params, "cost");
    this.resourceBank.pay(params);
};
AntColony.Player.prototype.hasResources = function(params){
    // AntColony.validateParams(params, "cost");
    return this.resourceBank.hasResources(params);
};

AntColony.Player.prototype.getResources = function(){
    return this.resourceBank;
};

AntColony.Player.prototype.notify = function(){
    this.listeners.forEach(function(listener){
        listener.hasChanged = true;
    });
};
AntColony.Player.prototype.setState = function(newState){
    this.state = newState;
    this.notify();
};

AntColony.Player.prototype.selectBuilding = function(params){
    AntColony.validateParams(params, "buildingType");

    this.gameWorld.style.cursor = "none";

    this.state = AntColony.Player.State.BUILD;
    this.selectedBuilding = params.buildingType;
    const buildingShadow = AntColony.BuildingTypes.getBuildingForType({
        buildingType: params.buildingType,
        scale: this.scale
    }).asShadow();

    this.board.setBuildingShadow(buildingShadow);
    buildingShadow.changePosition({
        x: -10 * this.scale,
        y: -10 * this.scale
    });
};

AntColony.Player.prototype.getSelectedBuildingType = function(){
    return this.selectedBuilding;
};

AntColony.Player.prototype.resetSelectionState = function(){
    this.gameWorld.style.cursor = "";

    this.state = AntColony.Player.State.SELECT;
    this.selectedBuilding = AntColony.BuildingTypes.NO_BUILDING;
    this.board.removeBuildingShadow();
    if(this.buildingTrailStart){
       this.buildingTrailStart.deselect();
    }
};


AntColony.Player.State = {
    SELECT: 0,
    BUILD: 1,
    DEMOLISH: 2,
    START_TRAIL: 3,
    FINISH_TRAIL: 4
};