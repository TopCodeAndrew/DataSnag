require("dotenv").config();

const request = require("request");
const { FULL_CONTACT_BEARER_TOKEN } = process.env;

module.exports = {
  getUserData: async (req, res) => {
    const { url } = req.body;
    const returnedResult = await new Promise((resolve, reject) => {
      // this will probably simply need to be request.post (url......)
      request(url, { json: true }, (err, res, body) => {
        if (err) reject(err);
        resolve(body);
      });
    });

    res.status(200).send(returnedResult);
  },
};
