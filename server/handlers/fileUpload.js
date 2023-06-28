const AWS = require("aws-sdk");

let aws_remote_config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const upload = (fileValue, fileNameNew, userName) => {
  return new Promise((resolve, reject) => {
    AWS.config.update(aws_remote_config);
    const s3 = new AWS.S3();
    const timeStamp = new Date().toISOString().replace(/[^0-9]/g, "");
    const dbDetails = {
      originalFileName: fileValue.name,
      uploadFileName: fileNameNew + timeStamp + ".png",
      userDetails: userName,
      timestamp: timeStamp,
    };
    insert(dbDetails);
    var buf = Buffer.from(
      fileValue.content.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const params = {
      Bucket: "cnpimageupload",
      Key: fileNameNew + timeStamp + ".png",
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "image/png",
    };
    s3.putObject(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        console.log("File uploaded successfully.", data.Location);
        let uploadDetails = {};
        uploadDetails = {
          fileUploadSuccess: true,
          ...data,
        };
        resolve(uploadDetails);
      }
    });
  });
};

const insert = (dbDetails) => {
  return new Promise((resolve, reject) => {
    var AWS = require("aws-sdk");
    var dynamodb = new AWS.DynamoDB();
    var params = {
      TableName: "uploadImageRecord",
      Item: {
        uploadFileName: { S: String(dbDetails.uploadFileName) },
        originalFileName: { S: String(dbDetails.originalFileName) },
        userDetails: { S: String(dbDetails.userDetails) },
        timestamp: { S: String(new Date()) },
      },
    };
    console.log(params);
    dynamodb.putItem(params, function (err, data) {
      if (err) {
        console.error("Error retrieving item:", err);
        reject(err);
      } else {
        console.log("db operation successful");
        resolve(data);
      }
    });
  });
};

export const uploadFileAWS = async (data) => {
  return new Promise((resolve, reject) => {
    let files = data.payload.files;
    let userName = data.payload.userName;
    let fileNameNew =
      data.payload.firstName +
      "__" +
      data.payload.lastName +
      "__" +
      data.payload.dob.split("-").reverse().join("-") +
      "__" +
      data.payload.gender +
      "__";

    var promises = [];
    files.forEach((file) => {
      promises.push(upload(file, fileNameNew, userName));
    });

    Promise.all(promises)
      .then((data) => {
        let uploadDetails = { fileUploadSuccess: true };
        resolve(uploadDetails);
      })
      .catch((e) => {
        console.log("File upload failed");
        console.log(JSON.stringify(e));
        let uploadDetails = { fileUploadSuccess: false };
        resolve(uploadDetails);
      });
  });
};
