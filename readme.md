# Marketing Cloud Journey Builder Custom Activity Template

## Custom Activity to call a REST Endpoint to retrieve data and use it in journey context

Hi there,

I've build this little node app to showcase how you could extend the journey builders capabilities with the custom JB activity SDK. The custom activity is able to call a REST endpoint with and ID, retrieve some data (ie. a link URL), save the retrieved information into a DE together with contactkey & emailAdress, and then pass it on into the journey for evaluation in a decision split.

The entry event for the journey is an API call. 

The CA can work with ContactKey, EmailAddress and the id that you provide.

The REST request will send the ID in the body, whereas the response expects a string with the key "response".

## Prerequisites 

* Marketing Cloud Installed Package: Custom Journey Builder Activity
* Ready to use REST endpoint that awaits an "id" in the body and gives out response key "response". A simple Lambda function in AWS will do the trick.

## In Journey Builder UI. 

After you dragged the CA to the canvas a pop up will ask you to provide: 

1. the endpoint URL
2. Name of the entry event (not key)
3. Key (not name) of the data extension you would like to save the response to

If you would like to use the "Update Contact" activity to save to other DEs as well you can use data binding and this syntax
```
{{Interaction.REST-1.YourOutputAttributeName}}
```

