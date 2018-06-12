import loki from 'lokijs';
import participants from './addParticipants';

export default () => {
  const db = new loki('worldcup.json');
  const pool = db.addCollection('pool');
  const teams = db.addCollection('teams');
  const scoring = db.addCollection('scoring');
  addParticipants(pool);
  addScoring(scoring);

  return db;
};

const addParticiants = pool => {
  participants.forEach(participant => {
    pool.insert(participant);
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
