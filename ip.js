var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var date = new Date()
    var timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDay() + "." + date.getMonth() + "." + date.getFullYear()
    console.log(timestamp + " - returning ip " + ip);
    res.end(ip + "\n");
});

var port = 22222;
server.listen(port);
console.log("listening on port " + port);
