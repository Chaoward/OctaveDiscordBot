//Libaray Imports
const Discord = require('discord.js');
const fs = require('fs');

//Declarations
const client = new Discord.Client();
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
client.on("message", (message) => {
    if (!message.content.startsWith(PREFIX)) return;

    //converts contents into array of strings removing the prefix
    const args = message.content.toLowerCase().substr(PREFIX.length).split(" ");

    //===== Tutorial for Tom ==========================
    /*
        Adding Commands:
            There is a command folder which you can add a js file
            for each command. Use "hello.js" as a template to follow.

        NOTE: We can discuss the implementation of executing commands later.
            The following code is one way of doing.
    */ 
    switch (args[0]) {
        case "hello":
            client.commands.get("hello").execute(message);
            break;

        default:
            message.channel.send("[INSERT ERROR MESSAGE HERE]");
    }
});





client.once('ready', () => {
    console.log('TurtleBot is online!');
});

client.login( String(fs.readFileSync('./token.txt')) ); //we read the token from a file