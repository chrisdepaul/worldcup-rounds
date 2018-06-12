import dotenv from 'dotenv/config';
import request from 'request-promise';
import pool from './config/participants';
import participants from './config/participants';
import scoring from './config/scoring';

const getStandings = async () => {
  return await request({
    uri:
      'https://raw.githubusercontent.com/chrisdepaul/worldcup-rounds/master/data/team-rounds.json',
    json: true,
  });
};

const updateLeaderBoard = async () => {
  const teamStandings = await getStandings();

  const poolStandings = pool.map(participant => {
    const participantPoints = participant.teams.reduce((totalPoints, team) => {
      const round = teamStandings[team].round;
      const pointsFromTeam = round * scoring[round].pts;
      return totalPoints + pointsFromTeam;
    }, 0);
    return {
      ...participant,
      participantPoints,
    };
  });

  console.log(poolStandings);
};

updateLeaderBoard();
