exports.run = (client, message) => {
    
    const fs = require("fs"),
    yaml = require("js-yaml"),
    { MessageEmbed } = require('discord.js');

    let config = yaml.safeLoad(fs.readFileSync(`./config.yml`, "utf8"));



    message.delete();

    errorEmbed = new MessageEmbed()
    .setColor("A62019")
    .setDescription(`<@${message.author.id}> ` + "Invalid Permissions!");

    restartEmbed = new MessageEmbed()
    .setColor(0x006798)
    .setDescription(`**Restarting!** - Bot should be back up in 5-10 seconds.`);
  
    if (message.author.hasPermission = !"ADMINISTRATOR") return message.channel.send(errorEmbed);

    message.channel.send(restartEmbed).then(m => {
        process.exit(1)
    })
  };