require("dotenv").config();
const { FULL_CONTACT_BEARER_TOKEN } = process.env;

module.exports = {
  getBearerToken: (req, res) => {
    console.log(req);
    res.status(200).send(FULL_CONTACT_BEARER_TOKEN);
  },
};
