import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {mySchema} from './schema';
import migrations from './migrations';
import Book from './Book'; // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:

const adapter = new SQLiteAdapter({
  dbName: 'testdb',
  schema: mySchema,
  migrations,
  onSetUpError: error => {
    console.log('error db', error);
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Book],
});

export default database;
