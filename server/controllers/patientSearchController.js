import _ from "lodash";
import { getPatientSearchResultsFromDatabase } from "../handlers/dynamoDb";

export const getPatientSearchResults = (req, res) => {
  const patientObj = _.get(req, "body", undefined);
  getPatientSearchResultsFromDatabase(patientObj)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send("Application encountered an error");
    });
};
