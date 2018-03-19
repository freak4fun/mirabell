// server.js

const express = require('express')
const app = express()
var path = require("path");

app.use(express.static('dist'));
var stream = require('stream');

//app.use('/downloads', express.static('downloads'))

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const uuidv4 = require('uuid/v4');

// configure storage
console.log( 'storage' )
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    console.log( 'fileName', file.originalname )
    //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    //console.log( newFilename )
    //cb(null, newFilename);
    cb(null, file.originalname)
  },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });
console.log( 'upload', upload )
app.post('/', upload.single('fileInput'), (req, res) =>
{
  console.log( '--- Done! ---' )
  res.send("+++ Done! +++")
});

app.get('/uploads/:file(*)',(req, res) => {
  console.log("### ### ###", req.params.file);
  var file = req.params.file;
  var fileLocation = path.join('./uploads',file);
  console.log(fileLocation);
  res.download(fileLocation, file); 
});

app.get('/auth/:pwd(*)',(req, res) => {
  res.send( req.params.pwd === '5ebe2294ecd0e0f08eab7690d2a6ee69' )
})

app.get('/', function (req, res) {
  //console.log( 'dirname ' + path.join(__dirname) );
    
  //console.log( path.join(__dirname+'/index.html') );
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/style',function(req,res){
  res.sendFile(path.join(__dirname+'/style.htm'));
});

app.get('/test',function(req,res){
  res.sendFile(path.join(__dirname+'/test.htm'));
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});
  
app.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

console.log("Running at Port 3000");
