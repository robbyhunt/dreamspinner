const FaunaService = require("@brianmmdev/faunaservice");

exports.handler = async (event, context) => {
  const service = new FaunaService("fnAEPGZSdPACDMat_S81eDVpe4S-45dirV-yZK-2");

  let body = JSON.parse(event.body);

  let userRecord = await service.getRecordById("Users", body.user.id);

  // CHECK IF SUBID OF IDENTITY USER MATCHES THE USER ENTRY IN DATABASE
  if (userRecord.subId === context.clientContext.user.sub) {
    // CHECK THAT THE LOCAL NUMBER OF SAVE SLOTS MATCHES THE DATABASE (TO STOP PUSHING EXTRA SLOTS SOMEHOW)
    if (body.user.saves.length !== userRecord.saves.length) {
      return {
        statusCode: 403,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
        },
      };
    } else {
      await service.updateRecord("Users", body.user.id, body.user);

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
        },
      };
    }
  } else {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
    };
  }
};
