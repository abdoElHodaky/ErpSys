import knex from 'knex';
import bcrypt from 'bcrypt';
import User from '../models/user';
import conversationsParticipants from '../models/conversation_participants';
import jwt from 'jsonwebtoken';
import jwtConfig from '../jwtConfig';
import chatToken from './chattoken';
import mongodb from 'mongodb';

const mongoUrl = 'mongodb://localhost/chatforbis';

module.exports = (io) => {
  var error;
  io.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
      jwt.verify(socket.handshake.query.token, jwtConfig.jwtSecret, function(err, decoded) {
        if(err) {
          return next(new Error('Authentication error'));
          error = err;
        }
        socket.decoded = decoded;
        next();
      });
    }
    next(new Error('Authentication error'));
  })
  .on('connection', socket => {
    if (error) socket.emit('reply', 'There is an error: ' + error);
    else {
      const { token } = socket.handshake.query;
      const { id } = jwt.decode(token);
      socket.on("displaySnapshot", (data) => {
        conversationsParticipants
          .where({entities_id: id})
          .fetchAll()
          .tap(conversation => {
            if (conversation.length) {
              // console.log(conversation);
              socket.emit("reply", conversation);
            } else {
              socket.emit('reply', '');
            }
          })
      });
      socket.on("sendChat", (data) => {
        socket.emit("reply", "msg received");
      });
      socket.on("disconnect", () => {
        // console.log('client disconnected');
      });
    }
  });
}
