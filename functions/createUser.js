const FaunaService = require("@brianmmdev/faunaservice");

exports.handler = async (event, context) => {
  const service = new FaunaService("fnAEPGZSdPACDMat_S81eDVpe4S-45dirV-yZK-2");

  let users = await service.listRecords("Users");
  for (let i = 0; i < users.length; i++) {
    if (users[i].subId === context.clientContext.user.sub) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users[i]),
      };
    }
  }

  let createdAccount = await service.createRecord("Users", {
    username: context.clientContext.user.email,
    subId: context.clientContext.user.sub,
    name: context.clientContext.user.user_metadata.full_name,
    type: "free",
    saves: [{}, {}, {}],
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createdAccount),
  };
};
