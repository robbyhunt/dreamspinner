const FaunaService = require('@brianmmdev/faunaservice')

exports.handler = async (event, context) => {
  const service = new FaunaService('fnAEPGZSdPACDMat_S81eDVpe4S-45dirV-yZK-2')

  let body = JSON.parse(event.body)

  let userRecord = await service.getRecordById('Users', body.user.id)
  if (userRecord.subId === context.clientContext.user.sub) {
    await service.updateRecord("Users", body.user.id, body.user)
  
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type"
      }
    }
  } else {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type"
      }
    }
  }

}