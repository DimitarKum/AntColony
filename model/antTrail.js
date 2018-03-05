"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.AntTrail_Cost = [
    [AntColony.ResourceTypes.Population, 1]
];

AntColony.AntTrail = function(params){
    AntColony.validateParams(params, "consumer", "producer", "resourceType");

    params.consumer.trails.push(this);
    params.producer.trails.push(this);

    this.x = AntColony.centerOf(params.producer).x;
    this.y = AntColony.centerOf(params.producer).y;
    this.itemCarried = null;

    this.producer = params.producer;
    this.consumer = params.consumer;
    this.resourceType = params.resourceType;

    this.buildingToMoveTo = this.consumer;

    this.speed = 0.80;

    const tresholdDistance = 5;
    const that = this;
    this.update = function(params){
        AntColony.moveTo({
            mover: that,
            target: AntColony.centerOf(that.buildingToMoveTo),
            speed: that.speed
        });
        if(AntColony.distance({entity1: that, entity2: AntColony.centerOf(that.producer)}) < tresholdDistance){
            that.buildingToMoveTo = that.consumer;
        }else if(AntColony.distance({entity1: that, entity2: AntColony.centerOf(that.consumer)}) < tresholdDistance){
            that.buildingToMoveTo = that.producer;
        }

        if(
            that.itemCarried === null &&
            !that.producer.canProduce({resourceType: that.resourceType}) &&
            AntColony.distance({entity1: that, entity2: AntColony.centerOf(that.producer)}) < tresholdDistance
            ){
            //Take item from producer
            for(var i = 0; i < that.producer.producedItems.length; ++i){
                if(that.producer.producedItems[i].resourceType === that.resourceType){
                    that.itemCarried = that.producer.producedItems[i];
                    that.producer.producedItems.remove(that.producer.producedItems[i]);
                }
            }
        }
        else if(
            that.itemCarried !== null &&
            AntColony.distance({entity1: that, entity2: AntColony.centerOf(that.consumer)}) < tresholdDistance
            ){
            that.consumer.resourceBank.addResources({
                resources: [[that.itemCarried.resourceType, that.itemCarried.quantity]]
            });
            AntColony.Globals.Board.removeItem({itemToRemove: that.itemCarried});
            that.itemCarried = null;
            //Give item to consumer
        }
    };

    this.draw = function(params){
        const ctx = params.context;
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = "#100005";
        const borderWidth = 4;
        ctx.lineWidth = borderWidth;
        ctx.rect(
            that.x - AntColony.Camera.instance.x + 5,
            that.y - AntColony.Camera.instance.y + 5,
            borderWidth,
            borderWidth
        );
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    };
    this.changePosition = function(params){
        AntColony.validateParams(params, "x", "y");
        that.x = params.x;
        that.y = params.y;
        if(that.itemCarried){
            that.itemCarried.changePosition({x: params.x + that.itemCarried.width, y: params.y + that.itemCarried.height});
            that.itemCarried.changePosition(params);
        }
    };

    // this.draw = function(p)
};

AntColony.distance = function(params){
    // AntColony.validateParams(params, "entity1", "entity2");
    return Math.sqrt((params.entity1.x - params.entity2.x) * (params.entity1.x - params.entity2.x) + 
        (params.entity1.y - params.entity2.y) * (params.entity1.y - params.entity2.y));

};

AntColony.centerOf = function(entity){
    return {
        x: entity.x + Math.floor(entity.width / 2.0),
        y: entity.y + Math.floor(entity.height / 2.0),
    }
};

AntColony.moveTo = function(params){
    // AntColony.validateParams(params, "mover", "target", "speed");
    const target = params.target, mover = params.mover, speed = params.speed;
    const dx = (target.x - mover.x), dy = (target.y - mover.y);
    const s = speed / Math.sqrt(dx * dx + dy * dy);
    const resultingDx = s * dx, resultingDy = s * dy;
    mover.changePosition({
        x: mover.x + resultingDx,
        y: mover.y + resultingDy
    });
};


// Returns producerConsumer {producer, consumer, resourceType}.
// A match is found iff resourceType !== null
AntColony.getBuildingsConsumptionProduction = function(params){
    AntColony.validateParams(params, "building1", "building1");
    const building1 = params.building1, building2 = params.building2;

    let producerConsumer = {resourceType: null};

    building1.production.forEach(function(prodictionResourceTypeQuantity){
        const productionResourceType = prodictionResourceTypeQuantity[0];
        building2.upkeep.forEach(function(upkeepResourceTypeQuantity){
            const upkeepResourceType = upkeepResourceTypeQuantity[0];

            if(productionResourceType === upkeepResourceType){
                producerConsumer.producer = building1;
                producerConsumer.consumer = building2;
                producerConsumer.resourceType = productionResourceType;
            }
        });
    });

    building2.production.forEach(function(prodictionResourceTypeQuantity){
        const productionResourceType = prodictionResourceTypeQuantity[0];
        building1.upkeep.forEach(function(upkeepResourceTypeQuantity){
            const upkeepResourceType = upkeepResourceTypeQuantity[0];

            if(productionResourceType === upkeepResourceType){
                producerConsumer.producer = building2;
                producerConsumer.consumer = building1;
                producerConsumer.resourceType = productionResourceType;
            }
        });
    });

    return producerConsumer;
};