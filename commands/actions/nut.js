// Increments nut counter and displays count

const fs = require('fs');

let count = 0;

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nutted')
    .setDescription('Counts how many times users have nutted here'),
  async execute(interaction) {
    count++;
    fs.writeFile('./data/count.txt', count.toString(), (err) => {
      if (err) {
        console.error(err);
      }
    });

    await interaction.reply(`Nice, ${interaction.user.username}. 😏 Users have nutted ${count} time(s) in ${interaction.guild.name}.`);
  },
};

// Read the count from the file on startup
fs.readFile('./data/count.txt', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    count = parseInt(data.toString());
  }
});