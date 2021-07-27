const { createClient } = require("@astrajs/collections");

const collection = 'testSaves'

exports.handler = async function(event, context, callback) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  const users = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection(collection);
    const body = JSON.parse(event.body)

    // try {
    //   // check if account already exists
    //   await users.get(body.username)
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify("Account already exists")
    //   }
    // } catch (error) {
      try {      
        // if account doesn't exist then clreate it
        await users.create(body.username, {
          type: "paid",
          saves: {
            slot1: {},
            slot2: {},
            slot3: {},
          },
        });
      return {
        statusCode: 200,
      }
    } catch (error) {
      // error handling
      console.log(error)
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      }
    }
    // }
}

