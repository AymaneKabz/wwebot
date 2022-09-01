const { QueryType } = require("discord-player");
const player = require("../client/player");

module.exports = {
    name: "play",
    aliases: ['p'],
    options: [
        {
            name: "songtitle",
            description: "title of the song",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction) => {
        
        const songTitle = interaction.content.substring(interaction.content.indexOf(' ')+1);
       
        if (!interaction.member.voice.channel)
            return interaction.followUp({
                content: "Please join a voice channel first!",
            });

        const searchResult = await player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });

        if (!queue.connection)
            await queue.connect(interaction.member.voice.channel);

        //interaction.followUp({ content: `Playing ${songTitle}` });


        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};
