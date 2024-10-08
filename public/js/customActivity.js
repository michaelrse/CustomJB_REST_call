define(["postmonger"], function (Postmonger) {
"use strict";
  
    var connection = new Postmonger.Session();
    // var authTokens = {};
    var payload = {}; //var payload = null; // ginge auch
    var steps = [{ label: "Provide Endpoint URL and identifier", key: "step1" }];
    var event_name = {};
    var URL_endpoint = {};
   // var random_info = {};
    // When DOM is loaded onRender function is initialized
    $(function () {
      onRender();
    });
  
    connection.on("initActivity", initialize);
    connection.on("requestedEndpoints", onGetEndpoints);
    connection.on("requestedInteraction", onRequestedInteraction);
    connection.on(
      "requestedTriggerEventDefinition",
      onRequestedTriggerEventDefinition
    );
    connection.on("requestedDataSources", onRequestedDataSources);
  
    connection.on("clickedNext", save);
  
    function onRender() {
      // JB will respond the first time 'ready' is called with 'initActivity'
      connection.trigger("ready");
      connection.trigger("requestEndpoints");
      connection.trigger("requestInteraction");
      connection.trigger("requestTriggerEventDefinition");
      connection.trigger("requestDataSources");
    }
    function onRequestedDataSources(dataSources) {
      console.log("*** requestedDataSources ***");
      console.log(dataSources);
    }
    function onRequestedTriggerEventDefinition(eventDefinitionModel) {
      console.log("*** requestedTriggerEventDefinition ***");
      console.log(eventDefinitionModel);
    }
    //Data is the response has:  (payload): { name: 'MyActivity', metaData: {}, arguments: {},
    // configurationArguments: {}, outcomes: [], errors: [] }
    function initialize(data) {
      console.log(data);
      if (data) {
        payload = data;
      }
  
      connection.trigger("requestInteraction");
      console.log("Request Journey Data");
    }
  
    function onGetEndpoints(endpoints) {
      console.log(endpoints);
    }
  
    function onRequestedInteraction(interaction) {
      var responseData = interaction;
        // Can also be retrieved
      journeyKey = responseData.key;
      journeyName = responseData.name;
      journeyDesc = responseData.description;
  
      console.log("*** requestedInteraction ***");
      console.log(interaction);
    }
  
    function save() {
      let event_name = $("#event_name").val();
      let URL_endpoint = $("#URL_endpoint").val();
      let de_name = $("#de_name").val();
  
      payload["arguments"].execute.inArguments = [
        {
            id: `{{Event.${event_name}.id}}`,
            URL_endpoint: URL_endpoint,
            de_name: de_name,
            ContactKey:"{{Contact.Key}}",
            EmailAddress: "{{InteractionDefaults.Email}}",
        },
      ];
  
      payload["metaData"].isConfigured = true;
  
      console.log(payload);
      // Sends message to JB updates the configured payload for excute inArguments
      connection.trigger("updateActivity", payload);
    }
  });