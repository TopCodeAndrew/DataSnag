import React, { useEffect, useState } from "react";
import axios from "axios";
require("dotenv").config();
// const { FULL_CONTACT_BEARER_TOKEN, FULL_CONTACT_URL } = process.env;

let FULL_CONTACT_URL = "https://api.fullcontact.com/v3/person.enrich";

console.log(FULL_CONTACT_URL);

export default function DataDisplay(props) {
  const { identifierType, identifier } = props;
  const [userData, setUserData] = useState();
  const [bearerToken, setBearerToken] = useState();
  // console.log(identifier, identifierType);

  useEffect(async () => {
    await axios
      .get(`/api/full_contact/token`)
      .then((res) => {
        let bearerToken = res.data;

        axios.interceptors.request.use(
          (config) => {
            console.log(bearerToken);
            config.headers.authorization = `Bearer ${bearerToken}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        var jsonObj = {
          email: "lloyd@lloydjsmith.com",
        };

        jsonObj.email = identifier;

        axios
          .post(`${FULL_CONTACT_URL}`, JSON.stringify(jsonObj))
          .then((res) => {
            setUserData(Object.entries(res.data));
          });
      })
      .catch((err) => console.log(err));
  }, []);

  let type = typeof userData;

  let mappedData =
    type === "undefined"
      ? null
      : userData.map((e, i) => {
          // console.log(e);
          return e[0] !== "details" ? (
            <div className="data-pair">
              <h1>{i + 1}</h1>
              <h4>{e[0]}</h4>
              <h6>
                {e[1]} <br></br>
                <br></br>
              </h6>
            </div>
          ) : (
            <div>details</div>
          );
        });

  // console.log("mapped", userData);

  return <div>{mappedData}</div>;
}
