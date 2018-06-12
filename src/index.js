import dotenv from 'dotenv/config';
import startDb from './startDb';

const db = startDb();

console.log(db);
