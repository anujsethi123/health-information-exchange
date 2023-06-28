const AWS = require("aws-sdk");
import { uuid } from "uuidv4";
import _ from "lodash";

let aws_remote_config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  //sessionToken: process.env.AWS_SESSION_TOKEN,
};

AWS.config.update(aws_remote_config);

export const getUserDetailsFromDatabase = async (data) => {
  AWS.config.update(aws_remote_config);

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  // Define the table name
  const tableName = "UserAccounts";

  // Define the username value to search for
  const username = data.payload.username;

  const params = {
    TableName: tableName,
    Key: {
      Username: username,
    },
  };

  return new Promise((resolve, reject) => {
    dynamodb.get(params, (err, data) => {
      if (err) {
        console.error("Error retrieving item:", err);
        reject(err);
      } else {
        // console.log("Retrieved item:", data.Item);
        let userDetails = {};
        if (data?.Item) {
          userDetails = {
            userExists: true,
            ...data.Item,
          };
        } else {
          userDetails = {
            userExists: false,
          };
        }
        resolve(userDetails);
      }
    });
  });
};

export const getPatientSearchResultsFromDatabase = async (data) => {
  const dynamodb = new AWS.DynamoDB();

  const fName = _.get(data, "payload.firstName", "");
  const lname = _.get(data, "payload.lastName", "");
  const gender = _.get(data, "payload.gender", "");
  const dobDate = _.get(data, "payload.dob", "");
  const [year, month, day] = dobDate.split("-");
  const dob = `${day}-${month}-${year}`;

  const params = {
    TableName: "medicalcomprehendresponsetable",
    IndexName: "FirstName-LastName-index",
    KeyConditionExpression: "FirstName = :fName AND LastName = :lName",
    ExpressionAttributeValues: {
      ":fName": { S: fName },
      ":lName": { S: lname },
      ":attributeValue1": { S: gender },
      ":attributeValue2": { S: dob },
    },
    FilterExpression: "Gender = :attributeValue1 AND DOB = :attributeValue2",
  };

  return new Promise((resolve, reject) => {
    dynamodb.query(params, (err, data) => {
      if (err) {
        console.error("Error retrieving item:", err);
        reject(err);
      } else {
        console.log("Query result:", data.Items);
        if (data.Items.length === 0) {
          resolve({
            patientExists: false,
          });
        } else {
          
          let Medical_Comprehend_ICD_ARR =[];
          let Medical_Comprehend_SNM_ARR =[];
          let Medical_Comprehend_RX_ARR =[];
          let Medical_Comprehend_PHI_ARR =[];
          {data.Items.map((data) => {
            Medical_Comprehend_ICD_ARR.push(JSON.parse(data.Medical_Comprehend_ICD.S));
            Medical_Comprehend_SNM_ARR.push(JSON.parse(data.Medical_Comprehend_SNM.S));
            Medical_Comprehend_RX_ARR.push(JSON.parse(data.Medical_Comprehend_RX.S));
            Medical_Comprehend_PHI_ARR.push(JSON.parse(data.Medical_Comprehend_PHI.S));
          }
          )};

          let Medical_Comprehend_Data_Arr = [];

          {Medical_Comprehend_ICD_ARR.map((ICD_JSON) => {
              ICD_JSON.Entities.map((ICD10_JSON) => {
                let Medical_Comprehend_ICD_Obj = {code: null, desc:null, category:null, attribute:""};
                Medical_Comprehend_ICD_Obj.code=ICD10_JSON.ICD10CMConcepts[0].Code;
                Medical_Comprehend_ICD_Obj.desc=ICD10_JSON.ICD10CMConcepts[0].Description;
                Medical_Comprehend_ICD_Obj.category=ICD10_JSON.Category;

                ICD10_JSON.Attributes.map((ICD10_JSON_ATTR) => {
                  Medical_Comprehend_ICD_Obj.attribute=Medical_Comprehend_ICD_Obj.attribute.concat(ICD10_JSON_ATTR.Text,", ");
                })
                Medical_Comprehend_ICD_Obj.attribute=Medical_Comprehend_ICD_Obj.attribute.slice(0, -2);

                Medical_Comprehend_Data_Arr.push(Medical_Comprehend_ICD_Obj);
            })
          }
          )};

          {Medical_Comprehend_SNM_ARR.map((SNM_JSON) => {
            SNM_JSON.Entities.map((SCT_JSON) => {
                let Medical_Comprehend_SNM_Obj = {code: null, desc:null, category:null, attribute:""};
                Medical_Comprehend_SNM_Obj.code=SCT_JSON.SNOMEDCTConcepts[0].Code;
                Medical_Comprehend_SNM_Obj.desc=SCT_JSON.SNOMEDCTConcepts[0].Description;
                Medical_Comprehend_SNM_Obj.category=SCT_JSON.Category;

                SCT_JSON.Attributes.map((SCT_JSON_ATTR) => {
                  Medical_Comprehend_SNM_Obj.attribute=Medical_Comprehend_SNM_Obj.attribute.concat(SCT_JSON_ATTR.Text,", ");
                })
                Medical_Comprehend_SNM_Obj.attribute=Medical_Comprehend_SNM_Obj.attribute.slice(0, -2);
                
                Medical_Comprehend_Data_Arr.push(Medical_Comprehend_SNM_Obj);
            })
          }
          )};

          {Medical_Comprehend_RX_ARR.map((RX_JSON) => {
            RX_JSON.Entities.map((RXNorm_JSON) => {
                let Medical_Comprehend_RX_Obj = {code: null, desc:null, category:null, attribute:""};
                Medical_Comprehend_RX_Obj.code=RXNorm_JSON.RxNormConcepts[0].Code;
                Medical_Comprehend_RX_Obj.desc=RXNorm_JSON.RxNormConcepts[0].Description;
                Medical_Comprehend_RX_Obj.category=RXNorm_JSON.Category;
                
                RXNorm_JSON.Attributes.map((RXNorm_JSON_ATTR) => {
                  Medical_Comprehend_RX_Obj.attribute=Medical_Comprehend_RX_Obj.attribute.concat(RXNorm_JSON_ATTR.Text,", ");
                })
                Medical_Comprehend_RX_Obj.attribute=Medical_Comprehend_RX_Obj.attribute.slice(0, -2);
                
                Medical_Comprehend_Data_Arr.push(Medical_Comprehend_RX_Obj);
            })
          }
          )};

          {Medical_Comprehend_PHI_ARR.map((PHI_JSON) => {
            PHI_JSON.Entities.map((ProtectedHI_JSON) => {
                let Medical_Comprehend_PHI_Obj = {code: null, desc:null, category:null, attribute:""};
                Medical_Comprehend_PHI_Obj.code=ProtectedHI_JSON.Type;
                Medical_Comprehend_PHI_Obj.desc=ProtectedHI_JSON.Text;
                Medical_Comprehend_PHI_Obj.category=ProtectedHI_JSON.Category;
                Medical_Comprehend_PHI_Obj.attribute="PHI";
                
                Medical_Comprehend_Data_Arr.push(Medical_Comprehend_PHI_Obj);
            })
          }
          )};

          resolve({ 
            patientExists: true,  
            Medical_Data: Medical_Comprehend_Data_Arr,
            FirstName: fName,
            LastName: lname,
            DateOfBirth: dob,
            Gender: gender
          });
        }
      }
    });
  });
};
