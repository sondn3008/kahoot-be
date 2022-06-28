// Importing node modules
import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import bodyParser from 'body-parser';

// routes
import cors from 'cors';
import userRouter from './api/routers/user.router';
import roomRouter from './api/routers/room.router';
import questionRouter from './api/routers/question.router';

// websocket
import WebSocket, { WebSocketServer } from 'ws';

// middlewares
import authRouter from './api/middlewares/auth.mdw.js';

// passport config
// import configPassport from './config/passport';

// db config
import db from './config/db.config.js';

// configPassport(passport);
const app = express();

// db conection
db.sync().then(console.log('Syncing Database Done!'));

app.use(
  cors({
    origin: 'http://localhost:63342',
    methods: 'GET,PATCH,POST,DELETE',
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
  return res.json({
    msg: 'hello from expressjs',
  });
});

// app use passport
// app.use(passport.initialize());

// app use route
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/question', questionRouter);

app.post('/', function (req, res) {
  res.status(201).json({
    msg: 'data created',
  });
});

app.get('/err', function (req, res) {
  throw new Error('Error!');
});

app.use(function (req, res) {
  res.status(404).json({
    error: 'Endpoint not found.',
  });
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).json({
    error: 'Something wrong!',
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  const { address, port: currentPort } = server.address();
  console.log(`Kahoot API is listening at http://${address}:${currentPort}`);
});

// use Ws

const socketServer = new WebSocketServer({ server });

socketServer.on('connection', function (client) {
  console.log('Client connects successfully.');
  client.send('hello client!');
});

const { address, port: currentPort } = socketServer.address();

console.log(`WebSocket Server is running at ws:${address}:${currentPort}`);

export function broadcastAll(message) {
  for (let c of socketServer.clients) {
    if (c.readyState === WebSocket.OPEN) {
      c.send(message);
    }
  }
}
