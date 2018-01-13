"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

AntColony.Optional = function(value){
    if(value === undefined){
        throw new Error("Attempted to create an Optional object out of an undefined variable.");
    }
    if(value === null){
        return AntColony.Optional.Empty;
    }
    this.getValue = function(){
        return value;
    };
    this.isPresent = function(){
        return true;
    };
    Object.freeze(this);
};

AntColony.Optional.Empty = {isPresent: function(){return false}};
Object.freeze(AntColony.Optional.Empty);

// // Some tests:
// (function(){
//     //Testing freeze
//     AntColony.Optional.Empty.isPresent = true;

//     //Non-null optional
//     let presentOptional = new AntColony.Optional({key1: "val1", key2: "val2"});
//     console.log(presentOptional);

//     //All flavors of null/undefined.
//     try{
//         let emptyOptional1 = new AntColony.Optional();
//         console.log(emptyOptional1);
//     }catch(err){
//         console.log(err);
//     }
    
//     let emptyOptional2 = AntColony.Optional.Empty;
//     console.log(emptyOptional2);
//     let emptyOptional3 = new AntColony.Optional(null);
//     console.log(emptyOptional3);
//     try{
//         let undef;
//         let emptyOptional4 = new AntColony.Optional(undef);
//         console.log(emptyOptional4);
//     }catch(err){
//         console.log(err);
//     }
//     console.log(AntColony.Optional.Empty);
// }) ();
