"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

//Verfies that the object compositeParameter contains all arguments
AntColony.validateParams = function(compositeParameter, ...propertyNames){
    propertyNames.forEach(function(propertyName){
        if(compositeParameter[propertyName] == null){
            throw new Error('Parameter object is missing the following property [' + propertyName + '].');
        }
    });
    // for(let i = 1; i < arguments.length; ++i){
    //     if(arguments[i] == null){
    //         throw new Error('Parameter object is missing the following property [' + arguments[i] + '].');
    //     }
    // };
};