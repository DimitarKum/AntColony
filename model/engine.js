"use strict";
// Global namespace AntColony
var AntColony = AntColony || {};

/*
* gameSpeed - currently unused
* frameRate - frames per second
*/
AntColony.Engine = function(params){
    AntColony.validateParams(params, "canvas", "context", "board", "gameSpeed", "frameRate", "userInterface");
    this.canvas = params.canvas;
    this.context = params.context;
    this.board = params.board;
    this.userInterface = params.userInterface;
};

AntColony.Engine.prototype.start = function(){
    const that = this;
    // let draws = 0;
    // let timeDif = 0
    // let maxTime = 0;
    function step(timestamp){
        // ++draws;
        // const time1 = window.performance.now();
        that.userInterface.update({timestamp: timestamp});
        that.userInterface.draw({context: that.context, timestamp: timestamp});
        that.board.update({timestamp: timestamp});
        that.board.draw({context: that.context, timestamp: timestamp});


        window.requestAnimationFrame(function(timestamp){
            step(timestamp);
        });
        // const time2 = window.performance.now();
        // timeDif += time2 - time1;
        // if(timeDif > maxTime){
        //     maxTime = timeDif;
        // }
        // if(draws % 60 === 0){
        //     console.log("Update/Draw took on avg: " + ((timeDif) / 60) + " ms, with max: " + maxTime);
        //     timeDif = 0;
        //     maxTime = 0;
        // }
    };
    window.requestAnimationFrame(function(timestamp){
        step(timestamp);
    });
};