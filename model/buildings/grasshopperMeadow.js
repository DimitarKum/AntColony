// "use strict";
// // Global namespace AntColony
// var AntColony = AntColony || {};

// AntColony.AntMound = function(params){
//     AntColony.validateParams(params, "scale");
//     const width = params.scale * 2;
//     const height = params.scale * 2;
//     const animation = new AntColony.Animation({
//         entity: this,
//         spriteSheet: "./assets/BuildingAnimations/grasshopperMeadow.png",
//         frameStartX: 0,
//         frameStartY: 0,
//         frameWidth: 32,
//         frameHeight: 32,
//         sheetWidth: 32 * 6,
//         frameCount: 31,
//         framesPerSecond: 8
//     });
//     const cost = [
//         [AntColony.ResourceTypes.TastyBeetles, 10],
//         [AntColony.ResourceTypes.Raspberries, 10]
//     ];
//     const bonusOnBuild = [
//         [AntColony.ResourceTypes.Population, 5]
//     ];
//     const upkeep = [
//         [AntColony.ResourceTypes.TastyBeetles, 1],
//         [AntColony.ResourceTypes.Raspberries, 1]
//     ];
//     const production = [
//     ];
//     AntColony.Building.call(this, {
//         animation: animation,
//         cost: cost,
//         bonusOnBuild: bonusOnBuild,
//         upkeep: upkeep,
//         production: production,
//         width: width,
//         height: height
//     });
// };