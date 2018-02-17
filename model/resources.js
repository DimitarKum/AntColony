"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.ResourceTypes = {
    Population: "Population",
    WaterBuckets: "WaterBuckets",
    WoodChips: "WoodChips",
    TastyBeetles: "TastyBeetles",
    GrazedGrass: "GrazedGrass",
    Fertilizer: "Fertilizer",
    Leaves: "Leaves",
    Raspberries: "Raspberries",
    Pebbles: "Pebbles"
};
AntColony.ItemTypes = {};
AntColony.ItemTypes.getItemForResourceType = function(params){
    // AntColony.validateParams(params, "resourceType", "startingPosition", "quantity");
    // AntColony.validateParams(params.startingPosition, "x", "y");

    const resourceType = params.resourceType,
        startingPosition = params.startingPosition,
        quantity = params.quantity;
    switch(resourceType){
        case(AntColony.ResourceTypes.WaterBuckets):
            return new AntColony.WaterBucketsItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        case(AntColony.ResourceTypes.WoodChips):
            return new AntColony.WoodChipsItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        case(AntColony.ResourceTypes.TastyBeetles):
            return new AntColony.TastyBeetlesItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        case(AntColony.ResourceTypes.GrazedGrass):
            return new AntColony.GrazedGrassItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        case(AntColony.ResourceTypes.Fertilizer):
            return new AntColony.FertilizerItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        case(AntColony.ResourceTypes.Leaves):
            return new AntColony.LeavesItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        case(AntColony.ResourceTypes.Raspberries):
            return new AntColony.RaspberriesItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        case(AntColony.ResourceTypes.Pebbles):
            return new AntColony.PebblesItem({
                board: AntColony.Globals.Board,
                scale: AntColony.Globals.Scale,
                startingPosition: startingPosition,
                quantity: quantity
            });
            break;
        default:
            throw new Error("Attempted to getItemForResourceType() for invalid resourceType[" + resourceType + "].");
            break;
    }
};

AntColony.ResourceImage = {
    "Population": "./assets/ResourceIcons/population.png",
    // "Population": "./assets/ResourceIcons/population4.png",
    "WaterBuckets": "./assets/ResourceIcons/waterBuckets.png",
    "WoodChips": "./assets/ResourceIcons/woodChips.png",
    // "WoodChips": "./assets/ResourceIcons/woodChips2.png",
    "TastyBeetles": "./assets/ResourceIcons/beetles.png",
    "GrazedGrass": "./assets/ResourceIcons/grazedGrass2.png",
    "Fertilizer": "./assets/ResourceIcons/fertilizer.png",
    // "Fertilizer": "./assets/ResourceIcons/fertilizer3.png",
    "Leaves": "./assets/ResourceIcons/leaves.png",
    "Raspberries": "./assets/ResourceIcons/raspberries.png",
    "Pebbles": "./assets/ResourceIcons/pebbles2.png" 
};

AntColony.InitialResources = {
    "Population": 0,
    "WaterBuckets": 0,
    "WoodChips": 0,
    "TastyBeetles": 100,
    "GrazedGrass": 0,
    "Fertilizer": 0,
    "Leaves": 0,
    "Raspberries": 40,
    "Pebbles": 0
};

AntColony.InitialIncome = {
    "Population": 0,
    "WaterBuckets": 0,
    "WoodChips": 0,
    "TastyBeetles": 0,
    "GrazedGrass": 0,
    "Fertilizer": 0,
    "Leaves": 0,
    "Raspberries": 0,
    "Pebbles": 0
};

AntColony.ResourceBank = function(empty) {
    this.resources = {};
    for(const resourceType in AntColony.ResourceTypes){
        if(AntColony.ResourceTypes.hasOwnProperty(resourceType)){
            if(empty){
                this.resources[resourceType] = 0;
            }else{
                this.resources[resourceType] = AntColony.InitialResources[resourceType];
            }
        }
    }
    // this.income = {};
    // for(const resourceType in AntColony.ResourceTypes){
    //     if(AntColony.ResourceTypes.hasOwnProperty(resourceType)){
    //         this.income[resourceType] = AntColony.InitialIncome[resourceType]
    //     }
    // }
};

AntColony.ResourceBank.prototype.dumpResourceBank = function(params){
    // AntColony.validateParams(params, "resourceBank");
    const resourceBank = params.resourceBank;
    for(let resourceType in resourceBank.resources){
        if(resourceBank.resources.hasOwnProperty(resourceType)){
            // console.log(resourceType);
            this.resources[resourceType] += resourceBank.resources[resourceType];
            resourceBank.resources[resourceType] = 0;
        }
    }
    // console.log(this.resources);
};

AntColony.ResourceBank.prototype.addResources = function(params){
    // AntColony.validateParams(params, "resources");
    const that = this;
    params.resources.forEach(function(resourceTypeQuantity){
        const resourceType = resourceTypeQuantity[0], quantity = resourceTypeQuantity[1];
        that.resources[resourceType] += quantity;
    });
};


AntColony.ResourceBank.prototype.setResource = function(params){
    AntColony.validateParams(params, "resourceType", "quantity");
    this.resources[params.resourceType] = params.quantity;
};

AntColony.ResourceBank.prototype.getResource = function(params){
    AntColony.validateParams(params, "resourceType");
    return this.resources[params.resourceType];
};

AntColony.ResourceBank.prototype.hasResources = function(params){
    // AntColony.validateParams(params, "cost");
    const that = this;
    let result = true;
    params.cost.forEach(function(resourceTypeQuantity){
        const resourceType = resourceTypeQuantity[0], quantity = resourceTypeQuantity[1];
        // console.log("ResourceBank Has: " + that.resources[resourceType]);
        // console.log("Cost: " + quantity);
        // console.log(that.resources[resourceType] < quantity);
        if(that.resources[resourceType] < quantity){
            result = false;
            return;
        }
    });
    return result;
};

AntColony.ResourceBank.prototype.pay = function(params){
    // AntColony.validateParams(params, "cost");
    const that = this;
    params.cost.forEach(function(resourceTypeQuantity){
        const resourceType = resourceTypeQuantity[0], quantity = resourceTypeQuantity[1];
        that.resources[resourceType] -= quantity;
    });
};