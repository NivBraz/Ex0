'use strice';
var events = require('events');
var eventConfig = require('./config').events;

class Player extends events{

    constructor(name,goals){
        super();
        this.name = name;
        this.goals = goals;
        //events.EventEmitter.call(this);
    }

    addGoal(){
        this.goals++;
        this.emit(eventConfig.GOAL);
        //console.log("Added 1 goal to %s.", this.name);
    }
    downCheck(){
        let err = false;
        return new Promise((resolve,reject) => {
            if(this.goals==0) err= true;
            if(err)
                reject(err);
            else
                resolve();
        });
    }
    removeGoal(){
        this.goals--;
        this.emit(eventConfig.GOAL);
    }
};

//Player.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (name,goals){
    var newPlayer = new Player(name,goals);
    return newPlayer;
}
