var http = require('http');
var dns = require('dns');

function pad(num) {
    return ('0' + num).slice(-2);
}

function timestamp() {
    var date = new Date();
    var hours = pad(date.getHours());
    var minutes = pad(date.getMinutes());
    var seconds = pad(date.getSeconds());
    var day = pad(date.getDate());
    var month = pad(date.getMonth());
    var year = date.getFullYear();

    return hours + ":" + minutes + ":" + seconds + " " + day + "." + month + "." + year;
}

function returnRes(res, ans) {
    console.log(timestamp() + " - returning: " + ans);
    res.end(ans + "\n");
}

var server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (req.url === '/host') {
        dns.reverse(ip, function (err, domains) {
            if (err) {
                console.log(err.toString());
            }
            else {
                returnRes(res, domains);
            }
        });
    }
    else {
        returnRes(res, ip);
    }
});

var port = 22222;
server.listen(port);
console.log("listening on port " + port);
