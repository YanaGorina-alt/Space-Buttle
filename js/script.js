

class Ship{ // since userShip and alienShip have a lot in common I can make them children of this class
    constructor(hull, firepower, accuracy){
        this.hull = hull; //hull is the same as hitpoints
        this.firepower =firepower;//firepower is the amount of damage done to the hull of the target with a successful hit
        this.accuracy = accuracy;//accuracy is the chance between 0 and 1 that the ship will hit its target

    }

    attack(target){
        if(Math.random() > target.accuracy){
            target.hull-= this.firepower;
            console.log("You damaged your target!");
        }else{
            console.log("It's a miss!");
        }
    }
}



//The alien ships should each have its properties determined randomly
class AlienShip extends Ship{
    constructor(){
        let hull = Math.floor(Math.random()*4) + 4; //between 3 and 6
        let firepower = Math.floor(Math.random()*3)+2; //between 2 and 4
        let accuracy = Math.random() * (0.8-0.6)+0.6; //between .6and .8
        super(hull, firepower, accuracy);
    }

}

class UserShip extends Ship{
    constructor(hull, firepower, accuracy){
        super(hull,firepower,accuracy);

    }
}
// FOR TESTING
//const user = new UserShip (20, 5, .7);
//console.log(user);
//console.log(user.accuracy)
//const alien = new AlienShip;
//console.log(alien);
//console.log(alien.accuracy)
//user.attack(alien);


class GameFactory{ 
    constructor(){
        //The aliens send a random number of ships to attack Earth.
        this.numOfAlienShips = Math.floor(Math.random()* 9)+ 6;
        this.alienFleet = this.generateMultipleShips(this.numOfAlienShips);
        // Your spaceship, the USS Assembly should have the following properties:
        // hull - 20; firepower - 5; accuracy - 0.7
        this.userShip = this.generateUserShip(20,5,.7);
        this.continue = true;
        //this.targetAlien = 
    }

    generateAlienShip(){
        //const alienShip = new Ship();
        //this.alienFleet.push(alienShip); -> used it before generateUserShip 
        //was implemented with parameter for number of ships
        return new AlienShip();

    }

    generateUserShip(hull,firepower,accuracy){
        return new UserShip(hull,firepower,accuracy);
    }

    generateMultipleShips(howMany){
        const fleet = [];
        
        for (let i=0; i< howMany; i++){
            const newAlienShip = this.generateAlienShip();
            fleet.push(newAlienShip);
        }
        return fleet;
    }

    round(ship1, ship2){
        let first = true;
        while(ship1.hull > 0 && ship2.hull > 0){ 
            console.log("Your ship's hull: " + ship1.hull, "The enemy ship's hull: " + ship2.hull)
            if(first){
                console.log("You attack aliens!")
                ship1.attack(ship2);
            }else{
                console.log("Aliens attack you")
                ship2.attack(ship1);
            }
            first = !first; // to switch between players (user/alien)
        }
        console.log(`After fight round: your hull is ${ship1.hull} and your enemy's hull is ${ship2.hull}`)
        if(ship1.hull > 0){ //If hull reaches 0 or less, the ship is destroyed
            console.log("You destroyed one alien ship!");
            this.alienFleet.pop();
            //this.alienFleet.splice(alienIndex,1); -> will use it for implementing prompt for user to choose an alien
            this.continue = window.confirm("Do you wish to attack again? Click OK to attack again. Click Cancel to retreat")

        }else{ //If hull reaches 0 or less, the ship is destroyed
            console.log("You lost to the aliens....");
            this.continue = false;
        }
    }

    battle(){
        while(this.alienFleet.length > 0 && this.userShip.hull > 0){
            if(this.continue){
                
        // Will use it later->let alienIndex = window.prompt(`Which alient do you want to attack: choose from 0 to ${this.alienFleet.length -1}`)
                this.round(this.userShip, this.alienFleet[this.alienFleet.length - 1])
            //console.log(this.alienFleet) -> for testing
                //this.round(this.userShip, this.alienFleet[alienIndex],alienIndex) -> will use it latter
                //this.round(this.userShip, this.alienFleet[this.alienFleet.length-1]) -> will use it latter
            }else{
                console.log("You have retreated successfully!")
                break
            }
        }
        if(this.alienFleet.length === 0){
            console.log("You have defeated the fleet! Return home for recovery!")
        }

    }

}



 //const game = new GameFactory();
 //console.log(game.numOfAlienShips)
 //console.log(game);
 //game.battle();

