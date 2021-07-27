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

    try {      
      await users.replace(`${body.username}/saves/slot${body.slot}`, body.data);
    return {
      statusCode: 200,
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

