"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.BuildingConstats = {
    ProductionPeriod: 125
};

AntColony.Building = function(params){
    AntColony.validateParams(params, "animation", "cost", "bonusOnBuild", "upkeep", "production", "width", "height", "buildTerrain");
    this.x = 0;
    this.y = 0;
    this.width = params.width;
    this.height = params.height;

    const animation = params.animation;

    this.cost = params.cost;
    this.bonusOnBuild = params.bonusOnBuild;

    this.upkeep = params.upkeep;

    this.production = params.production;

    this.producedItems = [];
    this.resourceBank = new AntColony.ResourceBank(true);

    this.trails = [];

    this.buildTerrain = params.buildTerrain;
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
        if(updates === 0 && this.resourceBank.hasResources({cost: this.upkeep})){
            // console.log(this.upkeep);
            // console.log(this.resourceBank);
            this.resourceBank.pay({cost: this.upkeep});
            let buildingNumber = 0;
            this.production.forEach(function(resourceTypeQuantity){
                const resourceType = resourceTypeQuantity[0], quantity = resourceTypeQuantity[1];
                if(that.canProduce({resourceType: resourceType})){
                    const item = AntColony.ItemTypes.getItemForResourceType({
                        resourceType: resourceType,
                        startingPosition:{
                            x: that.x + Math.floor(buildingNumber * that.width / 2.0),
                            y: that.y + Math.floor(that.height / 2.0)
                        },
                        quantity: quantity
                    });
                    ++buildingNumber;
                    that.producedItems.push(item);
                    AntColony.Globals.Board.addItem(item);
                }
            });
        }
    };

    this.canProduce = function(params){
        AntColony.validateParams(params, "resourceType");
        let result = true;
        that.producedItems.forEach(function(item){
            if(item.resourceType === params.resourceType){
                result = false;
            }
        });
        return result;
    };

    this.asShadow = function(){
        this.isShadow = true;
        return this;
    };
};

