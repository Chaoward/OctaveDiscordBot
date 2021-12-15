module.exports = {
    name: "hello",
    description: "Says hello",
    execute(message) {
        message.channel.send("Hello There!");
    }
}