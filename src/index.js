import dotenv from 'dotenv/config';
import request from 'request-promise';
import startDb from './startDb';

const db = startDb();

const getStandings = async () => {
  return await request({
    uri:
      'https://raw.githubusercontent.com/chrisdepaul/worldcup-rounds/master/data/team-rounds.json',
    json: true,
  });
};

const updateLeaderBoard = async () => {
  const standings = await getStandings();
  console.log(standings);
};

updateLeaderBoard();
