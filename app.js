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
const mongoURI = 'mongodb://username:password1@ds213255.mlab.com:13255/sports';
const mongoURI1 = 'mongodb://username:password1@ds213255.mlab.com:13255/politics';
const mongoURI2 = 'mongodb://username:password1@ds213255.mlab.com:13255/science';
const mongoURI3 = 'mongodb://username:password1@ds213255.mlab.com:13255/culture';
const mongoURI4 = 'mongodb://username:password1@ds113495.mlab.com:13495/finance';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
const conn1 = mongoose.createConnection(mongoURI1);
const conn2 = mongoose.createConnection(mongoURI2);
const conn3 = mongoose.createConnection(mongoURI3);
const conn4 = mongoose.createConnection(mongoURI4);

// Init gfs
let gfs;
let gfs1;
let gfs2;
let gfs3;
let gfs4;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
conn1.once('open', () => {
  // Init stream
  gfs1 = Grid(conn1.db, mongoose.mongo);
  gfs1.collection('uploads');
});
conn2.once('open', () => {
  // Init stream
  gfs2 = Grid(conn2.db, mongoose.mongo);
  gfs2.collection('uploads2');
});
conn3.once('open', () => {
  // Init stream'
  gfs3 = Grid(conn3.db, mongoose.mongo);
  gfs3.collection('uploads3');
});
conn4.once('open', () => {
  // Init stream
  gfs4 = Grid(conn4.db, mongoose.mongo);
  gfs4.collection('uploads4');
});


// Create Sports storage engine 
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
  }
});
const upload = multer({ storage });

// Create Politics storage engine 
const storage1 = new GridFsStorage({
  url: mongoURI1,
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
  }
});
const upload1 = multer({ storage1 });

// Create Science storage engine 
const storage2 = new GridFsStorage({
  url: mongoURI2,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads2'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload2 = multer({ storage2 });

// Create Culture storage engine 
const storage3 = new GridFsStorage({
  url: mongoURI3,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads3'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload3 = multer({ storage3 });

// Create Finance storage engine 
const storage4 = new GridFsStorage({
  url: mongoURI4,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads4'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload4 = multer({ storage4 });

//Gets Login Page
app.get('/',function(req,res){
    res.render('login');
});

//Gets Dashboard
app.get('/dashboard', function(req,res){
    res.render('dashboard');
});

// @route GET /
// @desc Loads Sports form
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

// @route GET /
// @desc Loads Politics form
app.get('/upload1', (req, res) => {
  gfs1.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('upload1', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'video/mp4'
        ) {
          res.render('upload1', { files: files });
        } 
      });
    }
  });
});

// @route GET /
// @desc Loads Science form
app.get('/upload2', (req, res) => {
  gfs2.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('upload2', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'video/mp4'
        ) {
          res.render('upload2', { files: files });
        } 
      });
    }
  });
});

// @route GET /
// @desc Loads Culture form
app.get('/upload3', (req, res) => {
  gfs3.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('upload3', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'video/mp4'
        ) {
          res.render('upload3', { files: files });
        } 
      });
    }
  });
});

// @route GET /
// @desc Loads Finance form
app.get('/upload4', (req, res) => {
  gfs4.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('upload4', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'video/mp4'
        ) {
          res.render('upload4', { files: files });
        } 
      });
    }
  });
});


  // @route POST /upload
// @desc  Uploads file to Sports DB
app.post('/upload', upload.single('file'), (req, res) => {
    // res.json({ file: req.file });
    res.redirect('/upload');
  });

  // @route POST /upload
// @desc  Uploads file to Politics DB
app.post('/upload1', upload1.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/upload1');
});

  // @route POST /upload
// @desc  Uploads file to Science DB
app.post('/upload2', upload2.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/upload2');
});

  // @route POST /upload
// @desc  Uploads file to culture DB
app.post('/upload3', upload3.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/upload3');
});

  // @route POST /upload
