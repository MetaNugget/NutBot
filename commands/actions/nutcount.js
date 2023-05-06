// Displays count without incrementing

const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nutcount')
    .setDescription('Displays the number of times users have nutted in the server'),
  async execute(interaction) {
    const countquery = 'SELECT MAX(nutcount) AS maxinteger FROM nuts';
    db.get(countquery, (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      const count = row.maxinteger;

      interaction.reply(`Users have nutted ${count} time(s) in ${interaction.guild.name}.`);
    });
  },
};
