exports.run = (client, message, args) => {

    const fs = require("fs"),
    yaml = require("js-yaml"),
    { MessageEmbed } = require('discord.js');

    let config = yaml.safeLoad(fs.readFileSync(`./config.yml`, "utf8"));

  message.delete();

  errEmbed = new MessageEmbed()
  .setColor("A62019")

   
  if (message.author.hasPermission = !"ADMINISTRATOR") return message.channel.send(errEmbed.setDescription(`<@${message.author.id}> ` + "Invalid Permissions."));
    
    if(!args || args.length < 1) return message.channel.send(errEmbed.setDescription(`<@${message.author.id}> ` + "Please provide a command."));
    
    const commandName = args[0];

    if(!client.commands.has(commandName)) {

      return message.channel.send(errEmbed.setDescription(`<@${message.author.id}> ` + "Invalid Command."));

    }
    delete require.cache[require.resolve(`./${commandName}.js`)];

    client.commands.delete(commandName);

    const props = require(`./${commandName}.js`);

    client.commands.set(commandName, props);

    reloadEmbed = new MessageEmbed()
    .setColor(0x006798)
    .setDescription(`**${commandName}** command has been reloaded.`);


    message.channel.send(reloadEmbed);
  };