// Displays count without incrementing

const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

let count = 0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nutcount')
    .setDescription('Displays the number of times users have nutted in the server'),
  async execute(interaction) {
    await interaction.reply(`Users have nutted ${count} time(s) in ${interaction.guild.name}.`);
  },
};

fs.readFile('./data/count.txt', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    count = parseInt(data.toString());
  }
});