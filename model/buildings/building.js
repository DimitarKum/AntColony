"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingConstats = {
    ProductionPeriod: 60
};

AntColony.Building = function(params){
    AntColony.validateParams(params, "animation", "cost", "bonusOnBuild", "upkeep", "production", "width", "height");

    this.x = 0;
    this.y = 0;
    this.width = params.width;
    this.height = params.height;

    const animation = params.animation;

    this.cost = params.cost;
    this.bonusOnBuild = params.bonusOnBuild;

    this.upkeep = params.upkeep;

    this.production = params.production;

    this.resourceBank = new AntColony.ResourceBank(true);

    let updates = 0;

    this.draw = function(params){
        if(this.isShadow){
            params.context.save();
            params.context.globalAlpha = 0.60;
            const result = animation.draw(params);
            params.context.restore();
            return result;
        }
        return animation.draw(params);
    };
    this.advanceFrame = function(timestamp){
        if(animation.advanceFrame(timestamp)){
            this.hasChanged();
        }
    };
    const that = this;
    this.update = function(){
        if(this.isShadow){
            return;
        }
        updates += 1;
        updates %= AntColony.BuildingConstats.ProductionPeriod;
        console.log("GETTING " + this.resourceBank.hasResources({cost: this.upkeep}));
        if(updates === 0 && this.resourceBank.hasResources({cost: this.upkeep})){
            // console.log(this.upkeep);
            // console.log(this.resourceBank);
            this.resourceBank.pay({cost: this.upkeep});
            this.production.forEach(function(resourceTypeQuantity){
                const resourceType = resourceTypeQuantity[0], quantity = resourceTypeQuantity[1];
                const item = AntColony.ItemTypes.getItemForResourceType({
                    resourceType: resourceType,
                    startingPosition:{
                        x: that.x,
                        y: that.y
                    },
                    quantity: quantity
                });
                AntColony.Globals.Board.addItem(item);
            });
        }
    };


    this.asShadow = function(){
        this.isShadow = true;
        return this;
    };
};
