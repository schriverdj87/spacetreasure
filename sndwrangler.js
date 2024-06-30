class SoundWrangler
{
    constructor()
    {
        this.volume = 0.5;
        this.Snds = {}
    }

    SetSnd(key,location)
    {
        this.Snds[key] = new Audio(location);
    }

    PlaySnd(key)
    {
        if (key != "")
        {
            this.Snds[key].volume = this.volume;
            
            if (key != "RADAR")//Delays for some reason with this specific sound.
            {
                this.Snds[key].currentTime = 0;
            }
            this.Snds[key].play();
        }
    }
}