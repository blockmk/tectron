const Discord = require('discord.js')
const bot = new Discord.Client()
const prefix = "."
const token = process.env.token;

bot.login(token)
var options = ["Heads", "Tails", "shut up gay piece of shit"];
var motd = ["John Wick needs your help"];

bot.on('ready', ready => {
  console.log('Ready')
  
  bot.user.setActivity("doing stuff", {type: "WATCHING"});
})


bot.on('message', message => {

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);	

  let args = message.content.split(" ").slice(1);

  if (command === "e") {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setDescription("" + args.join(" "))
    message.channel.send(embed)
  }
  if (command === "help") {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor(`BLUE`)
	.setTitle("TectoBot commands")
    .setDescription("Well here are the commands and crap" + args.join(" "))
	.addField("help", "This is the command you just used!")
	.addField("about", "Just some basic stuff about the bot.")
	.addField("coinflip", "Just some basic stuff about the bot.")
	.addField("messageotd", "Shows the message of the day.")
    message.channel.send(embed)
  }
  if (command === "about") {
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor(`GREEN`)
	.setTitle("About the bot")
    .setDescription("This is a simple bot made by beep boop, the server owner." + args.join(" "))
	.addField("Created by tectonic777", "This bot was created on November 27, 2018.")
    message.channel.send(embed)
  }
  if (command === "messageotd") {
	 var response = motd[Math.floor(Math.random()*motd.length)];
  message.channel.send(response).then().catch(console.error);
  }
  if (command === "coinflip") {
    var response = options[Math.floor(Math.random()*options.length)];
	message.channel.send(response).then().catch(console.error);
  }
   if(command === "kick"){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }
  if(command === "report"){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "logs");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
  if(command === "serverinfo"){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#0000FF")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Member Count", message.guild.memberCount);

    return message.channel.send(serverembed);
  }
  if(command ==="tjnew"){
	message.delete() 
	let serverembed = new Discord.RichEmbed()
	.setTitle("The Journey - Page Released")
    .setColor("#0000FF")
	.setDescription("A new page of The Journey has been released! Go check it out at http://the-journey.webcomic.ws")
    .addField("©2017-2018 Tectonic Plates, Jaylin Hughes")
	return message.channel.send(serverembed);
  }

})