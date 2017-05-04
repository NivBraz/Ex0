const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000;
var player_module = require('./player_module');
var log = '';
var player1 = player_module("niv" , 10);
var player2 = player_module("braz" , 0);
var eventConfig = require('./config').events;


function displayGoal(){
  console.log(`the player ${this.name} current goals are ${this.goals}`);
}
function logGoal(){
  log += (`the player ${this.name} current goals are ${this.goals} <br>`);
}
function checkGoal(){
  log += (`the player ${this.name} has no goals to remove! <br>`);
  console.log(`the player ${this.name} has no goals to remove!`);
}
player1.on(eventConfig.GOAL, displayGoal);
player1.on(eventConfig.GOAL, logGoal);
player1.on(eventConfig.CHECK, checkGoal);
player2.on(eventConfig.GOAL, displayGoal);
player2.on(eventConfig.GOAL, logGoal);
player2.on(eventConfig.CHECK, checkGoal);


app.get('/', function (req, res) {
  var p1 = player2.downCheck()
     .then(() => {
        player2.removeGoal();
     })
     .catch((err) =>{
        player2.emit(eventConfig.CHECK);
     });
   var p2 = player1.downCheck()
     .then(() => {
        player1.removeGoal();
     })
     .catch((err) =>{
        player1.emit(eventConfig.CHECK);
     });
   player2.addGoal();
   player2.addGoal();
   player1.addGoal();
   var p3 = player2.downCheck()
     .then(() => {
        player2.removeGoal();
     })
     .catch((err) =>{
        player2.emit(eventConfig.CHECK);
     });

     Promise.all([p1, p2, p3])
     .then(() => {res.send(log);})
     .catch((err) => {console.error(err);});
   
})

app.listen(port);
console.log(`listen on port ${port}`);