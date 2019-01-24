// Importing all the dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var crypto = require('crypto');
var mongoose = require('mongoose');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');

var port = 3000;  // The port

var app = express();  //Initializing


app.use(function(req,res,next){
    console.log('Time: ',Date.now());
    next();
});

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

// Mongo URI
const mongoURI = 'mongodb://username:password1@ds064278.mlab.com:64278/khabrinews';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  },
  Genres: (req, Genres) =>{
    const genre = path(Genres);
    resolve(genre);
  }
});
const upload = multer({ storage });


app.get('/',function(req,res){
    res.render('login');
});

app.get('/dashboard', function(req,res){
    res.render('dashboard');
});

// @route GET /
// @desc Loads form
app.get('/upload', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('upload', { files: false });
      } else {
        files.map(file => {
          if (
            file.contentType === 'video/mp4'
          ) {
            res.render('upload', { files: files });
          } 
        });
      }
    });
  });

  // @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file });
    res.redirect('/upload');
  });
  
  // @route GET /files
  // @desc  Display all files in JSON
  app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No news exist'
        });
      }
      // Files exist
      return res.json(files);
    });
  });
  
  // @route GET /files/:filename
  // @desc  Display single file object
  app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No news exists'
        });
      }
      // File exists
      return res.json(file);
    });
  });
  
  // @route GET /video/:filename
  // @desc Display video
  app.get('/video/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No news exists'
        });
      }
  
      // Check if video
      if (file.contentType === 'video/mp4') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not a video'
        });
      }
    });
  });
  
  // @route DELETE /files/:id
  // @desc  Delete file
  app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/upload');
    });
  });
  
app.listen(3000);
console.log('Server started on port '+port);

module.exports = app;