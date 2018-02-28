const login = require("facebook-chat-api");
var Imgflipper = require("imgflipper");
var http = require("http")
var imgflipper = new Imgflipper(creds.imgflip, creds.pw);
// Create simple echo bot 
var lastMessage = "";

login({ email: creds.email, password: creds.pw }, (err, api) => {
    if (err) return console.error(err);

    api.listen((err, message) => {
        //if (message.threadID !== "1813947025313467") return;
        var text = message.body;
        if (message.body != "!") lastMessage = message.body;
        if (message.body != "!") return;

        function cb(err, url) {
            if (err) return;
            http.get(url, function(res) {
                api.sendMessage({
                    body: "",
                    attachment: res
                }, message.threadID)
            });
        }
        imgflipper.generateMeme(102156234, "", lastMessage.substring(0, 200), cb);
    });
});