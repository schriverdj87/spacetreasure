class GameParametersDefault 
{
    constructor()
    {
        //Starting things
        this.hpMax = 10;
        this.ammoA = 1;
        this.ammoB = 1;
        this.ammoC = 1; 
        
        //Enemy Settings
        this.nmeAs = 8;
        this.nmeBs = 0;
        this.nmeCs = 0;
        this.nmeAAttack = 2;//Attack power of enemy ship.
        this.nmeBAttack = 4;//Attack power of space-whale.
        this.nmeCAttack = 6;//Attack power of Krayan.   
        this.nmeCCampingTreasure = 1//How many nmeCs to put around treasures. 
        this.nmeBCampingSupplyCrates = 2//How many nmeBs to put around supplycrates
        this.br_enemyfirsthit = true;

        //Items to Put
        this.supplycrates = 3;//Restores health and ammo.
        this.shortrangescanners = 4;//Reveals the nearby area.
        this.krayanlocators = 5;//Shows the closest krayan/nmeC
        this.nukes = 5;//Reveals and destroys one space. Ends the game if that is the player or a treasure.
        this.hides = 3;//Hides previously explored spaces.
        this.longrangescanners = 3;//Reveals the tiles around a chosen point.
        this.enemydetectors = 5;//Reveals the locations of the nearest enemies.
        this.treasurefinders = 2;//Shows where the nearest treasure is.
        this.healing = 3;//Just restores player health. 
        this.bubbles = 3;//Shields.
        this.ammo = 3;//Just restores ammo
        this.pain = 3;//Chips away at the player's health until they find an enemy which will be defeated immediately.
        this.teleporters = 3; //Pulls in the nearest enemy within range to fight the player.        
        this.radars = 3; //Either reveals nearby tiles that have something or clears nearby empty tiles.
        this.mines = 0;//Just do damage.
        this.minesCampingNMEA = 1;//Mines to put around attackDrones/nmeAs

        //Item Settings
        this.teleportersRange = 3.001; //How far the teleporter looks for an enemy to pull in before it gives up.
        this.minePower = 1;//Damage mines do
        this.radarRange = 3.001; //How far the radar looks.
        this.scannerRange = 1.5;//Normal scanner range.
        this.scannerRangeHigh = 2.9;//High scanner range when the scanner gets lucky.
        this.painDamage = 1; //How much damage pain does for every move that doesn't deal with an enemy.
        this.br_showSupplyBoxes = true; // If set to false the supply boxes are initially hidden.
        this.hidePower = 20;//Maximum number of tiles to hide on getting the thing that hides tiles.
        this.supplyHealFactor = 0.5;//How much the supply boxes heal.
        this.healinghealingfactor = 1.0//How much health the just-healing item restores.
        this.ammoGive = 1;//How much ammo the ammo pickup restores.
        this.nmefinderrange = 3.001;//How far to look for enemies when detecting enemies.
        this.nmefinderNClosest = 5;//If the nmefinder/sextant looks for the N closest: this is N.
        this.nmefinderChance = 0.5;//If Math.random is lower than this it will reveal the n lowest. Otherwise it will show all enemies within nmefinderrange.
        this.krayanlocatorChance = 0.1;//Chance of revealing all Krayans/enemyCs
        this.scannerChance = 0.2; //If Math.random is lower than this the long range and short range scanners will use scannerRangeHigh instead of scannerRange.
        this.radarRevealChance = 0.5;//If Math.random is lower than this the radar will reveal nearby unexplored spaces that are empty. 
        this.mapShowChance = 0.5;//if Math.random is lower than this then it will show the exact location of the nearest treasure instead of poiting to it.
        this.nukeChance = 0.5;//Chance of creating a 3x3 explosion.
    }
}

