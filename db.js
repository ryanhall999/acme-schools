const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/year_in_pixels_db'
);

client.connect();

const sync = async () => {
  const SQL = `
  DROP TABLE IF EXISTS daily_mood;

  CREATE TABLE daily_mood(
    id SERIAL,
    mood VARCHAR(255) NOT NULL,
    date DATE
  );

  INSERT INTO daily_mood (mood, date) VALUES ('meh', '2020-01-01')
  ;

`;
  client.query(SQL);
};

const readMoods = async () => {
  const SQL = 'SELECT * from daily_mood';
  return (await client.query(SQL)).rows;
};

module.exports = {
  sync,
  readMoods,
};
