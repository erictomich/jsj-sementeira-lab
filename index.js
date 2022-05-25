var http = require('http');
var fs = require('fs');
var path = require('path');


// http://cangaceirojavascript.com.br/streaming-audio-node/

http.createServer(function (request, response) {
    console.log("-----------------------");
    console.log('request: ', request.rawHeaders);

    var protocol = request.protocol;
    console.log("PROTOCOLO: ", protocol );

    var headers = request.headers;
    console.log("HEADERS: ", headers );

    const reqURL = new URL(request.url, 'http://'+headers.host);
    console.log('NEW URL: ', reqURL);
    
    if(reqURL.pathname ==='/estomago'){
        response.writeHead(301, {
            Location: reqURL.origin+'/fluxo_estomago.html'
            //"http" + (request.socket.encrypted ? "s" : "") + "://" + 
          });
        response.end();
    } else if(reqURL.pathname ==='/contact'){
        response.write('<h1>contact us page<h1>'); //write a response
        response.end(); //end the response
    } else{
        var filePath = '.' + request.url;
        if (filePath == './') {
            filePath = './index.html';
        }
    
        var extname = String(path.extname(filePath)).toLowerCase();
        var mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm'
        };
    
        var contentType = mimeTypes[extname] || 'application/octet-stream';
    
        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT') {
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(404, { 'Content-Type': 'text/html' });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }

   

}).listen(3030);
console.log('Server running at http://127.0.0.1:3030/');