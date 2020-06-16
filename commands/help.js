exports.run = (client, message, args) => {
    
    const fs = require("fs"),
    yaml = require("js-yaml"),
    { MessageEmbed } = require('discord.js');

    let config = yaml.safeLoad(fs.readFileSync(`./config.yml`, "utf8"));

    
    message.delete();

    const helpEmbed1 = new MessageEmbed()
    .setTitle(`:mailbox_with_mail: Help`)
    .setColor(0x006798)
    .setDescription(`**${config["discord"]["prefix"]}help** - Displays this message. 
        **${config["discord"]["prefix"]}new** - Creates a new ticket.
        **${config["discord"]["prefix"]}close** - Closes the ticket.
        **${config["discord"]["prefix"]}add** - Adds a person to the ticket.
        **${config["discord"]["prefix"]}remove** - Removes a person from the ticket. 
        **${config["discord"]["prefix"]}suggest** - Sends your suggestion into the #suggestions channel.`)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`${config["discord"]["prefix"]}help | ${client.user.username}`);


    message.channel.send(helpEmbed1);
  };