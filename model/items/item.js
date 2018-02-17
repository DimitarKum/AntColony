"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Item = function(params){
    // AntColony.validateParams(params, "board", "resourceType", "animation", "quantity");
    const board = params.board;
    const resourceType = params.resourceType;
    const that = this;
    const quantity = params.quantity;
    this.update = function(params){
        // AntColony.validateParams(params, );
        // this.x += 5 - Math.floor(10 * Math.random());
        // this.y += 5 - Math.floor(10 * Math.random());
        let bestDistance = 999999999;
        let closestBuilding = null;
        board.getBuildings().forEach(function(building){
            building.upkeep.forEach(function(resourceTypeQuantity){
                const buildingResourceType = resourceTypeQuantity[0];
                if(
                    buildingResourceType === resourceType &&
                    ((building.x - that.x) * (building.x - that.x) + (building.y - that.y) * (building.y - that.y)) < bestDistance
                    ){
                    bestDistance = ((building.x - that.x) * (building.x - that.x) + (building.y - that.y) * (building.y - that.y));
                    closestBuilding = building;
                }
            });
        });

        if(bestDistance < 36){
            closestBuilding.resourceBank.addResources({
                resources: [[resourceType, quantity]]
            });
            board.removeItem({itemToRemove: that});
            return;
        }

        if(closestBuilding !== null){
            const dx = (closestBuilding.x - this.x), dy = (closestBuilding.y - this.y);
            const s = 0.8 / Math.sqrt(dx * dx + dy * dy);
            const resultingDx = s * dx, resultingDy = s * dy;
            this.changePosition({
                x: this.x + resultingDx,
                y: this.y + resultingDy
            });
        }
    };
    const animation = params.animation;
    this.draw = function(params){
    // AntColony.validateParams(params, "context", "timestamp");
        animation.draw(params);
        // const ctx = params.context;
        // ctx.beginPath();
        // ctx.save();
        // // ctx.font = "bold " + Math.floor(AntColony.Globals.Scale * 2.0) + "px Arial";
        // ctx.font = "bold " + Math.floor(AntColony.Globals.Scale * 0.25) + "px Courier New";
        // ctx.fillStyle = "rgb("+255+","+255+","+255+")";
        // ctx.fillText(
        //     quantity,
        //     this.x - AntColony.Camera.instance.x,
        //     this.y + AntColony.Globals.Scale * 0.25 - AntColony.Camera.instance.y
        // );
        // ctx.restore();
        // ctx.closePath();
    };
};