var friendlyNames = 
{ //Starting things
    hpMax : "Maximum HP/The starting and maximum HP for the player.",
    ammoA : "Electro Cannon Balls/The amount of the ammo for Fighter Drones.",
    ammoB : "Kamikazi Android/The amount of the ammo for Space Whales.",
    ammoC : "Space Whale Crystals/The amount of the ammo for Krayans.", 
    
    //Enemy Settings
    nmeAs : "Fighter Drones/Number of Fighter Drones randomly placed in the grid.",
    nmeBs : "Space Whales/Number of Space Whales randomly placed in the grid.",
    nmeCs : "Krayans/Number of Krayans randomly placed in the grid.",
    nmeAAttack : "Fighter Drone Attack Power/Damage done by Fighter Drones.",
    nmeBAttack : "Space Whale Attack Power/Damage done by Space Whales",
    nmeCAttack : "Krayan Attack Power/Damage done by Krayans.",   
    nmeCCampingTreasure : "Krayans around Treasures/How many Krayans to put around each treasure.",
    nmeBCampingSupplyCrates : "Space Whales Around Supply Crates/How many Space Whales to put around each supply crate.",
    br_enemyfirsthit: "Enemies Hit First/If this is set to false enemies will wait for the player to attack before they do.",

    //Items to Put
    supplycrates : "Supply Crates/Restores health and ammo.",
    shortrangescanners : "Short Range Scanners/Reveals sectors around the player",
    krayanlocators : "Krayan Locators/Reveals the locations of Krayans. Useful if they are exclusively around treasures.",
    nukes : "Nukes/Destroys 1 or 9 sectors wherever the player clicks. If the area includes a treasure or the player it's an instant loss.",
    hides : "Acid Nebulas/\"Unexplores\" a number of random sectors.",
    longrangescanners : "Long Range Scanners/Reveals sectors around where the player clicks, identically to the telescope in Pirates Plunder.",
    enemydetectors : "Enemy Detectors/Points out the locations of enemies, usually in an identical manner to the sextant in Pirates Plunder.",
    treasurefinders : "Treasure Finders/Either points in the direction of the nearest treasure or shows the exact sector like the treasure map in Pirates Plunder.",
    healing : "Healing Nebulas/Restores health.",
    bubbles : "Bubbles/Prevents damage once for every time the player collects this.",
    ammo : "Ammo Boxes/Just restores ammo.",
    pain : "Hungry Nebulas/Does damage for every sector the player moves to until they encounter an enemy which will be defeated instantly.",
    teleporters : "Enemy Teleporters/Pulls the closest nearby enemy for the player to fight.",        
    radars: "Radars/Reveals the empty sectors near the player.", 
    mines : "Mines/Just damages the player.",
    minesCampingNMEA : "Mines Around Fighter Drones/How many mines to put around each Fighter Drone.",

    //Item Settings
    teleportersRange : "Enemy Teleporter Range/How far the enemy teleporter will look for an enemy before giving up.",
    minePower : "Mine Damage/Damage done by mine.",
    radarRange : "Radar Range/How far the radar reveals empty space.",
    scannerRange : "Scanner Range/Distance of tiles revealed by short and long range scanners.",
    scannerRangeHigh : "Scanner High Range/Distance of tiles revealed by short and long range scanners, if you're lucky.",
    painDamage : "Hungry Nebula Damage/Damage done by the hungry nebula for each sector moved to without an enemy.",
    br_showSupplyBoxes : "Show Supply Boxes/If false, the supply boxes will be hidden like everything else.",
    hidePower : "Sectors Hidden by Acid Nebulas/How many sectors to \"unexplore\" by the Acid Nebula",
    supplyHealFactor : "Health Restored by Supply Crates/How much health is restored by supply crates. 0.1 = 10% 0.5 = 50% 1.0 = 100%",
    healinghealingfactor : "Health Restored by Healing Nebulas/0.1 = 10% 0.5 = 50% 1.0 = 100%",
    ammoGive : "Ammo in Ammo Boxes/How much of each ammo to restore.",
    nmefinderrange : "Enemy Finder Range/How far Enemy Finders reveal enemies.",
    nmefinderNClosest : "Enemy Finder N Closest/If Math.random() is lower than \"Enemy Finder Chance\" it will reveal this many of the closest enemies instead of enemies within range.",
    krayanlocatorChance : "Krayan Locator Chance/If Math.random() is lower than this it will show all Krayans instead of just one.",
    nmefinderChance : "Enemy Finder Chance/See description for \"Enemy Finder N Closest\".",
    scannerChance : "Scanner Chance/If Math.random() is lower than this, the long and short range scanner will use the \"Scanner High Range\" instead of \"Scanner Range\".", 
    radarRevealChance : "Radar Chance/If Math.random() is lower than this, the radar will \"explore\" the nearby empty sectors.",
    mapShowChance : "Treasure Finder Chance/If Math.random() is lower than this, the treasure finder will reveal the exact location of the nearest treasure instead of pointing in its direction.",
    nukeChance : "Nuke Chance/If Math.random() is lower than this, the nuke will destroy a 3x3 area instead of a single sector."
}

//Returns a copy of friendlyNames with the values and keys switched. 
function InvertFriendlyNames()
{
    var toSend = {};
    var keys = Object.keys(friendlyNames);
    
    for (var a = 0; a < keys.length; a++)
    {
        toSend[friendlyNames[keys[a]].split("/")[0]] = keys[a];
    }

    return toSend;
    
}

var parameters = new GameParametersDefault();
var DescriptionSplit = " ▶ ";
var ValueSplit = " : ";

function GenerateCustomSheet(includeDescription)
{
    var keys = Object.keys(friendlyNames);
    var toSend = "THE WORKS\n====================\n";

    for (var a = 0; a < keys.length; a++)
    {
        var key = keys[a];
        var value = friendlyNames[key].split("/");//0 = Friendly Value. 1 = Description.
        var toPut = value[0] + ValueSplit + parameters[key];
        if (includeDescription == true)
        {
            toPut = toPut + DescriptionSplit + value[1] ;
        }
        toSend = toSend + toPut + "\n";
    }

    return toSend;
}

