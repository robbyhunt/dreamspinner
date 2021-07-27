const FaunaService = require('@brianmmdev/faunaservice')

exports.handler = async (event, context) => {
  const service = new FaunaService('fnAEPGZSdPACDMat_S81eDVpe4S-45dirV-yZK-2')

  let body = JSON.parse(event.body)

  let users = await service.listRecords('Users')
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === body.username) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(users[i])
      }
    }
  }

  let createdAccount = await service.createRecord("Users",
    {
      username: body.username,
      type: "paid",
      saves: [
        {},
        {},
        {}
      ]
    }
  )

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(createdAccount)
  }
}