import _ from "lodash";
import { getUserDetailsFromDatabase } from "../handlers/dynamoDb";
import { uploadFileAWS } from "../handlers/fileUpload";

let aws_remote_config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  //sessionToken: process.env.AWS_SESSION_TOKEN,
};

export const getUserDetails = (req, res) => {
  const userObj = _.get(req, "body", undefined);
  getUserDetailsFromDatabase(userObj)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send("Application encountered an error");
    });
};

export const getFileUploadDetails = (req, res) => {
  const userObj = _.get(req, "body", undefined);
  uploadFileAWS(userObj)
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send("Application encountered an error");
    });
};