// @desc  Uploads file to Finance DB
app.post('/upload4', upload4.single('file'), (req, res) => {
  // res.json({ file: req.file });
  res.redirect('/upload4');
});

  
  // @route GET /files //SPORTS
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

    // @route GET /files //POLITICS
  // @desc  Display all files in JSON
  app.get('/files', (req, res) => {
    gfs1.files.find().toArray((err, files) => {
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

    // @route GET /files //SCIENCE
  // @desc  Display all files in JSON
  app.get('/files', (req, res) => {
    gfs2.files.find().toArray((err, files) => {
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

    // @route GET /files //CULTURE
  // @desc  Display all files in JSON
  app.get('/files', (req, res) => {
    gfs3.files.find().toArray((err, files) => {
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

    // @route GET /files //FINANCE
  // @desc  Display all files in JSON
  app.get('/files', (req, res) => {
    gfs4.files.find().toArray((err, files) => {
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
  
  // @route GET /files/:filename //SPORTS
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

    // @route GET /files/:filename //POLITICS
  // @desc  Display single file object
  app.get('/files/:filename', (req, res) => {
    gfs1.files.findOne({ filename: req.params.filename }, (err, file) => {
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

    // @route GET /files/:filename //SCIENCE
  // @desc  Display single file object
  app.get('/files/:filename', (req, res) => {
    gfs2.files.findOne({ filename: req.params.filename }, (err, file) => {
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

    // @route GET /files/:filename //CULTURE
  // @desc  Display single file object
  app.get('/files/:filename', (req, res) => {
    gfs3.files.findOne({ filename: req.params.filename }, (err, file) => {
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

    // @route GET /files/:filename //FINANCE
  // @desc  Display single file object
  app.get('/files/:filename', (req, res) => {
    gfs4.files.findOne({ filename: req.params.filename }, (err, file) => {
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
  


  // @route GET /video/:filename //SPORTS
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

  // @route GET /video/:filename //POLITICS
  // @desc Display video
  app.get('/video/:filename', (req, res) => {
    gfs1.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No news exists'
        });
      }
  
      // Check if video
      if (file.contentType === 'video/mp4') {
        // Read output to browser
        const readstream1 = gfs1.createReadStream(file.filename);
        readstream1.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not a video'
        });
      }
    });
  });
  
  // @route GET /video/:filename //SCIENCE
  // @desc Display video
  app.get('/video/:filename', (req, res) => {
    gfs2.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No news exists'
        });
      }
  
      // Check if video
      if (file.contentType === 'video/mp4') {
        // Read output to browser
        const readstream2 = gfs2.createReadStream(file.filename);
        readstream2.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not a video'
        });
      }
    });
  });
  
  // @route GET /video/:filename //CULTURE
  // @desc Display video
  app.get('/video/:filename', (req, res) => {
    gfs3.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No news exists'
        });
      }
  
      // Check if video
      if (file.contentType === 'video/mp4') {
        // Read output to browser
        const readstream3 = gfs3.createReadStream(file.filename);
        readstream3.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not a video'
        });
      }
    });
  });
  
  // @route GET /video/:filename //FINANCE
  // @desc Display video
  app.get('/video/:filename', (req, res) => {
    gfs4.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No news exists'
        });
      }
  
      // Check if video
      if (file.contentType === 'video/mp4') {
        // Read output to browser
        const readstream4 = gfs4.createReadStream(file.filename);
        readstream4.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not a video'
        });
      }
    });
  });  
  

  // @route DELETE /files/:id //SPORTS
  // @desc  Delete file
  app.delete('/files/:id', (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/upload');
    });
  });

  // @route DELETE /files/:id //POLITICS
  // @desc  Delete file
  app.delete('/files/:id', (req, res) => {
    gfs1.remove({ _id: req.params.id, root: 'uploads1' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/upload1');
    });
  });

  // @route DELETE /files/:id //SCIENCE
  // @desc  Delete file
  app.delete('/files/:id', (req, res) => {
    gfs2.remove({ _id: req.params.id, root: 'uploads2' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/upload2');
    });
  });

  // @route DELETE /files/:id //CULTURE
  // @desc  Delete file
  app.delete('/files/:id', (req, res) => {
    gfs3.remove({ _id: req.params.id, root: 'uploads3' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/upload3');
    });
  });

  // @route DELETE /files/:id //FINANCE
  // @desc  Delete file
  app.delete('/files/:id', (req, res) => {
    gfs4.remove({ _id: req.params.id, root: 'uploads4' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/upload4');
    });
  });
  
app.listen(3000);
console.log('Server started on port '+port);

module.exports = app;