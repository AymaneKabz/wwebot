const client = require("../index");
const { QueryType } = require("discord-player");
const player = require("../client/player");
const queue = require("../SlashCommands/music/queue");


client.on("ready", () =>
    console.log(`${client.user.tag} is up and ready to go!`)
);

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channelId;
    let oldUserChannel = oldMember.channelId;
    const light="265804721946624001";
    const mouad="228962987375984650";
    const lega= "189081680512942080";
    const silver="153648442399260672";
    if(newUserChannel === "573243002005225490") 
    { 
        if(newMember.id === light){
            playSong("https://www.youtube.com/watch?v=1RdR2SfAErc"); 
        }
        else if(newMember.id === mouad){
            playSong("https://www.youtube.com/watch?v=yd7dRroTj5o"); 
        }else if(newMember.id === lega){
            playSong("https://www.youtube.com/watch?v=d5j98KXIcyE");
        }else if(newMember.id === silver){
            playSong("https://www.youtube.com/watch?v=7nQ2oiVqKHw");
        }
       
    }
    else{
        // User leaves a voice channel
        console.log("Left vc");
    }
 });


 const playSong = async (song) =>{
   
    const guild = await client.guilds.fetch("573239734046818323")
    const voiceChannel= await client.channels.fetch("573243002005225490");
    //const user = await client.users.fetch("265804721946624001");

    const searchResult = await player.search(song, {
        
            searchEngine: QueryType.AUTO,
        });

        const queue = await player.createQueue(guild, {
            
        });

        if (!queue.connection)
            await queue.connect(voiceChannel);

        //interaction.followUp({ content: `Playing ${songTitle}` });
        await queue.skip(); 
        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);
           
        if (!queue.playing) await queue.play();
 }