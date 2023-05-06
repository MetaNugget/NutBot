// Increments nut counter and displays count

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nutted')
    .setDescription('Counts how many times users have nutted here'),
  async execute(interaction) {
    const countquery = 'SELECT MAX(nutcount) AS maxinteger FROM nuts';
    db.get(countquery, (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      const count = row.maxinteger;
      db.get(`INSERT INTO nuts (username, guildid, nutcount) VALUES ('${interaction.user.username}', '${interaction.guild.id}', ${count + 1})`, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        interaction.reply(`Nice, ${interaction.user.username}. 😏 Users have nutted ${count + 1} time(s) in ${interaction.guild.name}.`);
      });
    });
  },
};