require('dotenv').config();
import request from 'request-promise';
import { sort } from 'ramda';
import gmail from 'gmail-send';
import moment from 'moment';
// import pool from './config/participants';
// import participants from './config/participants';
import scoring from './config/scoring';

import http from 'http';
import createHandler from 'github-webhook-handler';

http
  .createServer(function(req, res) {
    console.log('listning...');
  })
  .listen(8080);

// const participants = [
//   {
//     name: 'Chris',
//     email: 'cdepaul@gmail.com',
//     teams: ['URU', 'ESP', 'FRA', 'NGA', 'BRA', 'GER', 'BEL', 'COL'],
//   },
// ];
// const handler = createHandler({
//   path: '/webhook',
//   secret: process.env.WEBHOOK_SECRET,
// });

// http
//   .createServer(function(req, res) {
//     handler(req, res, function(err) {
//       res.statusCode = 404;
//       res.end('no such location');
//     });
//   })
//   .listen(8080);

// handler.on('error', function(err) {
//   console.error('Error:', err.message);
// });

// handler.on('push', function(event) {
//   console.log(
//     'Received a push event for %s to %s',
//     event.payload.repository.name,
//     event.payload.ref,
//   );

//   updateLeaderBoard();
// });

// const send = gmail({
//   user: process.env.EMAIL,
//   pass: process.env.PASSWORD,
// });

// const getStandings = async () => {
//   return await request({
//     uri:
//       'https://raw.githubusercontent.com/chrisdepaul/worldcup-rounds/master/data/team-rounds.json',
//     json: true,
//   });
// };

// const sendEmails = async (poolStandings, rounds, emails) => {
//   const rows = poolStandings
//     .map(
//       standing =>
//         `<tr style="border: solid 1px"><td>${standing.name}</td><td>${
//           standing.points
//         }</td></tr>`,
//     )
//     .reduce((con, item) => {
//       return `${con}${item}`;
//     }, '');

//   try {
//     await send({
//       to: emails,
//       subject: `Worldcup Standings: ${moment().format(
//         'MMMM Do YYYY, h:mm:ss a',
//       )}`,
//       html: `
//       <p>Hello Everyone! This is ChrisBot, a bot programmed by Chris to send you the ongoing results of the pool. I might be fraught with problems, but love me, like Real Chris, all the same. Notify Miles DePaul about any score disputes I report.</p>
//       <p>These points were recorded after round: ${rounds}.</p>
//       <table style="width: 50%; border: solid 1px; text-align: center;">
//         <tr style="border: solid 1px">
//           <td><strong>Person</strong></td>
//           <td><strong>Points</strong></td>
//         </tr>
//         ${rows}
//       </table>
//     `,
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// const updateLeaderBoard = async () => {
//   try {
//     const teamStandings = await getStandings();

//     const poolStandings = pool
//       .map(participant => {
//         const points = participant.teams.reduce((totalPoints, team) => {
//           const round = teamStandings[team].round;
//           const pointsFromTeam = round * scoring[round].pts;
//           return totalPoints + pointsFromTeam;
//         }, 0);
//         return {
//           ...participant,
//           points,
//         };
//       })
//       .sort((a, b) => a - b);

//     const completedRounds = Object.keys(teamStandings).map(
//       key => teamStandings[key].round,
//     );
//     const maxRound = Math.max(...completedRounds);

//     const participantEmails = participants.map(
//       participant => participant.email,
//     );
//     return sendEmails(poolStandings, maxRound, participantEmails);
//   } catch (error) {
//     console.log(error);
//   }
// };
