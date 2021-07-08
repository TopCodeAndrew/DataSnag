import React, { useEffect, useState } from "react";
import axios from "axios";
require("dotenv").config();
// const { FULL_CONTACT_BEARER_TOKEN, FULL_CONTACT_URL } = process.env;

let FULL_CONTACT_URL = "https://api.fullcontact.com/v3/person.enrich";

// console.log(FULL_CONTACT_URL);

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
            // console.log(bearerToken);
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

  let type = typeof userData;

  let display = (data) => {
    return <h2>{data}</h2>;
  };

  let mappedData =
    // this ternary protects from an error while the user's data is being fetched by axios
    type === "undefined"
      ? null
      : userData.map((e, i) => {
          // console.log(e);
          switch (e[0]) {
            case "name":
              return (
                <div>
                  <h1>NAME</h1>

                  {Object.entries(e[1]).map((e) => {
                    return (
                      <div>
                        <h3>
                          {e[0]} : {e[1]}
                        </h3>
                      </div>
                    );
                  })}

                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              );
              break;
            case "age":
              return (
                <div>
                  <h1>age</h1>
                  {Object.entries(e[1]).map((e) => {
                    return (
                      <div>
                        <h3>
                          {e[0]} : {e[1]}
                        </h3>
                      </div>
                    );
                  })}

                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              );
              break;
            case "gender":
              return (
                <div>
                  <h1>gender</h1>
                  <h3>{e[1]}</h3>

                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              );
              break;
            case "demographics":
              return <h1>demographics</h1>;
              break;
            case "emails":
              return <h1>emails</h1>;
              break;
            case "phones":
              return <h1>phones</h1>;
              break;
            case "profiles":
              return <h1>profiles</h1>;
              break;
            case "locations":
              return <h1>locations</h1>;
              break;
            case "employment":
              return <h1>employment</h1>;
              break;
            case "photos":
              return <h1>photos</h1>;
              break;
            case "education":
              return <h1>education</h1>;
              break;
            case "urls":
              return <h1>urls</h1>;
              break;
            case "interests":
              return <h1>interests</h1>;
              break;
            default:
              return <h2>other</h2>;
          }
        });

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
                {e[1] === null ? <h6> NULL</h6> : <h6>{e[1]}</h6>} <br></br>
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
