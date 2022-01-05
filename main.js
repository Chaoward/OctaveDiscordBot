//Libaray Imports
const Discord = require('discord.js');
const fs = require('fs');
const { exit } = require('process');

//Declarations
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
const helpMenu = new Discord.MessageEmbed();
const PREFIX = "m!";

//----- import commands -----
//This is how we are going to handle commands
client.commands = new Discord.Collection(); //discord's hashMap  <string, [EXPORTED OBJ]>
{   //Reading and importing the commands folder
    const files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    for (const file of files) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }
} //in a block to remove temp variables




//----- COMMANDS -------------------------------------------------------------
client.on("messageCreate", (message) => {
    if (!message.content.startsWith(PREFIX)) return;
    message.channel.sendTyping(); //displays the "is typing" status

    //converts contents into array of strings removing the prefix
    const args = message.content.toLowerCase().substr(PREFIX.length).split(" ");

    //METHOD 4
    //secret dev commands
    switch (args[0]) {
        case "sd":
            console.log("Shutting Down!");
            client.destroy();
            exit();
    }

    let parameters = {};
    switch (args[0]) {
        default:
            parameters = {"message": message, "args": args};
    }
    const cmd = client.commands.get(args[0]);
    if (cmd !== undefined) {
        cmd.execute(parameters);
    }
    else {
        message.channel.send("[INSERT ERROR MESSAGE HERE]");
    }

    //executing command (METHOD #1)
    /*
    switch (args[0]) {
        case "help":
            message.channel.send( {embeds: [helpMenu]} );
            break;

        case "hello":
            client.commands.get("hello").execute(message);
            break;

        case "sd":
            client.destroy();
            exit();

        default:
            message.channel.send("[INSERT ERROR MESSAGE HERE]");
    }
    */



    //METHOD #2 for executing commands
    //This method however we HAVE to make execute() parameters the same for all commands.
    //Which limits what we can pass to the function, plus force us to make a file for simple commands
    /*
    const command = client.commands.get(args[0]);
    if (command !== undefined)
        command.execute(message, args);
    else
        message.channel.send("[INSERT ERROR MESSAGE HERE]");
    */


    //METHOD #3
    //Best of both methods from before, however execute() is still force to set parameters
    /*
    const command = client.commands.get(args[0]);
    if (command !== undefined) {
        command.execute(message, args);
        return;
    }
    switch (args[0]) {
        case "COMMAND_NAME":
            // * CODE HERE *
            break;  
        default:
            message.channel.send("[INSERT ERROR MESSAGE HERE]");
    }
    */
});





client.once('ready', () => {
    console.log('TurtleBot is online!');

    //----- Help Menu Embed -----
    helpMenu.setAuthor(client.user.username, client.user.displayAvatarURL())
        .setTitle("Command List")
        .setDescription("");
    for (const cmd of client.commands.values()) {
        helpMenu.description += "**" + cmd.name + ":** " + cmd.description + "\n";
    }
});

client.login( String(fs.readFileSync('./token.txt')) ); //we read the token from a file