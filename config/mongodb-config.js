const mongoose = require('mongoose');
const { db: { mlab: { userName, password, dbName } } } = require('./config');

const url = `mongodb+srv://${userName}:${password}@social-network-uwo8u.mongodb.net/${dbName}?retryWrites=true&w=majority`;
// устанавливаем соиденения по умолчанию
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

// Позволит mongoose  использовать глобальную библиотеку промисов
mongoose.Promise = global.Promise;

// Получение подключения по умолчанию
const db = mongoose.connection;

// Привязать подключение к событию ошибки  (получать сообщения об ошибках подключения)
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// mongodb.on('open', console.log('MongoDB is connected'));
db.on('open', console.error.bind(console, 'MongoDB connection succses'));
