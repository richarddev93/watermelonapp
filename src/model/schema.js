// model/schema.js
import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'books',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'id_book', type: 'number', isOptional: true},
        {name: 'body', type: 'string'},
        {name: 'is_pinned', type: 'boolean'},
      ],
    }),
  ],
});
