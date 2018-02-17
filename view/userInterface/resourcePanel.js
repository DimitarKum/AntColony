"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.ResourcePanel = function(params) {
    AntColony.validateParams(params, "scale", "player");
    this.scale = params.scale;
    this.menuItems = [];
    this.player = params.player;
    this.hasChanged = true;
};

AntColony.ResourcePanel.prototype.update = function(params){

};

AntColony.ResourcePanel.prototype.draw = function(params){
    if(!this.hasChanged){
        return;
    }
    // AntColony.validateParams(params, "context", "timestamp")
    const context = params.context;

    context.save();
    context.clearRect(0, 0, this.scale * 21, this.scale * 10);
    const fontSize = this.scale / 1.67;
    context.font = fontSize + "px Consolas";
    // context.fillStyle = "#050530";
    context.fillStyle = "#F0A000";

    let row = 0, column = 0;
    const resources = this.player.getResources().resources, income = this.player.getResources().income;
    for (const key in AntColony.ResourceTypes) {
        if (AntColony.ResourceTypes.hasOwnProperty(key)) {
            if(row === 3){
                row = 0;
                column += 1;
            }
            const xStart = fontSize * 0.01 + (12 * fontSize) * column,
                yStart = fontSize * 1.27 + 1.35 * fontSize * row;
            const resourceType = AntColony.ResourceTypes[key];
            const resourceQuantity = resources[resourceType];//, resourceIncome = income[resourceType];

            context.drawImage(
                AntColony.assetManager.getAsset(AntColony.ResourceImage[resourceType]),
                // AntColony.assetManager.getAsset("./assets/ResourceIcons/population4.png"),
                // AntColony.assetManager.getAsset("./assets/moundIcon.png"),
                // TODO: Reuse that.startX + that.getFrame() * that.frameWidth calculation!
                xStart + fontSize * 0.25,
                yStart - fontSize * 0.8,
                fontSize,
                fontSize
                // that.frameWidth,
                // that.frameHeight,
                // that.entity.x - that.getCamera().x,
                // that.entity.y - that.getCamera().y,
                // that.entity.width,
                // that.entity.height
            );

            let strBuffer = resourceType + ": ";
            strBuffer += " ".repeat(14 - strBuffer.length);
            strBuffer += resourceQuantity;
            // strBuffer += " ".repeat(18 - strBuffer.length);
            // strBuffer += "(+" + resourceIncome + ")";

            context.fillText(strBuffer, xStart + 1.5 * fontSize, yStart);
            // console.log(resourceType + ": ");


            row += 1;
        }
    }


    // context.font = this.scale / 2.0 + "px Times New Roman";
    // context.fillStyle = "#000000";

    // context.fillText("Use arrow key to move camera in the world.", this.scale, this.scale + this.scale / 2.0);
    // context.fillText("You can build an AntMound or demolish an AntMound", this.scale, this.scale + this.scale * 1.0);
    // context.fillText("using the icons on the right side.", this.scale, this.scale + this.scale * 1.5);
    context.restore();
    this.hasChanged = false;
};