const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://steven:mWUTfuLQ0Jxix7Oy@cluster0.l10uur7.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecté à la base de données MongoDB');
    return client.db('salonbeautedb');
  } catch (error) {
    console.error('Erreur de connexion à la base de données', error);
    throw error;
  }
};

module.exports = connectDB;