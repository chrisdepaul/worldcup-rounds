require('dotenv').config();
import request from 'request-promise';
import { flatten, pathOr, sort } from 'ramda';
import gmail from 'gmail-send';
import moment from 'moment-timezone';
import participants from './config/participants';
import scoring from './config/scoring';

import http from 'http';
import createHandler from 'github-webhook-handler';

const { PORT, API_BASE, API_FILE, MAX_ROUNDS } = process.env;

const handler = createHandler({
  path: '/webhook',
  secret: process.env.WEBHOOK_SECRET,
});

http
  .createServer(function(req, res) {
    handler(req, res, function(err) {
      res.statusCode = 404;
      res.end('no such location');
    });
  })
  .listen(PORT);

console.log(`listening on port ${PORT}...`);

handler.on('error', function(err) {
  console.error('Error:', err.message);
});

handler.on('push', async function(event) {
  const commits = pathOr(null, ['payload', 'commits'], event);
  const modifiedFiles = flatten(
    commits
      .map(commit => pathOr(null, ['modified'], commit))
      .filter(item => item !== null),
  );

  console.log(`Received a push event! Changed files: ${modifiedFiles}.`);

  if (modifiedFiles.includes(API_FILE)) {
    console.log(
      `${API_FILE} updated! Update Leader Board on ${moment()
        .tz('America/Toronto')
        .format('MMMM Do YYYY, h:mm:ss a')}`,
    );
    await updateLeaderBoard();
  }
});

const send = gmail({
  user: process.env.EMAIL,
  pass: process.env.PASSWORD,
});

const getStandings = async () => {
  return await request({
    uri: `${API_BASE}${API_FILE}`,
    json: true,
  });
};

const sendEmails = async (poolStandings, rounds, emails) => {
  console.log(`Sending Emails...`);
  const rows = poolStandings
    .map(
      standing =>
        `<tr style="border: solid 1px"><td>${standing.name}</td><td>${
          standing.points
        }</td></tr>`,
    )
    .reduce((con, item) => {
      return `${con}${item}`;
    }, '');

  try {
    await send({
      to: emails,
      subject: `Worldcup Standings: ${moment()
        .tz('America/Toronto')
        .format('MMMM Do YYYY, h:mm:ss a')}`,
      html: `
      <p>Hello Everyone! This is ChrisBot, a bot programmed by Chris to send you the ongoing results of the pool. I might be fraught with problems, but love me, like Real Chris, all the same. Notify Miles DePaul about any score disputes I report.</p>
      <p>These points were recorded after round: ${rounds}.</p>
      <table style="width: 50%; border: solid 1px; text-align: center;">
        <tr style="border: solid 1px">
          <td><strong>Person</strong></td>
          <td><strong>Points</strong></td>
        </tr>
        ${rows}
      </table>
    `,
    });
    console.log(`Emails Sent!`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateLeaderBoard = async () => {
  try {
    const teamStandings = await getStandings();

    const poolStandings = participants
      .map(participant => {
        const points = participant.teams.reduce((totalPoints, team) => {
          const round = teamStandings[team].round;
          const pointsFromTeam = scoring[round].pts;
          return totalPoints + pointsFromTeam;
        }, 0);
        return {
          ...participant,
          points,
        };
      })
      .sort(
        (participant_a, participant_b) =>
          participant_b.points - participant_a.points,
      );

    const completedRounds = Object.keys(teamStandings).map(
      key => teamStandings[key].round,
    );
    const maxRound = Math.max(...completedRounds);

    const participantEmails = participants.map(
      participant => participant.email,
    );
    console.log(`Pool Standings: ${JSON.stringify(poolStandings)}`);

    return sendEmails(poolStandings, maxRound, participantEmails);
  } catch (error) {
    console.log(error);
  }
};
