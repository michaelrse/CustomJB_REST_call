"use strict";
const axios = require('axios');

/*
 * Helper function to get access token
 */
async function getAccessToken() {
  const authUrl = 'https://<Your Authentication Base URI>.auth.marketingcloudapis.com/v2/token'; 
  const clientId = 'your client id'; 
  const clientSecret = 'your client secret'; 

  const response = await axios.post(authUrl, {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  });

  return response.data.access_token;
}

/*
 * Helper function to store data in a Data Extension
 */
async function storeDataInDataExtension(dataExtensionName, data, accessToken) {
  const dataExtensionUrl = `https://<REST Base URI>.rest.marketingcloudapis.com/hub/v1/dataevents/key:${dataExtensionName}/rowset`; // Replace with your Marketing Cloud tenant's URL

  const response = await axios.post(dataExtensionUrl, data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
  res.status(200).send("Edit");
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
  res.status(200).send("Save");
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = async (req, res) => {
  try {
    // Extracting the request payload
    const { inArguments } = req.body;
    if (!inArguments || inArguments.length === 0) {
      throw new Error("Missing inArguments in request body.");
    }

    const { id, URL_endpoint, de_name, ContactKey, EmailAddress } = inArguments[0];

    // Logging the original request body for debugging
    console.log("Request Body:", req.body);

    // Prepare the payload for the POST request
    const postData = {
      id: id
    };

    // Make the POST request to the provided URL_endpoint
    const postResponse = await axios.post(URL_endpoint, postData);

    // Extracting key and value from the response
    const responseData = postResponse.data;

    // Logging the response data from the POST request
    console.log("Response from POST request:", responseData);

    // Respond back to the journey builder immediately
    res.status(200).json(responseData);

    // Get the access token
    const accessToken = await getAccessToken();

    const dataToStore = 
      [
        {
        keys: {
          ContactKey: ContactKey
        },
        values: {
          id: id,
          response: responseData.response,
          EmailAddress: EmailAddress 
        }
      }
      ]
    ;

    // Log the data to be stored in the Data Extension
    console.log("Data to be stored in Data Extension:", dataToStore);

    // Store the combined data in the specified Data Extension
    await storeDataInDataExtension(de_name, dataToStore, accessToken);

  } catch (error) {
    console.error("An error occurred:", error.response ? error.response.data : error.message);
    res.status(500).json({
      status: "error",
      message: "An error occurred while processing your request."
    });
  }
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
  res.status(200).send("Publish");
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
  res.status(200).send("Validate");
};

/*
 * POST Handler for /unpublish/ route of Activity.
 */
exports.unpublish = function (req, res) {
  res.status(200).send("Unpublish");
};
