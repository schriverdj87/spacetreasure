class SearchGridCore
{
    /*
    Grid Symbols
    =============
    P = Player
    p = Pain;
    # = Unexplored
    O = Explored Space
    S = Supplies
    $ = Sextant
    & = Sextant Enemy Location
    R = Rando Reveal
    r = Radar
    rr = Radar Pointer
    K = Krayan finder
    M = TreasureMap
    m = TreasureMap Pointer
    N = Nuke
    T = Telescope
    t = Teleport Enemy
    c = Krayan Location
    e = Explosion
    

    1 = Treasure 1 Beta's head
    2 = Treasure 2 John's sword
    3 = Treasure 3 Quantum Wrench
    4 = Treasure 4 Unicorn's Eye

    A = Enemy 1 Enemy Ship
    a = Ammo
    B = Enemy 2 Space Whale
    b = Bubble
    C = Enemy 3 Krayan
    
    G = Grid Hide

    * = mine

  Other ideas:
  - Mine buster: destroys mines within a nearby radius.

    
    
    */
    constructor()
    {
        
        this.hpMax = parameters.hpMax;
        this.hp = this.hpMax;
        this.widthArena = 11;
        this.heightArena = 11;
        this.supplyHealFactor = parameters.supplyHealFactor;//what percent of max health to heal.
        this.healinghealingfactor = parameters.healinghealingfactor;
       
        this.treasures = {
            "1":false,//Beta's head
            "2":false,//John's sword
            "3":false,//Quantum Wrench
            "4":false//Unicorn's Eye
        }

        this.treasure1 = false;
        this.treasure2 = false;
        this.treasure3 = false;
        this.treasure4 = false;
        this.inventory = {
            "0":99999,//This is the basic weapon
            "A":parameters.ammoA,
            "B":parameters.ammoB,
            "C":parameters.ammoC
        }
        this.grid = [];//The actual grid
        this.gridSeen = [];//What the player sees
        this.playerStart = this.Point(5,5);
        this.availableSpaces = [];
        this.treasureLocations = [];
        this.supplyLocations = [];
        this.enemyLocations = [];
        this.krayanLocations = [];
        this.unexploredSpaces = [];//Used when revealing the grid at the end of the game.
        this.radarArray = [];
        this.exploredSpaces = [this.playerStart];//Where the player has already been.
        this.toHide = []; //Squares to hide.
        this.nearyEnemies = []; //Used by sextant to reveal enemies.
        this.maxHide = parameters.hidePower;
        this.canMove = true;
        this.wantToGo = this.Point(-1,-1);
        this.bubbles = 0;
        this.pain = false;
        this.painDamage = parameters.painDamage;
        this.mineDMG = parameters.minePower;
        this.nukeChance = parameters.nukeChance;//If math.random is less than this it will destroy a 3x3 area.
        this.mapShowChance = parameters.mapShowChance;//If math.random is less than this the map will show you where the treasure is instead of pointing to it.
        this.mapShowLocation;//Used to store the location of where the map is indicating to the player
        this.initGridHide = false;//Whether or not the empty tiles to hide have been revealed.

        this.mapIndicators = [];//Approximate area where the treasure is.

        this.EVENT_TREASURE = "TREASURE GET!";
        this.EVENT_WIN = "THE WINNER IS YOU!";
        this.EVENT_ENEMY = "ENEMY ENCOUNTERED!";
        this.EVENT_ENEMYENEMYTURN = 'ENEMY ATTACKS!';
        this.EVENT_ENEMYPLAYERTURN = 'PLAYER\'s TURN TO ATTACK';
        this.EVENT_ENEMYDEFEATED = 'ENEMY DESTROYED!';
        this.EVENT_DIE = "GAME OVER!";
        this.EVENT_BATTLEWIN = "ENEMY DESTROYED!";
        this.EVENT_SUPPLY = "GOT SUPPLIES!";
        this.EVENT_RANDO = "RANDO REVEAL!";
        this.EVENT_RANDOEND = "rando ending...";
        this.EVENT_KFINDPRE = "PRE KRAYAN FINDER"
        this.EVENT_KFIND = "KRAYAN FINDER!";
        this.EVENT_SENSOR = "SENSOR!";
        this.EVENT_TELESCOPE = "PICK SOME TILES!";
        this.EVENT_NUKE = "IT'S THE NUKE!"//They get the nuke
        this.EVENT_NUKE1 = "Pick a sector to launch it at!"//They take the space the nuke was in. When they click the grid it revels what was there.
        this.EVENT_NUKE2 = "KA"//Replace it with an explosion.
        this.EVENT_NUKE3 = "BOOM!"//If it was a treasure end the game. Otherwise replace it with an unexplored space.
        this.EVENT_NUKEDSELF = "You blew yourself up!";//The player nuked themselves.
        this.EVENT_GRIDHIDE = "GRIDHIDE"//
        this.EVENT_SEXTANT = "SEXTANT"//Take the sextant and reveal enemy locations.
        this.EVENT_SEXTANT1 = "SEXTANT1"//Put reveal away and permit movement.
        this.EVENT_MAP = "FOUND MAP"//Take the map and reveal the nearest treasure.
        this.EVENT_MAP1 = "Map put away"//Put reveal way and permit movement.
        this.EVENT_GLUE = "Ship Glue!"//Take the glue and restore health completely.
        this.EVENT_BUBBLE = "BUBBLE!"//Bubble get!
        this.EVENT_AMMO = "AMMO!";
        this.EVENT_PAIN = "PAIN!";
        this.EVENT_TELEPORTER = "TELEPORTER!";
        this.EVENT_RADAR = "RADAR";
        this.EVENT_RADAR1 = "RADAR2";
        this.EVENT_MINE = "MINE!";

        this.currentSound = "";
        this.SND_WHALE = "WHALE";
        this.SND_DRONE = "DRONE";
        this.SND_DRONEATTACK = "DRONEATTACK";
        this.SND_SUPPLY = "SUPPLY";
        this.SND_HEAL = "HEAL";
        this.SND_TREASURE = "TREASURE";
        this.SND_BUBBLE = "BUBBLE";
        this.SND_NUKE = "NUKE!";
        this.SND_NUKELAUNCH = "LAUNCH";
        this.SND_NUKEBOOM = "KABOOM!";
        this.SND_GOODIEFIND = "YAY!";
        this.SND_BADDIEFIND = "#$@&";
        this.SND_GAMEOVER = "GAME OVER!";
        this.SND_GAMEWIN = "YOU'RE WINNER!";
        this.SND_TELEPORTER = "ENEMY TELEPORTER!";
        this.SND_ACIDNEBULA = "ACID NEBULA!";
        this.SND_PAIN = "PAIN";
        this.SND_ATTACK0 = "ATTACK0";
        this.SND_ATTACK1 = "ATTACK1";
        this.SND_ATTACK2 = "ATTACK2";
        this.SND_ATTACK3 = "ATTACK3";
        this.SND_MINE = "MINE";
        this.SND_RADAR = "RADAR";
        this.SND_AMMO = "AMMO";
        this.SND_NMEREVEAL = "SHOWING ENEMIES";
        this.SND_KRAYANREVEAL = "SHOWING KRAYANS";
        this.SND_KRAYANATTACK = "KRAYAN ATTACK";
        this.SND_KRAYAN = "KRAYAN";
        this.SND_WHALEATTACK = "WHALE ATTACK";
        this.SND_TREASUREREVEAL = "TREASURE REVEAL";
        
        

        this.placeNuked; //Holds onto the location and what was nuked.
        this.placesNuked = [];
        this.nukedTreasure = false;//If this is true it's game over.
        this.nukedSelf = false;
       

        this.killMe = false; //If true: game is completely over.
        this.xRevealEnd = 0;//Used when the game is over to reveal the grid.
        this.yRevealEnd = 0; 

        this.currentEvent = "";
        this.currentEnemy = "";

        this.enemyHealth = 5;//The health the enemies start with.
        this.br_enemyfirsthit = parameters.br_enemyfirsthit;//Enemy strikes first 
        this.br_showSupplyBoxes = parameters.br_showSupplyBoxes;//While true the supply boxes will be revealed in the grid. 


        this.nmeKeyAttack = "ATK";
        this.nmeKeyHP = "HP";
        this.nmeKeyIMA = "IM";
        this.aAttack = parameters.nmeAAttack;
        this.bAttack = parameters.nmeBAttack;
        this.cAttack = parameters.nmeCAttack;
        this.randoPause = this.Point(0,30);//Used to pause between revealing and hiding the grid.
        this.randoArray = [];//Stores the points rando reveal revealed.
        this.randoArrayFeed = [];//Stores the tiles to feed into rando array.
        this.randosToReveal = 10; //Max size of the rando array before switching event.
        this.sextantrange = parameters.nmefinderrange;
        this.sextantChance = parameters.nmefinderChance;
        this.sextantAmount = parameters.nmefinderNClosest;
        this.randoRangeChance = parameters.scannerChance;
        this.randoRangeBasic = parameters.scannerRange;
        this.randoRangeHigh = parameters.scannerRangeHigh;
        this.krayanLocatorChance = parameters.krayanlocatorChance;


        this.hints = true;//If this is on it will basically tell the player how to play the game.
        this.saying = "Welcome to Space Treasure";
        this.happy = "happy";
        this.veryhappy = "veryhappy";
        this.angry = "angry";
        this.neutral = "neutral";
        this.tutorial = "tutorial";
        this.sayingMood = this.neutral;
        this.tutorialSay = ["Find the 4 treasures to win the game!</br>","You can warp to any unexplored sector next to one you've already explored."]
        
        
        //Builds the arena
        for (var y = 0; y < this.heightArena; y++)
        {
            this.grid.push([]);
            this.gridSeen.push([]);
            for (var x = 0; x < this.widthArena; x++)
            {
                this.grid[y].push ("O");
                this.gridSeen[y].push("#");
                this.availableSpaces.push(this.Point(x,y));
                this.unexploredSpaces.push(this.Point(x,y));
                
                

            }
        }

        //Place the player.
        /*this.grid[this.playerStart.y][this.playerStart.x] = */this.gridSeen[this.playerStart.y][this.playerStart.x] = "P";
        this.removeAvailableSpace(this.playerStart.x,this.playerStart.y);
        this.RemoveFromUnexplored(this.playerStart.x,this.playerStart.y);
   

        //Place the treasures
        this.treasureLocations.push(this.putInGrid("1"));
        this.treasureLocations.push(this.putInGrid("2"));
        this.treasureLocations.push(this.putInGrid("3"));
        this.treasureLocations.push(this.putInGrid("4"));

        //Place Krayans next to a treasure

        var KrayanCampers = parameters.nmeCCampingTreasure;
        this.putInGridSurround("C","1",KrayanCampers);
        this.putInGridSurround("C","2",KrayanCampers);
        this.putInGridSurround("C","3",KrayanCampers);
        this.putInGridSurround("C","4",KrayanCampers);

        /*
        for (var a = 0; a < this.treasureLocations.length; a++)
            {
                var potentialSpawns = this.getSurroundingEmptyTiles(this.treasureLocations[a].x,this.treasureLocations[a].y);
                //Make sure it doesn't include the spawn point.
                
                var spawnLocus = this.randomFromArray(potentialSpawns);
                
                this.removeAvailableSpace(spawnLocus.x,spawnLocus.y);
    
                this.grid[spawnLocus.y][spawnLocus.x] = "C";
    
                this.enemyLocations.push(spawnLocus);
                this.krayanLocations.push(this.Point(spawnLocus.x,spawnLocus.y));
    
    
            }

        */
    
        
        

        var supplycrates = parameters.supplycrates;
        var randos = parameters.shortrangescanners;
        var klocs = parameters.krayanlocators;
        var sensors = 5;
        var nukes = parameters.nukes;
        var gridhides = parameters.hides;
        var telescopes = parameters.longrangescanners;
        var sextants = parameters.enemydetectors;
        var maps = parameters.treasurefinders;
        var glue = parameters.healing;
        var bubblestoPut = parameters.bubbles;
        var ammo = parameters.ammo;
        this.ammoGive = parameters.ammoGive;
        var pain = parameters.pain;
        var teleports = parameters.teleporters;
        var radars = parameters.radars;
        var mines = parameters.mines;
        this.radarRange = parameters.radarRange;
        this.radarChance = parameters.radarRevealChance;//If the radar result is lower than this it will reveal the negative space.
        this.radarResult = 0;
        


        this.putInGridMulti("S",supplycrates);
        this.putInGridMulti("R",randos);
        this.putInGridMulti("K",klocs);
        this.putInGridMulti("N",nukes);
        this.putInGridMulti("G",gridhides);
        this.putInGridMulti("T",telescopes);
        this.putInGridMulti("$",sextants);
        this.putInGridMulti("M",maps);
        this.putInGridMulti("+",glue);
        this.putInGridMulti("b",bubblestoPut);
        this.putInGridMulti("a",ammo);
        this.putInGridMulti("p",pain);
        this.putInGridMulti("t",teleports);
        this.putInGridMulti("r",radars);
        this.putInGridMulti("*",mines);

        //Place 2 space whales by every supply crate 

        //Place the rest of the enemies
        var nmeAs = parameters.nmeAs;
        var nmeBs = parameters.nmeBs;
        var nmeCs = parameters.nmeCs;


        this.putInGridMulti("A",nmeAs);
        this.putInGridMulti("B",nmeBs);
        this.putInGridMulti("C",nmeCs);

        //Put the camping Space Whales
        var whalesCampingSupplies = parameters.nmeBCampingSupplyCrates;

        this.putInGridSurround("B","S",whalesCampingSupplies);

        var minesCampingNMEA = parameters.minesCampingNMEA;

        //Put mines around nmeA
        this.putInGridSurround("*","A",minesCampingNMEA);



        //
        /*
        for (var c = 0; c < enemiesToPut; c++)
        {
            this.putInGrid("A");
            if (enemiesToPut % 2 == 0)
            {
                this.putInGrid("A");//Add more ebil ships.
            }
            this.putInGrid("B");
        }
        */
        

        this.setSay("Click/tap any sector next to the space sheep to move.",this.tutorial);
        

        if (["1","2","3","4"].includes(this.grid[this.playerStart.y][this.playerStart.x]) == false)
        {
            this.grid[this.playerStart.y][this.playerStart.x] = "0";
        }

        //console.log(this.PrintGrid());

      



    }

    PrintGrid()
    {
        var toSend = "";

        for (var y = 0; y < this.grid.length; y++)
        {
            for (var x = 0; x < this.grid[y].length; x++)
            {
                if (this.playerStart.x == x && this.playerStart.y == y)
                {
                    //Put the player starts position
                    toSend = toSend + "P"
                }
                else {
                    toSend = toSend + this.grid[y][x];
                }
                if (x != this.grid[y].length - 1)
                {
                    toSend = toSend + ",";
                }

            }
            toSend = toSend + "\n";
        }

        return toSend;
    }

    Point (x,y)
    {
        return {"x":x,"y":y};
    }

    PointDuplicate(fromthis)
    {
        return this.Point(fromthis.x,fromthis.y);
    }

    //Gets the angle between 2 points
    PointAngle (pt1, pt2)
    {
        var o = pt1.y - pt2.y;
        var a = pt1.x - pt2.x;
        
        var toSend = Math.atan2(o,a) * (180/Math.PI) + 180;

        return toSend;
    }

    RemoveFromPointArray(x,y,fromthis)
    {
        for (var a = 0; a < fromthis.length; a++)
        {
            if (fromthis[a].x == x && fromthis[a].y == y)
            {
                fromthis.splice(a,1);
                return this.Point(x,y);
            }
        }
    }

    //Returns an array of points with tile types within a certain distance of a point
    //fromthis = a point
    //thisfar = a distance
    GetWithinDistance(fromthis,thisfar)
    {
       var toSend = [];
        for (var y = 0; y < this.grid.length; y++)
        {
            for (var x = 0; x < this.grid[y].length; x++)
            {
                var length = Math.sqrt(Math.pow(fromthis.x - x,2) + Math.pow(fromthis.y - y,2));
                if (length <= thisfar)
                {
                    toPut = this.Point(x,y);
                    toPut["z"] = this.grid[y][x];
                    toPut["len"] = length;
                    toSend.push(toPut);
                }
            }
        }

        return toSend;
    }

    GetWithinDistanceOmitAlwaysVisible(fromthis,thisfar)
    {
       var toSend = this.GetWithinDistance(fromthis,thisfar);
       

       for (var a = toSend.length -1; a > -1; a--)
        {
            if (this.gridSeen[toSend[a].y][toSend[a].x] != "#")
            {
                toSend.splice(a,1);
            }
        }

        return toSend;
    }

    //Returns what is asked for in look for these
    /*
        fromthis = point
        thisfar = number
        lookforthese = array
    */
    FindWithinDistance(fromthis,thisfar,lookforthese)
    {
        var toSend = []
        var searchme = this.GetWithinDistance(fromthis,thisfar);
        for (var a = 0; a < searchme.length; a++)
        {
            if (lookforthese.includes(searchme[a]["z"]))
            {
                toSend.push(searchme[a]);
            }
        }

        return toSend;
    }

    
    FindNClosest(fromThis,lookforthese,thisMany)
    {
        var raw = this.FindWithinDistance(fromThis,9001,lookforthese);
        

        if (raw.length <= thisMany)
        {
            return raw;
        }

        var toSend = [];

        while (toSend.length < thisMany)
        {
            var winningIndex = 0;
            var winningLength = 9001;
            
            for (var a = 0; a < raw.length; a++)
            {
                if (raw[a]["len"] < winningLength)
                {
                    winningIndex = a;
                    winningLength = raw[a]["len"];
                }
            }

            toSend.push(raw.splice(winningIndex,1)[0]);
        }

        return toSend;
        
    }

    

    

    //Takes a single point and an array of points to return the nearest.
    //mainPoint = point
    //checkThese = array of points
    NearestPoint (mainPoint,checkThese)
    {
        var winningIndex = 0;
        var winningLength = 9001;

        for (var a = 0; a < checkThese.length;a++)
        {
            var length = Math.sqrt(Math.pow(mainPoint.x - checkThese[a].x,2) + Math.pow(mainPoint.y - checkThese[a].y,2));

            
            if (length <= winningLength)
            {
                    winningIndex = a;
                    winningLength = length;
            }
        }

        return checkThese[winningIndex];
    }

    //For testing purposes
    GetWithinDistanceTest (fromthis,thisfar)
    {
        var changeme = this.GetWithinDistanceOmitAlwaysVisible(fromthis,thisfar);

        for (var a = 0; a < changeme.length; a++)
        {
            this.gridSeen[changeme[a].y][changeme[a].x] = "c";
        }
    }

    RemoveFromUnexplored(x,y)
    {
        for (var a = 0; a < this.unexploredSpaces.length; a++)
        {
            if (this.unexploredSpaces[a]["x"] == x && this.unexploredSpaces[a]["y"] == y)
            {
                //Also adds it to explored.
                this.exploredSpaces.push(this.unexploredSpaces.splice(a,1)[0]);
                return this.Point(this.exploredSpaces[this.exploredSpaces.length-1].x,this.exploredSpaces[this.exploredSpaces.length-1].y);
            }
        }
    }

    //Gets all instances of a particular symbol from the grid.
    GetAllTheseFromGrid(Symbol)
    {
       var toSend = []; 
        for (var y = 0; y < this.grid.length; y++)
            {
                for (var x = 0; x < this.grid[y].length; x++)
                {
                    if (this.grid[y][x] == Symbol)
                    {
                        var toPut = this.Point(x,y);
                        toPut["z"] = Symbol
                        toSend.push(toPut);
                    }
                }
            }

        return toSend;
    }

    //Gets all instances of a particular 
    GetAllTheseFromSeenGrid(Symbol)
    {
       var toSend = []; 
        for (var y = 0; y < this.gridSeen.length; y++)
            {
                for (var x = 0; x < this.gridSeen[y].length; x++)
                {
                    if (this.gridSeen[y][x] == Symbol)
                    {
                        var toPut = this.Point(x,y);
                        toPut["z"] = Symbol
                        toSend.push(toPut);
                    }
                }
            }

        return toSend;
    }
    

    //Attacks the enemy (provided there is one), returns true if it is successful on account of having enough ammo..
    attack(withthis)
    {
        if (this.hp > 0 && this.currentEvent == this.EVENT_ENEMYPLAYERTURN && this.inventory[withthis] > 0)
        {
            this.inventory[withthis]--;

            
            switch(withthis)
            {
                case "0": this.currentSound = this.SND_ATTACK0; break;
                case "A": this.currentSound = this.SND_ATTACK1; break;
                case "B": this.currentSound = this.SND_ATTACK2; break;
                case "C": this.currentSound = this.SND_ATTACK3; break;
            }


            

            //Weapon match! Insta-kill!
            if (withthis == this.currentEnemy[this.nmeKeyIMA])
            {
                this.currentEnemy[this.nmeKeyHP] = 0;
                this.setSay("One-hit KO!",this.veryhappy);
            }
            //Weapon is not ideal
            else if (withthis != "0")
            {
                this.currentEnemy[this.nmeKeyHP] = Math.max(0,this.currentEnemy[this.nmeKeyHP] - 3);
                this.setSay("Hint: Each weapon corresponds to a specific enemy that it can one-shot.",this.tutorial);
                
            }
            else //Weapon is basic weapon.
            {
                this.currentEnemy[this.nmeKeyHP] = Math.max(0,this.currentEnemy[this.nmeKeyHP] - 2);
                this.setSay("Hint: You can restore your ammo by collecting supply crates.",this.tutorial);
            }

            //If the current enemy is still alive it will fight back.
            if (this.currentEnemy[this.nmeKeyHP] > 0)
            {
                //this.attackPlayer(this.currentEnemy[this.nmeKeyAttack]);
                this.currentEvent = this.EVENT_ENEMYENEMYTURN;
            }
            else
            {
                //Check if the location is in Krayan list and remove it if so.

                for (var a = 0; a < this.krayanLocations.length; a++)
                {
                    if (this.krayanLocations[a].x == this.wantToGo.x && this.krayanLocations[a].y == this.wantToGo.y)
                    {
                        this.krayanLocations.splice(a,1);
                    }
                }


                this.currentEvent = this.EVENT_BATTLEWIN;
                
            }
        }
        else
        {
            if (this.inventory[withthis] == 0)
            {
                this.setSay("Out of ammo!",this.angry);
            }
            else if ([this.EVENT_ENEMY,this.EVENT_ENEMYDEFEATED,this.EVENT_ENEMYENEMYTURN,this.EVENT_ENEMYPLAYERTURN].includes(this.currentEvent) == false )
            {
                this.setSay("There's nothing to fire at...",this.angry);
            }
            return false;
        }
        
            return true;
        
    }

    //Harms the player.
    attackPlayer(amt)
    {
        if (this.bubbles > 0)
        {
            this.bubbles--;
            return false;
        }

        this.hp = Math.max(0,this.hp - amt);

        //GAME OVER!
        if (this.hp <= 0)
        {
            this.currentEvent = this.EVENT_DIE;
            
        }
        return true;
    }

    //Add 1 to each weapon, restore health.
    supplyGet()
    {
        this.inventory["A"]++;
        this.inventory["B"]++;
        this.inventory["C"]++;
        this.hp = Math.min(this.hpMax,Math.round(this.hp + this.hpMax * this.supplyHealFactor));
    }

    //Attempt to move, returns true if successful
    move(x,y)
    {
    
        //Reveal 3x3 on the grid somewhere.
        if (this.currentEvent == this.EVENT_TELESCOPE)
        {
            this.randoReveal3(x,y);
            this.currentSound = this.SND_RADAR;
            return false;    
        }
        else if (this.currentEvent == this.EVENT_NUKE1)//Reveal and store the location.
        {
            
            if (this.gridSeen[y][x] != "#" && this.gridSeen[y][x] != "P")
            {
                this.setSay("It won't target explored space!",this.angry);
                return false;
            }

            var playerLocation = this.LocatePlayer();
            this.placeNuked = this.Point(x,y);
            this.placesNuked = [];
            this.placesNuked.push(this.placeNuked);

            //TODO logic for multiple nuke locations
            if (Math.random() <= this.nukeChance)
            { 
                this.nukeSurroundingTiles(x,y);
            }
            
            for (var a = 0; a < this.placesNuked.length; a++)
            {
            if (this.placesNuked[a].x != playerLocation.x || this.placesNuked[a].y != playerLocation.y)//Do not try to "reveal" player location
            {
                this.gridSeen[this.placesNuked[a].y][this.placesNuked[a].x] = this.grid[this.placesNuked[a].y][this.placesNuked[a].x];
                this.placesNuked[a]["z"] = this.grid[this.placesNuked[a].y][this.placesNuked[a].x];
                
                
            }
            else
            {
                this.placesNuked[a]["z"] = "P";
                
            }
            this.RemoveFromUnexplored(this.placesNuked[a].x,this.placesNuked[a].y);
            this.RemoveFromPointArray(this.placesNuked[a].x,this.placesNuked[a].y,this.enemyLocations);
            this.RemoveFromPointArray(this.placesNuked[a].x,this.placesNuked[a].y,this.krayanLocations);
            //Let the player nuke themselves.
            /*
            if (x == playerLocation.x && y == playerLocation.y)
            {
                this.gridSeen[y][x] = "e";
                this.currentEvent = this.EVENT_NUKEDSELF;
                this.hp = 0;
                return false;
            }
            */

           
            }
            this.currentEvent = this.EVENT_NUKE2;
            this.currentSound = this.SND_NUKELAUNCH;
            return false;

        }
                
        //Check if the player can move to begin with
        if (this.canMove == false || this.currentEvent == this.EVENT_DIE)
        {
            return false;
        }

        

        var moveTo = this.Point(x,y);
        this.RemoveFromUnexplored(x,y);
        //Check and see if it can be moved to
        var surroundingAvailableTiles = this.getSurroundingAvailableTiles(x,y);
        
        var oldLocation = this.LocatePlayer();

        //Check and see if it has adjacent tiles that can be moved to
        if (surroundingAvailableTiles.length == 0)
        {
            return false;
        }

        //logic for things to move to.
        var symbolAt = this.grid[y][x];
        this.wantToGo = this.Point(x,y);//This persists moveTo beyond the scope of this method.
        var nearby = this.randomFromArray(surroundingAvailableTiles);

        //Basically, don't move if you don't need to.
        for (var a = 0; a < surroundingAvailableTiles.length; a++)
        {
            if (surroundingAvailableTiles[a].x == oldLocation.x && surroundingAvailableTiles[a].y == oldLocation.y)
            {
                nearby = surroundingAvailableTiles[a];
            }
        }

        if (symbolAt == "O" )
        {
            //Empty space, good time for tutorial!
            this.tutorialSay.length > 0 ? this.setSay(this.tutorialSay.splice(0,1)[0],this.tutorial): this.setSay("",this.tutorial);
        }

        //Found teasure :D
        if (["1","2","3","4"].includes(symbolAt))
        {
            var treasureIndex = {"1":"Beta's Head!","2":"John Starrunner's Laser Sword!","3":"The Sonic Wrench!","4":"Unicorn's Eye!"}

            this.canMove = false;
            this.gridSeen[y][x] = symbolAt;
            this.RemoveFromPointArray(x,y,this.treasureLocations);
            moveTo = nearby;
            this.currentEvent = this.EVENT_TREASURE;

            this.currentSound = this.SND_TREASURE;
            this.setSay("You found " + treasureIndex[symbolAt],this.veryhappy);
            
        }
//Found supply crate
if (symbolAt == "S")
    {
        this.canMove = false;
        this.gridSeen[y][x] = symbolAt;
        
        this.currentEvent = this.EVENT_SUPPLY;
        this.RemoveFromPointArray(moveTo.x,moveTo.y,this.supplyLocations);
        moveTo = nearby;

        this.currentSound = this.SND_GOODIEFIND;
        this.setSay("Supply crate!",this.happy);
        
        
    }

//Found sextant
if (symbolAt == "$")
{
    this.canMove = false;
    this.gridSeen[y][x] = symbolAt;
    moveTo = nearby;
    this.currentEvent = this.EVENT_SEXTANT;
    var aryBaddies = ["A","B","C"];
    this.nearyEnemies = this.FindWithinDistance(this.wantToGo,this.sextantrange,aryBaddies);
    //Show nearest N enemies instead.
    if (Math.random() <= this.sextantChance)
    {
        this.nearyEnemies = this.FindNClosest(this.wantToGo,aryBaddies,this.sextantAmount);
      
    }

    this.currentSound = this.SND_GOODIEFIND;
    this.setSay("It's an enemy finder!",this.happy);
}

//Found map
if (symbolAt == "M")
    {
        this.canMove = false;
        this.gridSeen[y][x] = symbolAt;
        moveTo = nearby;
        this.currentEvent = this.EVENT_MAP;

        this.currentSound = this.SND_GOODIEFIND;
        this.setSay("It's a treasure map!",this.happy);
    }

//Found rando reveal
if (symbolAt == "R")
    {
        this.canMove = false;
        this.gridSeen[y][x] = symbolAt;
        moveTo = nearby;
        this.currentEvent = this.EVENT_RANDO;
        this.randoArray = [];
        this.randoIndex = 0;
        this.randoReveal2(0,0);

        this.currentSound = this.SND_GOODIEFIND;
        this.setSay("It's a space-radar!",this.happy);

        
    }
    //Found Telescope
if (symbolAt == "T")
        {
            this.canMove = false;
            this.gridSeen[y][x] = symbolAt;
            moveTo = nearby;
            this.randoArray = [];
            this.randoIndex = 0;
            this.randoReveal3(0,0);

            this.currentSound = this.SND_GOODIEFIND;
            this.setSay("It's a long-range scanner! Click a sector to see what's there!",this.happy);
            
        }


//Found krayan finder
if (symbolAt == "K")
{
    this.canMove = false;
    this.gridSeen[y][x] = symbolAt;
    moveTo = nearby;
    this.krayanLocations = this.GetAllTheseFromGrid("C");
    this.currentEvent = this.EVENT_KFINDPRE;
    this.setSay("It's a krayan detector!",this.happy);
    this.currentSound = this.SND_GOODIEFIND;

    
}

//Found NUKE
if (symbolAt == "N")
{
    this.canMove = false;
    this.gridSeen[y][x] = symbolAt;
    moveTo = nearby;
    this.currentEvent = this.EVENT_NUKE;
    this.currentSound = this.SND_NUKE;
    this.setSay("It's a nuke!",this.veryhappy);
}

//Found Grid Hide
if (symbolAt == "G")
{
    this.canMove = false;
    this.gridSeen[y][x] = symbolAt;
    moveTo = nearby;
    this.currentEvent = this.EVENT_GRIDHIDE;
    this.initGridHide = false;
   
    /*
    while (this.toHide.length < Math.min(this.exploredSpaces.length,this.maxHide))
    {
        var hideThis = this.randomFromArray(this.exploredSpaces,true);
       
        this.unexploredSpaces.push(this.Point(hideThis.x,hideThis.y));
        this.toHide.push(hideThis);
    }

    //Remove what shouldn't be there, Player and supply boxes.
    
    //this.RemoveFromPointArray(this.wantToGo.x,this.wantToGo.y,this.toHide);
    this.RemoveFromPointArray(this.wantToGo.x,this.wantToGo.y,this.toHide);
    this.RemoveFromPointArray(this.wantToGo.x,this.wantToGo.y,this.unexploredSpaces);

    for (var a = 0; a < this.supplyLocations.length; a++)
    {
        this.RemoveFromPointArray(this.supplyLocations[a].x,this.supplyLocations[a].y,this.toHide);
    }
    */

    this.currentSound = this.SND_BADDIEFIND;

    this.setSay("Acidic Nebula!",this.angry);

}

    //Found Ship Glue
    if (symbolAt == "+")
    {
        this.canMove = false;
        this.gridSeen[y][x] = symbolAt;
        moveTo = nearby;
        this.currentEvent = this.EVENT_GLUE;
        
        this.currentSound = this.SND_GOODIEFIND;
        this.setSay("Healing Nebula!",this.happy);
    }

    //Found Bubble
    if (symbolAt == "b")
    {
        this.canMove = false;
        this.gridSeen[y][x] = symbolAt;
        moveTo = nearby;
        this.currentEvent = this.EVENT_BUBBLE;

        this.currentSound = this.SND_GOODIEFIND;
        this.setSay("Bubble gate!",this.happy);
    }

    //Found Ammo
    if (symbolAt == "a")
        {
            this.canMove = false;
            this.gridSeen[y][x] = symbolAt;
            moveTo = nearby;
            this.currentEvent = this.EVENT_AMMO;

            this.currentSound = this.SND_GOODIEFIND;
            this.setSay("Ammo!",this.happy);
        }

    //Found pain
    if (symbolAt == "p")
    {
        this.canMove = false;
            this.gridSeen[y][x] = symbolAt;
            moveTo = nearby;
            this.currentEvent = this.EVENT_PAIN;
            this.currentSound = this.SND_BADDIEFIND;
            this.setSay("It's a nebula of pain!",this.angry);
    }

    //Enemy Teleport
    if (symbolAt == "t")
        {
            this.canMove = false;
            this.gridSeen[y][x] = symbolAt;
            moveTo = nearby;
            this.currentEvent = this.EVENT_TELEPORTER;
            this.nearyEnemies = this.FindWithinDistance(this.wantToGo,this.sextantrange,["A","B","C"]);
            this.currentSound = this.SND_BADDIEFIND;
            this.setSay("It's an enemy teleporter!",this.angry);
        }

        if (symbolAt == "*")
            {
                this.canMove = false;
                this.gridSeen[y][x] = symbolAt;
                moveTo = nearby;
                this.currentEvent = this.EVENT_MINE;
                
                this.currentSound = this.SND_BADDIEFIND;
                this.setSay("MINE!",this.angry);
            }
        
        //Radar/weak sensor

        if (symbolAt == "r")
        {
            this.canMove = false;
            this.gridSeen[y][x] = symbolAt;
            moveTo = nearby;
            this.radarResult = Math.random();
            this.currentEvent = this.EVENT_RADAR;
            this.radarArray = this.GetWithinDistanceOmitAlwaysVisible(this.wantToGo,this.radarRange);
            this.currentSound = this.SND_GOODIEFIND;
            if (this.radarResult >= this.radarChance)//Shows non-empty spaces.
            {
                for (var a = this.radarArray.length - 1; a > -1; a--)
                {
                    if (this.radarArray[a].z == "O")
                    {
                        this.radarArray.splice(a,1);
                    }
                }
            }
            else//Clears empty spaces.
            {

                    for (var a = this.radarArray.length - 1; a > -1; a--)
                    {
                        if (this.radarArray[a].z != "O")
                        {
                            this.radarArray.splice(a,1);
                        }
                        else
                        {
                            this.RemoveFromPointArray(this.radarArray[a].x,this.radarArray[a].y,this.unexploredSpaces);
                            this.exploredSpaces.push(this.radarArray[a]);
                        }
                    }
                
            }

            this.setSay("Space radar!",this.neutral);
        }

        

        //Found Enemy
        if (["A","B","C"].includes(symbolAt))
        {

            this.canMove = false;
            this.gridSeen[y][x] = symbolAt;
            moveTo = nearby;
            this.currentEvent = this.EVENT_ENEMY;

            this.setEnemy(symbolAt);
            


            var nmeIndex = {"A":"fighter drone","B":"space whale","C":"Krayan"}

            var stringToPut = "It's a " + nmeIndex[symbolAt] + "!";
            var moodToput = this.angry;
            
            stringToPut = stringToPut + " Use the weapon buttons to fight back!";
            
            //Set the appropriate sound.
            if (symbolAt == "A")
            {
                this.currentSound = this.SND_DRONE;
            }
            else if (symbolAt == "B")
            {
                this.currentSound = this.SND_WHALE;
            }
            else if (symbolAt == "C")
            {
                this.currentSound = this.SND_KRAYAN;
            }

            this.setSay(stringToPut,moodToput);

        }
       

        

        //Moving player
        
        this.gridSeen[oldLocation["y"]][oldLocation["x"]] = "O";
        this.gridSeen[moveTo.y][moveTo.x] = "P";


        //Don't make it look like there's a pause if it was visible to beign with.
        if (this.br_showSupplyBoxes == true && this.currentEvent == this.EVENT_SUPPLY) 
            {

                this.crank();
            }

        if (this.pain == true && ["A","B","C"].includes(symbolAt) == false)
        {
            this.attackPlayer(this.painDamage);
        }

        return true;
    }

    //Sets up an array of indicators of where the nearest treasure might be.
    setupTreasureApprox(x,y)
    {
        var centralPoint = this.Point(x,y);
        
        //Offset the approximate location
        var offSet = this.Point(9001,9001);

        while ((offSet.y + centralPoint.y) > this.heightArena || (offSet.y + centralPoint.y) < 0)
        {
            offSet.y = Math.round((Math.random()*2) -1);
        }

        while ((offSet.x + centralPoint.x) > this.widthArena || (offSet.x + centralPoint.x) < 0)
            {
                offSet.x = Math.round((Math.random()*2) -1);
            }

        

        //Get an area
        this.mapIndicators = this.GetWithinDistance(this.Point(centralPoint.x + offSet.x,centralPoint.y + offSet.y),1.5);

        

        //Take out the "always visible squares"
        for (var a = this.mapIndicators.length - 1; a > -1; a--)
        {
            if (this.gridSeen[this.mapIndicators[a].y][this.mapIndicators[a].x] != "#")
            {
                this.mapIndicators.splice(a,1);
            }
            else
            {
                this.gridSeen[this.mapIndicators[a].y][this.mapIndicators[a].x] = "m";
            }
        }

       
    }

    //Picks random tiles to reveal all over the board.
    randoReveal1()
    {
        this.randoArrayFeed = [];
        while (this.randoArrayFeed.length < Math.min(this.randosToReveal,this.unexploredSpaces.length))
        {
            var randPoint = this.randomFromArray(this.unexploredSpaces,true);
            this.unexploredSpaces.push(this.Point(randPoint.x,randPoint.y));
            this.randoArrayFeed.push(randPoint);

        }
       
        
    }

    //Picks all adjacent tiles. 1/5 chance to show the adjacent 24 tiles.
    randoReveal2()
    {
        this.randoArrayFeed = this.GetWithinDistanceOmitAlwaysVisible(this.wantToGo,Math.random() <= this.randoRangeChance ? this.randoRangeHigh:this.randoRangeBasic);


 
    }

    //Reveals 9 tiles wherever the player clicks
    randoReveal3(x,y)
    {
        if (this.currentEvent != this.EVENT_TELESCOPE)
        {
            this.currentEvent = this.EVENT_TELESCOPE;
        }
        else
        {
            this.randoArrayFeed = this.GetWithinDistanceOmitAlwaysVisible(this.Point(x,y),Math.random() <= this.randoRangeChance ? this.randoRangeHigh:this.randoRangeBasic);
            this.currentEvent = this.EVENT_RANDO;
        }
    }

    LocatePlayer()
    {
        for (var y = 0; y < this.heightArena; y++)
        {
            for (var x = 0; x < this.widthArena; x++)
            {
                if (this.gridSeen[y][x] == "P")
                {
                    return (this.Point(x,y));
                }
            }
        }
    }

    //Reveals the location of all Krayans
    kDetect1()
    {
        for (var a = 0; a < this.krayanLocations.length; a++)
            {
                this.gridSeen[this.krayanLocations[a].y][this.krayanLocations[a].x] = "c";
            }
    }

    //Reveals the location of the closest krayan
    kDetect2()
    {
        if (this.krayanLocations.length != 0)
        {
        var closestKrayan = this.NearestPoint(this.wantToGo,this.krayanLocations);
        this.gridSeen[closestKrayan.y][closestKrayan.x] = "c";}
    }

    //Gets all surrounding O tiles within the grid. Used to place Krayans around treasure.
    getSurroundingEmptyTiles(x,y)
    {
        var toSend = [];
        var countsAsAvailable = ["O"];


        //NW
        if (y - 1 >= 0 && x - 1 >= 0)
        {
            var checky = this.grid[y - 1][x - 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x - 1,y - 1));
            }

        }
        //N
        if (y - 1 >= 0)
        {
            var checky = this.grid[y - 1][x];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x,y - 1));
            }

        }


        //NE
        if (y - 1 >= 0 && x + 1 <= this.widthArena - 1)
        {
            var checky = this.grid[y - 1][x + 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x + 1,y - 1));
            }

        }

        //E
        if (x + 1 <= this.widthArena - 1)
        {
            var checky = this.grid[y][x + 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x + 1,y));
            }

        }


        //SE
        if (y + 1 < this.heightArena && x + 1 < this.widthArena)
        {
            var checky = this.grid[y + 1][x + 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x + 1,y + 1));
            }

        }


        //S
        if (y + 1 < this.heightArena)
        {
            var checky = this.grid[y + 1][x];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x,y + 1));
            }

        }
        

        //SW

        if (y + 1 < this.heightArena && x - 1 >= 0)
        {
            var checky = this.grid[y + 1][x - 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x - 1,y + 1));
            }

        }

        //W

        if (x - 1 >= 0)
        {
            var checky = this.grid[y][x - 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x - 1,y));
            }

        }

        return toSend;
    }

    //Gets surrounding previously explored tiles that can be seen. Used to calculate where the ship is allowed to move to.
    getSurroundingAvailableTiles(x,y)
    {
        var toSend = [];
        var countsAsAvailable = ["P","O"];

        //Player's already there, return empty.
        if (this.gridSeen[y][x] == "P")
        {
            return toSend;
        }

        //NW
        if (y - 1 >= 0 && x - 1 >= 0)
        {
            var checky = this.gridSeen[y - 1][x - 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x - 1,y - 1));
            }

        }
        //N
        if (y - 1 >= 0)
        {
            var checky = this.gridSeen[y - 1][x];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x,y - 1));
            }

        }


        //NE
        if (y - 1 >= 0 && x + 1 <= this.widthArena - 1)
        {
            var checky = this.gridSeen[y - 1][x + 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x + 1,y - 1));
            }

        }

        //E
        if (x + 1 <= this.widthArena - 1)
        {
            var checky = this.gridSeen[y][x + 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x + 1,y));
            }

        }


        //SE
        if (y + 1 < this.heightArena && x + 1 < this.widthArena)
        {
            var checky = this.gridSeen[y + 1][x + 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x + 1,y + 1));
            }

        }


        //S
        if (y + 1 < this.heightArena)
        {
            var checky = this.gridSeen[y + 1][x];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x,y + 1));
            }

        }
        

        //SW

        if (y + 1 < this.heightArena && x - 1 >= 0)
        {
            var checky = this.gridSeen[y + 1][x - 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x - 1,y + 1));
            }

        }

        //W

        if (x - 1 >= 0)
        {
            var checky = this.gridSeen[y][x - 1];

            //Is it an empty square
            if (countsAsAvailable.includes(checky))
            {
                toSend.push(this.Point(x - 1,y));
            }

        }

        return toSend;
    }

    nukeSurroundingTiles(x,y)
    {
        var toSend = [];
        var countsAsAvailable = [];

        this.placesNuked[0]["0"] = "c";

        //NW
        if (y - 1 >= 0 && x - 1 >= 0)
        {
            
            toPut = this.Point(x - 1, y - 1);
            toPut["0"] = "nw";
            this.placesNuked.push(toPut);
            

        }
        //N
        if (y - 1 >= 0)
        {
            toPut = this.Point(x, y - 1);
            toPut["0"] = "n";
            this.placesNuked.push(toPut);

        }


        //NE
        if (y - 1 >= 0 && x + 1 <= this.widthArena - 1)
        {
            toPut = this.Point(x + 1, y - 1);
            toPut["0"] = "ne";
            this.placesNuked.push(toPut);
        }

        //E
        if (x + 1 <= this.widthArena - 1)
        {
            

            toPut = this.Point(x + 1, y);
            toPut["0"] = "e";
            this.placesNuked.push(toPut);

        }


        //SE
        if (y + 1 < this.heightArena && x + 1 < this.widthArena)
        {

            toPut = this.Point(x + 1, y + 1);
            toPut["0"] = "se";
            this.placesNuked.push(toPut);

        }


        //S
        if (y + 1 < this.heightArena)
        {

            toPut = this.Point(x , y + 1);
            toPut["0"] = "s";
            this.placesNuked.push(toPut);

        }
        

        //SW

        if (y + 1 < this.heightArena && x - 1 >= 0)
        {
          

            toPut = this.Point(x - 1, y + 1);
            toPut["0"] = "sw";
            this.placesNuked.push(toPut);

        }

        //W

        if (x - 1 >= 0)
        {
            var checky = this.gridSeen[y][x - 1];

            toPut = this.Point(x - 1, y);
            toPut["0"] = "w";
            this.placesNuked.push(toPut);

        }

        
    }

    //Removes from the available space grid.
    removeAvailableSpace(x,y)
    {
        for (var a = 0; a < this.availableSpaces.length; a++)
        {

            if (this.availableSpaces[a]["x"] == x && this.availableSpaces[a]["y"] == y)
            {
                
                return this.availableSpaces.splice(a,1)[0];
            }
        }
    }


    //to Put should be a single letter.
    putInGrid(toPut)
    {
        var gridTile = this.randomFromArray(this.availableSpaces,true);

        //Keep supplies away from 1,1. This square is reserved for dumping all the images.
        if (toPut == "S" && gridTile.x == 1 && gridTile.y == 1)
        {
            gridTile = this.randomFromArray(this.availableSpaces,true);
        }

        this.putInGridHereSpecifically(toPut,gridTile.x,gridTile.y);
        /*this.grid[gridTile.y][gridTile.x] = toPut;
        if (toPut == "S")
        {
            if (this.br_showSupplyBoxes == true)
            {
                this.gridSeen[gridTile.y][gridTile.x] = toPut;
                this.RemoveFromUnexplored(gridTile.x,gridTile.y);
            }
            this.supplyLocations.push(this.Point(gridTile.x,gridTile.y));
        }
        else if (["A","B","C"].includes(toPut))//special handling for enemies.
        {
            this.enemyLocations.push(this.Point(gridTile.x,gridTile.y));
        }*/
        return gridTile;

    }

    //Puts in the grid in a specific location.
    putInGridHereSpecifically(toPut,x,y)
    {
        var gridTile = this.Point(x,y);
        this.RemoveFromPointArray(x,y,this.availableSpaces);
        this.grid[gridTile.y][gridTile.x] = toPut;
        if (toPut == "S")
        {
            if (this.br_showSupplyBoxes == true)
            {
                this.gridSeen[gridTile.y][gridTile.x] = toPut;
                this.RemoveFromUnexplored(gridTile.x,gridTile.y);
            }
            this.supplyLocations.push(this.Point(gridTile.x,gridTile.y));
        }
        else if (["A","B","C"].includes(toPut))//special handling for enemies.
        {
            this.enemyLocations.push(this.Point(gridTile.x,gridTile.y));

            if (toPut == "C")
                {
                    this.krayanLocations.push(this.Point(gridTile.x,gridTile.y));
                }
        }
        return gridTile;

    }

    //Puts theseMany toPuts aroundThese. 
    //toPut = String
    //aroundThese = String 
    //theseMany = number
    putInGridSurround(toPut,aroundThese,theseMany)
    {
        var aroundTheses = this.GetAllTheseFromGrid(aroundThese);

        for (var a = 0; a < aroundTheses.length; a++)
        {
            
            var surrounding = this.getSurroundingEmptyTiles(aroundTheses[a]["x"],aroundTheses[a]["y"]);


            //Whittles down the surrounding tiles to the number of "theseMany"
            while (surrounding.length > theseMany)
                {
                    this.randomFromArray(surrounding,true);
                }

            for (var b = 0; b < surrounding.length; b++)
            {
                this.putInGridHereSpecifically(toPut,surrounding[b].x,surrounding[b].y);
                
            }
        }
    }

    //Returns an array of what was sent.
    putInGridMulti(toPut,thisMany)
    {
        var toSend = []
        var counter = thisMany
        if (counter < 0) {console.log("You almost caused a runaway loop in putInGridMulti, Moron!"); return [];}
        
        while (counter > 0)
        {
            toSend.push(this.putInGrid(toPut));
            counter--;
        }

        return toSend;


    }

    //Picks a random number from the array. If remove after is true then it takes it out.
    randomFromArray(fromThis,RemoveAfter)
    {
        //Return undefined if the list is empty.
        if (fromThis.length == 0)
        {
            return undefined;
        }

        var randIndex = Math.round(Math.random() * (fromThis.length - 1));
        var toSend = fromThis[randIndex];

        if (RemoveAfter == true)
        {
            fromThis.splice(randIndex,1);
        }

        return toSend;

    }

    //Set Enemy
    setEnemy(toThis)
    {
        if (toThis == "A")
        {
            this.currentEnemy = {"IM":"A","HP":this.enemyHealth,"ATK":this.aAttack};
        }

        if (toThis == "B")
        {
            this.currentEnemy = {"IM":"B","HP":this.enemyHealth,"ATK":this.bAttack};
        }

        if (toThis == "C")
        {
            this.currentEnemy = {"IM":"C","HP":this.enemyHealth,"ATK":this.cAttack};
        }
    }

    

    crank()
    {
        var toSend = [];


        if (this.currentEvent == this.EVENT_TREASURE)
        {
            this.treasures[this.grid[this.wantToGo.y][this.wantToGo.x]] = true;
            var playerCurrentLocation = this.LocatePlayer();
            //Move out of current spot.
            this.grid[this.wantToGo.y][this.wantToGo.x] = "O"
            this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P"
            this.grid[playerCurrentLocation.y][playerCurrentLocation.x] = this.gridSeen[playerCurrentLocation.y][playerCurrentLocation.x] = "O";
            //Take the new spot.
            /*this.grid[this.wantToGo.y][this.wantToGo.x] = */this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P";

            //YOU'RE WINNER!
            if (this.treasures["1"] == true && this.treasures["2"] == true && this.treasures["3"] == true && this.treasures["4"] == true)
            {
                this.currentEvent = this.EVENT_WIN;
                this.grid[this.wantToGo.y][this.wantToGo.x] = "P"; 
            }
            else
            {
                this.canMove = true;
                this.currentEvent = "";
            }


        }
        else if (this.currentEvent == this.EVENT_SUPPLY)
            {
                this.takeTheThing();
                this.supplyGet();

                this.setSay("The supply crate had ammo and food!",this.happy);
                this.currentEvent = "";
                this.currentSound = this.SND_SUPPLY;
                this.canMove = true;
                
            }
        else if (this.currentEvent == this.EVENT_RANDO)
        {   

            var randPoint = this.randomFromArray(this.randoArrayFeed,true);
            
            if (randPoint + "" != "undefined")
            {
                this.gridSeen[randPoint.y][randPoint.x] = this.grid[randPoint.y][randPoint.x];
                this.randoArray.push(randPoint);
            }
            if (this.randoArrayFeed.length == 0)//Reveal the number of random spaces to reveal or the remaining spaces, whichever is smaller.
            {
                this.currentEvent = this.EVENT_RANDOEND;
                this.randoPause.x = this.randoPause.y;
            }

            this.setSay("Sectors revealed!",this.happy);
            this.currentSound = this.SND_RADAR;

        }
        else if (this.currentEvent == this.EVENT_RANDOEND)
        {
            if (this.randoPause.x > 0)
            {
                
                this.randoPause.x = this.randoPause.x - 1;
            }
            else
            {
                if (this.randoArray.length != 0)
                {
                    var toHide = this.randomFromArray(this.randoArray,true);
                    this.gridSeen[toHide.y][toHide.x] = "#";
                }
                if (this.randoArray.length == 0)
                {
                    this.currentEvent = "";
                    var playerCurrentLocation = this.LocatePlayer();
                    this.grid[this.wantToGo.y][this.wantToGo.x] = "O"
                    this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P"
                    this.grid[playerCurrentLocation.y][playerCurrentLocation.x] = this.gridSeen[playerCurrentLocation.y][playerCurrentLocation.x] = "O";
                    //Take the new spot.
                    /*this.grid[this.wantToGo.y][this.wantToGo.x] = */this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P";
                    this.canMove = true;
                }
            }
        }

        else if (this.currentEvent == this.EVENT_WIN || this.currentEvent == this.EVENT_DIE)
        {

            //Player lost,
            if (this.currentEvent == this.EVENT_DIE)
                {
                    this.currentSound = this.SND_GAMEOVER;
                    this.SND_GAMEOVER = "";// Make sure the sound doesn't fire off again.
                }

            //End sequence is complete
            if (this.gearReveal2() == true)
            {
                this.killMe = true;

                
            }
            if (this.currentEvent == this.EVENT_WIN)
            {
                this.setSay("YOU WIN!",this.veryhappy);
                this.currentSound = this.SND_GAMEWIN;
                    this.SND_GAMEWIN = "";// Make sure the sound doesn't fire off again.
            }
            else
            {
                if (this.nukedTreasure == false && this.nukedSelf == false)
                {
                    this.setSay("GAME OVER!",this.angry);
                }
            }
        }
        else if (this.currentEvent == this.EVENT_BATTLEWIN)
        {
            var playerCurrentLocation = this.LocatePlayer();
            this.grid[this.wantToGo.y][this.wantToGo.x] = "O"
            this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P"
            this.grid[playerCurrentLocation.y][playerCurrentLocation.x] = this.gridSeen[playerCurrentLocation.y][playerCurrentLocation.x] = "O";
            this.currentEvent = "";
            this.canMove = true;

            //Remove the enemy from the array.
            for (var a = 0; a < this.enemyLocations.length; a++)
            {
                if (this.enemyLocations[a].x == playerCurrentLocation.x && this.enemyLocations[a].y == playerCurrentLocation.y)
                {
                    this.enemyLocations.splice(a,1);
                }
            }
            
        }
        else if (this.currentEvent == this.EVENT_KFINDPRE)
        {
            this.currentSound = this.SND_KRAYANREVEAL;
            Math.random() <= this.krayanLocatorChance ? this.kDetect1():this.kDetect2();
            this.currentEvent = this.EVENT_KFIND;
            this.setSay("Hint: Krayans usually appear next to treasure!",this.tutorial)
        }
        else if (this.currentEvent == this.EVENT_KFIND)
        {
            this.currentEvent = "";
            this.krayanLocations = this.GetAllTheseFromSeenGrid("c");
            for (var a = 0; a < this.krayanLocations.length; a++)
                {
                    this.gridSeen[this.krayanLocations[a].y][this.krayanLocations[a].x] = "#";
                }
                var playerCurrentLocation = this.LocatePlayer();
                this.grid[this.wantToGo.y][this.wantToGo.x] = "O"
                this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P"
                this.grid[playerCurrentLocation.y][playerCurrentLocation.x] = this.gridSeen[playerCurrentLocation.y][playerCurrentLocation.x] = "O";
                this.currentEvent = "";
                this.canMove = true;
            
                
                
                if (this.krayanLocations.length == 0)
                {
                    this.setSay("There are no Krayans!?",this.neutral);
                }
                else
                {
                    
                }
        }

        else if (this.currentEvent == this.EVENT_NUKE)//Take the spot
        {
            var playerCurrentLocation = this.LocatePlayer();
            this.grid[this.wantToGo.y][this.wantToGo.x] = "O"
            this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P"
            this.grid[playerCurrentLocation.y][playerCurrentLocation.x] = this.gridSeen[playerCurrentLocation.y][playerCurrentLocation.x] = "O";
            this.currentEvent = this.EVENT_NUKE1;
           
            this.setSay("Click a sector to blow up!",this.tutorial);
           
        }
        else if (this.currentEvent == this.EVENT_NUKE2)//Replace the spot with an explosion
        {
            for (var a = 0; a < this.placesNuked.length; a++)
            {
                var addendum = "";//This is for bigger explosions.
                this.currentSound = this.SND_NUKEBOOM;

                if (this.placesNuked.length > 1)
                {
                    addendum = this.placesNuked[a]["0"];
                }

                this.grid[this.placesNuked[a].y][this.placesNuked[a].x] = "O";
                this.gridSeen[this.placesNuked[a].y][this.placesNuked[a].x] = "e" + addendum;
                

                if (["1","2","3","4"].includes(this.placesNuked[a].z))
                {
                    
                    this.currentEvent = this.EVENT_DIE;
                    this.nukedTreasure = true;
                    //this.setSay("Wait a minute...",this.angry);
                    this.setSay("You blew up a treasure! GAME OVER!",this.angry);
                }

                if (this.placesNuked[a].z == "P")
                {
                    this.currentEvent = this.EVENT_NUKEDSELF;
                    this.nukedSelf = true;
                    
                    
                }

            }

            if (this.currentEvent != this.EVENT_NUKEDSELF && this.currentEvent != this.EVENT_DIE)
            {
                this.currentEvent = this.EVENT_NUKE3;
            }
        }
        else if (this.currentEvent == this.EVENT_NUKE3)//If it was a treasure end the game, otherwise clear the explosion and the event.
        {
           
            if (this.nukedTreasure == true)
            {
                this.currentEvent = this.EVENT_DIE;
                this.setSay("You blew up treasure! GAME OVER!",this.angry);
                
            }
            else
            {   for (var a = 0; a < this.placesNuked.length; a++)
                {
                    this.gridSeen[this.placesNuked[a].y][this.placesNuked[a].x] = "O";
                }
                this.canMove = true;
                this.currentEvent = "";
                this.setSay("KABOOM!",this.happy);
            }

        }
        else if (this.currentEvent == this.EVENT_NUKEDSELF)
        {
            this.currentEvent = this.EVENT_DIE;
            this.setSay("You blew yourself up! GAME OVER!",this.angry);
            
        }
        else if (this.currentEvent == this.EVENT_GRIDHIDE)
        {
            
            if (this.initGridHide == false)
            {
                this.takeTheThing();

                this.toHide = this.GetAllTheseFromSeenGrid("O");

                while (this.toHide.length > this.maxHide)
                {
                    this.randomFromArray(this.toHide,true);
                }

                this.initGridHide = true;
                this.currentSound = this.SND_ACIDNEBULA;
                this.setSay("It ate away at the space sheep's map!",this.angry);
            }

           
            //If the player has a bubble: Do nothing
            if (this.bubbles > 0)
            {
                this.setSay("The bubble protected you!",this.happy);
                this.toHide = [];
            }
            
             
            if (this.toHide.length > 0)
            {
                var hideMe = this.randomFromArray(this.toHide,true);
                //if (hideMe.x != playerCurrentLocation.x && hideMe.y != playerCurrentLocation.y)
                //{
                    this.gridSeen[hideMe.y][hideMe.x] = "#";
                //}
                this.unexploredSpaces.push(hideMe);
            }
            else
            {
                this.canMove = true;
                this.currentEvent = "";
            }
        }
        else if (this.currentEvent == this.EVENT_SEXTANT)//Reveal enemies
        {
            this.takeTheThing();

            for (var a = 0; a < this.nearyEnemies.length; a++)
            {
                this.gridSeen[this.nearyEnemies[a].y][this.nearyEnemies[a].x] = "&";
            }

            this.currentEvent = this.EVENT_SEXTANT1;

            if (this.nearyEnemies.length > 0)
            {
                this.currentSound = this.SND_NMEREVEAL;
                this.setSay("Enemies detected!",this.neutral);
               // this.setSay("You can \"carve\" out the sectors around the enemies to help you remember where they are.",this.tutorial);
            }
            else
            {
                this.setSay("No enemies detected!",this.happy);
                
            }
        }
        else if (this.currentEvent == this.EVENT_SEXTANT1)//clear it and return control to player.
        {
            

            for (var a = 0; a < this.nearyEnemies.length; a++)
            {
                this.gridSeen[this.nearyEnemies[a].y][this.nearyEnemies[a].x] = "#";
            }

            this.currentEvent = "";
            this.canMove = true;
        }
        else if (this.currentEvent == this.EVENT_RADAR)
        {
            this.currentSound = this.SND_RADAR;
            if (this.radarResult >= this.radarChance)//Shows non-empty spaces.
            {
                
                for (var a = 0; a < this.radarArray.length; a++)
                    {
                        this.gridSeen[this.radarArray[a].y][this.radarArray[a].x] = "rr";
                    }

                    this.currentEvent = this.EVENT_RADAR1;

                    if (this.radarArray.length > 0)
                    {
                        this.setSay("Radar detects something here.",this.neutral);
                    // this.setSay("You can \"carve\" out the sectors around the enemies to help you remember where they are.",this.tutorial);
                    }
                    else
                    {
                        this.setSay("Nothing nearby",this.happy);
                        
                    }
            }
            else//Clears empty spaces.
            {
                if (this.radarArray.length != 0)
                {
                    var toShow = this.randomFromArray(this.radarArray,true);
                    this.gridSeen[toShow.y][toShow.x] = "O";
                }
                if (this.radarArray.length == 0)
                {
                    this.currentEvent = this.EVENT_RADAR1;
                }
                
            }
        }
        else if (this.currentEvent == this.EVENT_RADAR1)
        {
            this.canMove = true;
            this.currentEvent = "";
            this.takeTheThing();
            for (var a = 0; a < this.radarArray.length; a++)
                {
                    this.gridSeen[this.radarArray[a].y][this.radarArray[a].x] = "#";
                }

            
        }
        else if (this.currentEvent == this.EVENT_MAP)//Show the nearest treasure.
        {
            this.takeTheThing();
            this.mapShowLocation = this.NearestPoint(this.wantToGo,this.treasureLocations);
            this.currentSound = this.SND_TREASUREREVEAL;
            var symbolToPut = "m";
            
            if (Math.random() <= this.mapShowChance)
            {
                this.mapIndicators.push(this.mapShowLocation);
                this.gridSeen[this.mapShowLocation.y][this.mapShowLocation.x] = "m";
            }
            else
            {
                this.setupTreasureApprox(this.mapShowLocation.x,this.mapShowLocation.y);
                
            }
         

            this.currentEvent = this.EVENT_MAP1;

            this.setSay("The nearest treasure is over here!",this.happy);

        }
        else if (this.currentEvent == this.EVENT_MAP1)//clear it ang give control to the player.
            {
               
                for (var a = 0; a < this.mapIndicators.length; a++)
                {
                    this.gridSeen[this.mapIndicators[a].y][this.mapIndicators[a].x] = "#";
                }
                /*
                var nearestTreasure = this.mapShowLocation;
    
                this.gridSeen[nearestTreasure.y][nearestTreasure.x] = nearestTreasure["z"];
                */
                this.canMove = true;
                this.currentEvent = "";
    
            }
        else if (this.currentEvent == this.EVENT_GLUE)
        {
            this.takeTheThing();
            this.canMove = true;
            this.currentEvent = "";

            if (this.bubbles <= 0)
            {
            this.hp = Math.min(this.hp + Math.round(this.hpMax * this.healinghealingfactor),this.hpMax);
            this.setSay("Health restored!",this.happy);
            this.currentSound = this.SND_HEAL;
            }
            else
            {
                this.setSay("It dissipated against the bubble",this.angry);
            }
        }
        else if (this.currentEvent == this.EVENT_ENEMY)
        {
            if (this.pain == true)
            {
                this.pain = false;
                this.takeTheThing();
                this.currentEvent = "";
                //Remove Krayan location
                this.RemoveFromPointArray(this.wantToGo.x,this.wantToGo.y,this.krayanLocations);
                this.canMove = true;
                this.setSay("The pain nebula ate the enemy!",this.happy);
            }
            else if (this.br_enemyfirsthit == true)
            {
                this.currentEvent = this.EVENT_ENEMYENEMYTURN;
            }
            else
            {
                this.currentEvent = this.EVENT_ENEMYPLAYERTURN;
            }
        }
        else if (this.currentEvent == this.EVENT_ENEMYENEMYTURN)
        {
            this.attackPlayer(this.currentEnemy[this.nmeKeyAttack]);
            
            switch (this.currentEnemy["IM"])
                {
                    case "A": this.currentSound = this.SND_DRONEATTACK; break;
                    case "B": this.currentSound = this.SND_WHALEATTACK; break;
                    case "C": this.currentSound = this.SND_KRAYANATTACK; break;
                }

            if (this.currentEvent != this.EVENT_DIE)
            {
                
                this.currentEvent = this.EVENT_ENEMYPLAYERTURN;
            }
        }
        else if (this.currentEvent == this.EVENT_ENEMYDEFEATED)
        {
            this.takeTheThing();
            this.currentEvent = "";
            this.canMove = true;
        }

        else if (this.currentEvent == this.EVENT_BUBBLE)
            {
                this.takeTheThing();
                this.currentEvent = "";
                this.canMove = true;

                if (this.bubbles == 0)
                {
                    this.setSay("You are protected!",this.happy);
                }
                else
                {
                    this.setSay("An extra layer of bubble protection.",this.happy);
                }

                this.currentSound = this.SND_BUBBLE;
                this.bubbles++;
                this.pain = false;
            }

        else if (this.currentEvent == this.EVENT_AMMO)
        {
                this.takeTheThing();
                this.currentEvent = "";
                this.canMove = true;
                this.inventory["A"] = this.inventory["A"]  + this.ammoGive;
                this.inventory["B"] = this.inventory["B"] + this.ammoGive;
                this.inventory["C"] = this.inventory["C"] + this.ammoGive;
                this.currentSound = this.SND_AMMO;
                this.setSay("Got " + this.ammoGive + " of each kind of ammo.",this.happy);
        }
        else if (this.currentEvent == this.EVENT_PAIN)
        {
            this.takeTheThing();
            this.currentEvent = "";
            
            if (this.pain == true)
            {
                this.pain = false;
                this.setSay("The pain nebulas ate each other!",this.happy);

            }
            else if (this.bubbles > 0)
            {
                this.setSay("The bubble protected you!",this.happy);
                this.pain = false;
            }
            else
            {
                this.pain = true;
                this.setSay("Quick! Find an enemy to pass it off to!",this.angry);
                this.currentSound = this.SND_PAIN;
            }

            this.canMove = true;
        }
        else if (this.currentEvent == this.EVENT_TELEPORTER)
        {
                //No enemies, off the hook.
                if (this.nearyEnemies.length == 0)
                {
                    this.setSay("No enemies nearby.",this.happy);
                    this.takeTheThing();
                    this.currentEvent = "";
                    this.canMove = true;
                }
                else
                {
                    var nearest = this.NearestPoint(this.wantToGo,this.nearyEnemies);
                    var symbolAt = this.grid[nearest.y][nearest.x];
                    this.grid[nearest.y][nearest.x] = "O";
                    this.grid[this.wantToGo.y][this.wantToGo.x] = this.gridSeen[this.wantToGo.y][this.wantToGo.x] = symbolAt;

                    this.currentEvent = this.EVENT_ENEMY;

                    this.setEnemy(symbolAt);
                    
                    /*if (this.br_enemyfirsthit == true)//Does the enemy strike first
                    {
                    this.attackPlayer(this.currentEnemy[this.nmeKeyAttack]);
                    }*/

                    var nmeIndex = {"A":"fighter drone","B":"space whale","C":"Krayan"}

                    var stringToPut = "It brought over a " + nmeIndex[symbolAt] + " from nearby!";
                    var moodToput = this.angry;
                    
                    
                    
                    this.currentSound = this.SND_TELEPORTER;

                    this.setSay(stringToPut,moodToput);

                    
                }
        }
        else if (this.currentEvent == this.EVENT_MINE)
        {
            this.takeTheThing();
            this.currentEvent = "";
            this.canMove = true;
            if (this.bubbles <= 0)
            {
                this.setSay("Oww...",this.angry);
            }
            else
            {
                this.setSay("The bubble protected you!",this.neutral);
            }
            this.currentSound = this.SND_MINE;
            this.attackPlayer(this.mineDMG);

            
        }
        

        
        
        

        return toSend;
    }
    

    //When finding an item, the player takes its spot.
    takeTheThing()
    {
        var playerCurrentLocation = this.LocatePlayer();
        this.grid[this.wantToGo.y][this.wantToGo.x] = "O"
        this.gridSeen[this.wantToGo.y][this.wantToGo.x] = "P"                
        this.grid[playerCurrentLocation.y][playerCurrentLocation.x] = this.gridSeen[playerCurrentLocation.y][playerCurrentLocation.x] = "O";
    }

    //Reveals grid in a random pattern.
    gearReveal2()
    {
        this.unexploredSpaces = this.GetAllTheseFromSeenGrid("#");
        if (this.unexploredSpaces.length == 0)
        {
            return true;
        }
        else
        {
            var counter = Math.min(this.unexploredSpaces.length, Math.round(Math.random() * 8));

            while (counter > 0)
            {
                var toShow = this.randomFromArray(this.unexploredSpaces,true);
                this.gridSeen[toShow.y][toShow.x] = this.grid[toShow.y][toShow.x];
                counter--;
            }

        }

        

        return false;
    }

    //Reveals the grid 1 at a time
    gearReveal()
    {
        
        //Finished!
        if (this.yRevealEnd >= this.heightArena )
        {
            return true;
        }
        else
        {
            this.gridSeen[this.yRevealEnd][this.xRevealEnd] = this.grid[this.yRevealEnd][this.xRevealEnd]

            this.xRevealEnd++;

            //Next Row
            if (this.xRevealEnd == this.widthArena)
            {
                this.xRevealEnd = 0;
                this.yRevealEnd++;
            }

            return false;
        }
    }

    //Set outpoot.
  
    setSay(tothis,mood)
    {
            
            this.saying = tothis;
            this.sayingMood = mood;
        
    }

    
    getSnd ()
    {
        var toSend = this.currentSound;
        this.currentSound = "";
        return toSend;
    }

    
}