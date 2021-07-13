import React, { useEffect, useState } from "react";
import axios from "axios";
require("dotenv").config();

let FULL_CONTACT_URL = "https://api.fullcontact.com/v3/person.enrich";

export default function DataDisplay(props) {
  const [userData, setUserData] = useState();

  let { identifierType, identifier } = props.match.params;

  useEffect(async () => {
    await axios
      .get(`/api/full_contact/token`)
      .then((res) => {
        let bearerToken = res.data;

        axios.interceptors.request.use(
          (config) => {
            config.headers.authorization = `Bearer ${bearerToken}`;
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );

        var jsonObj = {
          identifierTypeHolder: identifier,
        };

        jsonObj[identifierType] = jsonObj["identifierTypeHolder"];
        delete jsonObj["identifierTypeHolder"];

        axios
          .post(`${FULL_CONTACT_URL}`, JSON.stringify(jsonObj))
          .then((res) => {
            console.log(Object.entries(res.data["details"]));
            setUserData(Object.entries(res.data["details"]));
          });
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>This is DataDisplay</div>;
}
