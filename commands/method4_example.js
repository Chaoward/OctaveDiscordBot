module.exports = {
    name: "m4",
    description: "Testing Only",
    execute(p) { //parameters: message (Message), args (String[])
        let msg = "";

        for (const str of p.get("args")) {
            msg += str;
        }

        p.get("message").channel.send("Your Message is \"" + msg + "\"");
    }
}