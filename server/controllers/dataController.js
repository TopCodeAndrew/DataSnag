require("dotenv").config();

const request = require("request");
const { FULL_CONTACT_BEARER_TOKEN } = process.env;

module.exports = {
  getUserData: async (req, res) => {
    const { url, identifierType, identifier } = req.body;

    let reqBody = {};

    if (identifierType === "email") {
      reqBody = { email: identifier };
    } else if (identifierType === "phone") {
      reqBody = { phone: identifier };
    }

    const returnedResult = await new Promise((resolve, reject) => {
      // this will probably simply need to be request.post (url......)
      request.post(
        {
          url: url,
          json: true,
          headers: { authorization: `Bearer ${FULL_CONTACT_BEARER_TOKEN}` },
          body: reqBody,
        },
        (err, res, body) => {
          if (err) reject(err);
          resolve(body);
        }
      );
    });

    res.status(200).send(returnedResult);
  },
};
