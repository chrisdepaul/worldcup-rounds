import loki from 'lokijs';

export default () => {
  const db = new loki('worldcup.json');
  const pool = db.addCollection('pool');
  const teams = db.addCollection('teams');
  const scoring = db.addCollection('scoring');
  addPeople(pool);
  addTeams(teams);

  return db;
};

const addPeople = pool => {
  pool.insert({
    name: 'Chris',
    email: 'cdepaul@gmail.com',
    teams: [
      'Uruguay',
      'Spain',
      'France',
      'Nigeria',
      'Brazil',
      'Germany',
      'Belgium',
      'Columbia',
    ],
    pts: 0,
  });
};

const addScoring = scoring => {
  scoring.insert({
    round: 0,
    pts: 0,
  });
  scoring.insert({
    round: 1,
    pts: 1,
  });
  scoring.insert({
    round: 2,
    pts: 2,
  });
  scoring.insert({
    round: 3,
    pts: 3,
  });
  scoring.insert({
    round: 4,
    pts: 4,
  });
  scoring.insert({
    round: 5,
    pts: 5,
  });
};

const addTeams = teams => {
  teams.insert({
    name: 'Russia',
    group: 'A',
    round: 0,
  });
  teams.insert({
    name: 'Saudi Arabia',
    group: 'A',
    round: 0,
  });
  teams.insert({
    name: 'Egypt',
    group: 'A',
    round: 0,
  });
  teams.insert({
    name: 'Uruguay',
    group: 'A',
    round: 0,
  });
  teams.insert({
    name: 'Portugal',
    group: 'B',
    round: 0,
  });
  teams.insert({
    name: 'Spain',
    group: 'B',
    round: 0,
  });
  teams.insert({
    name: 'Morocco',
    group: 'B',
    round: 0,
  });
  teams.insert({
    name: 'Iran',
    group: 'B',
    round: 0,
  });
  teams.insert({
    name: 'France',
    group: 'C',
    round: 0,
  });
  teams.insert({
    name: 'Australia',
    group: 'C',
    round: 0,
  });
  teams.insert({
    name: 'Peru',
    group: 'C',
    round: 0,
  });
  teams.insert({
    name: 'Denmark',
    group: 'C',
    round: 0,
  });

  teams.insert({
    name: 'Argentina',
    group: 'D',
    round: 0,
  });
  teams.insert({
    name: 'Iceland',
    group: 'D',
    round: 0,
  });
  teams.insert({
    name: 'Croatia',
    group: 'D',
    round: 0,
  });
  teams.insert({
    name: 'Nigeria',
    group: 'D',
    round: 0,
  });

  teams.insert({
    name: 'Brazil',
    group: 'E',
    round: 0,
  });
  teams.insert({
    name: 'Switzerland',
    group: 'E',
    round: 0,
  });
  teams.insert({
    name: 'Costa Rica',
    group: 'E',
    round: 0,
  });
  teams.insert({
    name: 'Serbia',
    group: 'E',
    round: 0,
  });

  teams.insert({
    name: 'Germany',
    group: 'F',
    round: 0,
  });
  teams.insert({
    name: 'Mexico',
    group: 'F',
    round: 0,
  });
  teams.insert({
    name: 'Sweden',
    group: 'F',
    round: 0,
  });
  teams.insert({
    name: 'Korea Republic',
    group: 'F',
    round: 0,
  });

  teams.insert({
    name: 'Belgium',
    group: 'G',
    round: 0,
  });
  teams.insert({
    name: 'Panama',
    group: 'G',
    round: 0,
  });
  teams.insert({
    name: 'Tunisia',
    group: 'G',
    round: 0,
  });
  teams.insert({
    name: 'England',
    group: 'G',
    round: 0,
  });

  teams.insert({
    name: 'Poland',
    group: 'H',
    round: 0,
  });
  teams.insert({
    name: 'Senegal',
    group: 'H',
    round: 0,
  });
  teams.insert({
    name: 'Columbia',
    group: 'H',
    round: 0,
  });
  teams.insert({
    name: 'Japan',
    group: 'H',
    round: 0,
  });
};
