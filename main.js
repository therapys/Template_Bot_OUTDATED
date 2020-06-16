let Discord = require('discord.js'),
    client = new Discord.Client(),
    fs = require('fs'),
    yaml = require("js-yaml"),
    enmap = require("enmap"),
    chalk = require('chalk');

let config = yaml.safeLoad(fs.readFileSync(`./config.yml`, "utf8")),
prefix = config["discord"]["prefix"],

//EMBEDS
errEmbed = new Discord.MessageEmbed()
.setColor("A62019");

//Discord ready.
client.on('ready', () =>{
    //console logs.
    console.log(`${chalk.yellow(`[Startup]`)} Factions Bot by therapy#8521.`)
    console.log(`${chalk.yellow(`[Startup]`)} User: ${client.user.tag}!`);

});

//DISCORD LOGIN
client.login(config["discord"]["token"]).catch(err => {
    console.log(`${chalk.redBright(`[Error]`)} Invalid discord token provided.`);
    process.exit(1);
});

//COMMAND HANDLER
client.commands = new enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      client.commands.set(commandName, props);
    });
    console.log(`${chalk.yellow(`[Startup]`)} Attempting to load ${chalk.underline(`${files.length}`)} commands.`);
});


//EVENT HANDLER
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
});