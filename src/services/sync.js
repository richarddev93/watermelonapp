import {synchronize} from '@nozbe/watermelondb/sync';

const HOST = 'http://192.168.1.154:4000/api/book/';

async function mySync(id, database) {
  try {
    await synchronize({
      database,
      pullChanges: async ({lastPulledAt, schemaVersion, migration}) => {
        const urlParams = `last_pulled_at=${lastPulledAt}`;
        const response = await fetch(`${HOST}pull?${urlParams}`);
console.log(urlParams)
        if (response.status !== 200) {
          console.error('ERROOOOOOOU', response);
          throw new Error(await response.text());
        }

        const responseData = await response.json();

        const {changes, timestamp} = responseData
        console.log('Pull changes', changes, timestamp);

        // const {changes, timestamp} = responseData;
        return {changes, timestamp};
      },
      pushChanges: async ({changes, lastPulledAt}) => {
        console.log('changes', changes);
        const response = await fetch(
          `${HOST}push?last_pulled_at=${lastPulledAt}`,

          {
            method: 'POST',
            body: JSON.stringify(changes),
            headers: {
              'Content-Type': 'application/json',
            },  
          },
        );

        console.log('Push changes');

        if (response.status !== 200) {
          throw new Error(await response.text());
        }

        console.log(changes);
      },
      migrationsEnabledAtVersion: 1,
    });
  } catch (error) {
    console.log(error);
  }
}

export default mySync;
