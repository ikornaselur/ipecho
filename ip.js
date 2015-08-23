var http = require('http');

function pad(num) {
    return ('0' + num).slice(-2);
}

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var date = new Date();
    var hours = pad(date.getHours());
    var minutes = pad(date.getMinutes());
    var seconds = pad(date.getSeconds());
    var day = pad(date.getDate());
    var month = pad(date.getMonth());
    var year = date.getFullYear();

    var timestamp = hours + ":" + minutes + ":" + seconds + " " + day + "." + month + "." + year;
    console.log(timestamp + " - returning ip " + ip);
    res.end(ip + "\n");
});

var port = 22222;
server.listen(port);
console.log("listening on port " + port);
