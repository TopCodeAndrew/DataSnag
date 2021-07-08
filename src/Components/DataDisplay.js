import React, { useEffect, useState } from "react";
import axios from "axios";
require("dotenv").config();
// const { FULL_CONTACT_BEARER_TOKEN, REACT_APP_FULL_CONTACT_URL } = process.env;

let FULL_CONTACT_BEARER_TOKEN = "Rsa074Lg0h8NfLcXFr759m0LNUVZJR9n";
let FULL_CONTACT_URL = "https://api.fullcontact.com/v3/person.enrich";

console.log(FULL_CONTACT_BEARER_TOKEN, FULL_CONTACT_URL);

export default function DataDisplay(props) {
  const { identifierType, identifier } = props;
  const [userData, setUserData] = useState();
  // console.log(identifier, identifierType);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${FULL_CONTACT_BEARER_TOKEN}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios
      .post(`${FULL_CONTACT_URL}`, { email: "lloyd@lloydjsmith.com" })
      .then((res) => {
        setUserData(Object.entries(res.data));
      });
  }, []);

  let type = typeof userData;

  let mappedData =
    type === "undefined"
      ? null
      : userData.map((e, i) => {
          console.log(e);
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
