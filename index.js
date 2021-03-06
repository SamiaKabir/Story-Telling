var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});

//app.use('/img',express.static(path.join(__dirname, 'public')));

app.use('/images',express.static(path.join(__dirname+ '/images')));
app.use('/styles',express.static(path.join(__dirname+ '/styles')));
app.use('/scripts',express.static(path.join(__dirname+ '/scripts')));
app.use('/libraries',express.static(path.join(__dirname+ '/libraries')));
app.use('/avatars',express.static(path.join(__dirname+ '/avatars')));
// Routing
app.use(express.static(path.join(__dirname, 'public')));

var numUsers = 0;
var users=[];

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){

    var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    users.push(socket.username);
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
});
 //  console.log('a user connected');
 //  socket.on('disconnect', function(){
 //    console.log('user disconnected');
 //  });
 //   socket.on('chat message', function(msg){
 //    console.log('message: ' + msg);
	// io.emit('chat message', msg);
 //  });
 //   socket.broadcast.emit('hi');
});

http.listen(port, function(){
  console.log('listening on *:3000');
});


    