function ProcessCustomSheet(grindme)
{
    var toSend = "";
    parameters = new GameParametersDefault();
    var raw = grindme.split("\n");
    var errTemplate = "<p style = 'color:red'>ERRHERE</p>"
    var invertedFrindlyNames = InvertFriendlyNames();
    var invertedFrindlyKeys = Object.keys(invertedFrindlyNames);

    for (var a = 0; a < raw.length; a++)
    {
        var raw1 = raw[a];


        //Exclude lines without an arrow or a colon
        if (raw1.indexOf(DescriptionSplit.replaceAll(" ","")) == -1 && raw1.indexOf(ValueSplit.replaceAll(" ","")) == -1)
        {
            continue; 
        }

       

        //Strip the description.
        if (raw1.indexOf(DescriptionSplit) != -1)
        {
            raw1 = raw1.substring(0,raw1.indexOf(DescriptionSplit))
        }

        

        
        //Skip over invalid values.
        if (raw1.indexOf(ValueSplit.replaceAll(" ","")) == -1)
        {
            toSend = toSend + errTemplate.replace("ERRHERE", "\"" + raw1 + "\" " + " Is missing a \":\".");
            continue;
        }
        
        //Split and trim.

        var friendlyName = raw1.split(":")[0].trim();//Friendly name
        var friendlyValue = raw1.split(":")[1].trim();//Value
        var unfriendlyName = invertedFrindlyNames[friendlyName];
        var unfriendlyValue = parameters[unfriendlyName];
        
        
        if (invertedFrindlyKeys.includes(friendlyName) == false)
        {
            toSend = toSend + errTemplate.replace("ERRHERE", "\"" + friendlyName + "\" " + " Is not recognized.");
            continue;
        }

        //Special treatment for boolean values.
        if (["br_showSupplyBoxes","br_enemyfirsthit"].includes(invertedFrindlyNames[friendlyName]) == true)
        {
            parameters[unfriendlyName] = friendlyValue[0].toLowerCase() == "t" ? true:false;
            continue;
        }

        //Parse float values
        if ((parameters[unfriendlyName] + "").indexOf(".") != -1)
        {
            try
            {
                parameters[unfriendlyName] = Math.abs(parseFloat(friendlyValue));
            }
            catch (err)
            {
                toSend = toSend + errTemplate.replace("ERRHERE", "\"" + raw1 + "\" " + " Is not a numerical value.");
            }
            continue;
        }
        else
        {//Parse Int Values
            try
            {
                parameters[unfriendlyName] = Math.round(Math.abs(parseInt(friendlyValue)));
            }
            catch (err)
            {
                toSend = toSend + errTemplate.replace("ERRHERE", "\"" + raw1 + "\" " + " Is not a numerical value.");
            }
            continue;
        }

        

        


    }

    CorrectParameters();

    return toSend == "" ? "<p style = 'color:lime'>Custom game applied successfully.</p>":toSend;
}

//Makes sure the parameters are within acceptable range.
function CorrectParameters()
{
    //Make sure the player has between 1 and 20 HP
    parameters.hpMax = Math.min(parameters.hpMax,20);
    parameters.hpMax = Math.max(parameters.hpMax,1);

    //Make sure the enemies do at least 1 damage.
    parameters.nmeAAttack = Math.max(parameters.nmeAAttack,1);
    parameters.nmeBAttack = Math.max(parameters.nmeBAttack,1);
    parameters.nmeCAttack = Math.max(parameters.nmeBAttack,1);

    //Make sure everything that uses a range has a minimum range;
    var minRange = 1.5;

    parameters.teleportersRange = Math.max(minRange,parameters.teleportersRange);
    parameters.radarRange = Math.max(minRange,parameters.radarRange);
    parameters.scannerRange = Math.max(minRange,parameters.scannerRange);
    parameters.scannerRangeHigh = Math.max(minRange,parameters.scannerRangeHigh);
    parameters.nmefinderrange = Math.max(minRange,parameters.nmefinderrange);
    
    //Make sure healing items heal something
    var minHeal = 0.1;
    parameters.supplyHealFactor = Math.max(minHeal,parameters.supplyHealFactor);
    parameters.healinghealingfactor = Math.max(minHeal,parameters.healinghealingfactor);

}

function GMDefault()
{
    parameters = new GameParametersDefault();
}

function GMRipOffPiratesPlunder()
{
    GMDefault();
    
   parameters.shortrangescanners = parameters.minesCampingNMEA = parameters.krayanlocators = parameters.radars = parameters.ammo = parameters.bubbles = parameters.hides = parameters.nmeCCampingTreasure = parameters.nmeBCampingSupplyCrates = parameters.teleporters = parameters.nukes = parameters.pain = 0;
   parameters.nmeAs = parameters.nmeBs = parameters.nmeCs = 5;
   parameters.mines = 3;
   parameters.minePower = 3;
   parameters.nmefinderChance = parameters.scannerChance = 0;
   parameters.mapShowChance = 1;
   
   

}