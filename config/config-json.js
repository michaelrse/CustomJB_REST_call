module.exports = function configJSON(req) {
    return {
      "workflowApiVersion": "1.1",
      "name": "<Your custom activity name>",
      "description": "Calls REST endpoint for data retrieving",
      "metaData": {
          "icon": "/icon.jpg",
          "category": "custom"
      },
      "type": "REST",
      "lang": {
          "en-US": {
              "name": "<Your custom activity name>",
              "description": "Calls external dB",
              "step1label": "Provide Endpoint URL and identifier"
          }
      },
      "arguments": {
          "execute": {
              "inArguments": [
                  {
                      "id": "id",
                      "URL_endpoint": "URL_endpoint",
                      "ContactKey":"{{Contact.Key}}",
                      "EmailAddress": "{{InteractionDefaults.Email}}",
                  }
              ],
              "outArguments": [
                {
                    "response":"response"
                }
            
              ],
              "useJwt": false,
              "timeout": 10000, 
              "retryCount": 1,
              "retryDelay": 2000,
              "concurrentRequests": 6,
              "url": "https://<YOUR ENDPOINT URL>.herokuapp.com/execute"
          }
      },
      "configurationArguments": {
          "applicationExtensionKey": "<YOUR UNIQUE KEY>",
          "save": {
              "url": "https://<YOUR ENDPOINT URL>.herokuapp.com/save",
              "useJwt": false
          },
          "publish": {
              "url": "https://<YOUR ENDPOINT URL>.herokuapp.com/publish",
              "useJwt": false
          },
          "validate": {
              "url": "https://<YOUR ENDPOINT URL>.herokuapp.com/validate",
              "useJwt": false
          },
          "stop": {
              "url": "https://<YOUR ENDPOINT URL>.herokuapp.com/stop",
              "useJwt": false
          }
      },
      "wizardSteps": [
          {
              "label": "Provide Endpoint URL and identifier",
              "key": "step1"
          }
      ],
      "userInterfaces": {
          "configModal": {
              "height": 450,
              "width": 1000,
              "fullscreen": false
          }
      },
      "schema": {
          "arguments": {
              "execute": {
                  "inArguments": [
                      {
                          "id": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "URL_endpoint": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                          "ContactKey": {
                              "dataType": "String",
                              "isNullable": false,
                              "direction": "in"
                          },
                      }
                  ],
                  "outArguments": [
                    {
                        "response": {
                            "dataType": "String",
                            "direction": "out",
                            "access": "visible"
                        },
                    }
                  ]
              }
          }
      }
  };
  };