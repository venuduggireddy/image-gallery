fs = require('fs');
http = require('http');
url = require('url');
util = require('util');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
          if(name.search(".png") != -1) {
            files_.push(name);
          }

        }
    }
    return files_;
}

http.createServer(function(req, res){
  var request = url.parse(req.url, true);
  var action = request.pathname;
  var dir = "/temp/images"
  if (action == '/list') {
     var files = getFiles(dir);
     res.writeHead(200, {'Content-Type': 'text/html' });
     res.write(util.format("List of images in %s </br><div>", dir));
     files.forEach(function(file){
       var img = util.format("<img src='/img?p=%s'/></br>", file);
       res.write(img);
     });
     res.end("</div>");
  }else if(action == '/img'){
    var img = fs.readFileSync(request.query.p);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
  } else {
     res.writeHead(200, {'Content-Type': 'text/plain' });
     res.end('To List all the images in a directory upate the variable dir and open the /\list \n');
  }
}).listen(8090, '127.0.0.1');
