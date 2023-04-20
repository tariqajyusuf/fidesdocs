import Callout from 'nextra-theme-docs/callout'

# Universal Analytics Connector (Consent)

## Implementation Summary

Fides automatically pulls in the user's information from the cookie in the user's browser and calls the [user deletion API](https://developers.google.com/analytics/devguides/config/userdeletion/v3) for user opt-out requests. 

|Consent Request | Description |
|----|----|
| Opt-in | No action is taken. For Opt-out we are just deleting the user and not removing them from any reject list, so no action is required to make the user "enabled" for Universal Analytics.|
| Opt-out | Fides will automatically pull the `userId` of the user and use it to trigger a [user delete request](https://developers.google.com/analytics/devguides/config/userdeletion/v3).|

At a high level, these are the steps required to enable the Universal Analytics connector.
1. Retrieve `webPropertyId` from your Universal Analytics setup.
2. Enable Google API access.
3. Configure Universal Analytics connectors in Fides UI.

We will expand these 3 steps in detail in the following sections.

### 1. Retrieving `webPropertyId` 

###### 1.1. Go to your Google Analytics console with the Universal Analytics project.
###### 1.2. Click on the property settings tab
###### 1.3. Note the Tracking Id, generally it's in the format of `UA-xxxxxxxxx-x`, where x is a number.


### 2. Enabling API Access

###### 2.1. [Go to console.cloud.google.com](https://console.cloud.google.com/welcome?project=balmy-flash-377421)


###### 2.2. Select an existing project or create a new one
![Step 2 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/df26fd81-0032-4d65-95f9-82caad931209/ac8eeb77-ed8a-4ed6-aaef-c52028652e31.png?crop=focalpoint&fit=crop&fp-x=0.2500&fp-y=0.2500&fp-z=2.0000&w=1200)


###### 2.3. Click on "New Project" if you want to create a new one
![Step 3 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/d159ebeb-6f1d-4a3e-8297-16ca14a72c7a/76d5485c-e42f-45dc-a436-83c8c8ffc085.png?crop=focalpoint&fit=crop&fp-x=0.6714&fp-y=0.1965&fp-z=2.7772&w=1200)


###### 2.4. Give the project a name
![Step 4 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/f766145c-f086-4baa-90af-ca27a961028c/acff1c8d-726a-4525-ab8a-de42ed240345.png?crop=focalpoint&fit=crop&fp-x=0.2507&fp-y=0.3112&fp-z=2.0000&w=1200)


###### 2.5. Click on "Create"
![Step 5 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/373dd785-a336-467d-8876-f144511cf0da/f0eb6038-1620-496c-a8c2-71ff922fd417.png?crop=focalpoint&fit=crop&fp-x=0.2500&fp-y=0.4846&fp-z=2.0000&w=1200)


###### 2.6. Go to the project page and click to expand the navigation menu
![Step 6 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/1a31eb3b-af1c-4ba5-9fc1-4db5f7e98832/5683720b-e9fc-4b1c-aef9-5f0d8c18c86f.png?crop=focalpoint&fit=crop&fp-x=0.0225&fp-y=0.0849&fp-z=2.9741&w=1200)


###### 2.7. Click on "Enabled APIs & services"
![Step 7 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/e3670ea7-0b84-4632-a6cd-425f4666c123/27e20e7c-9ae6-468f-9f6e-882cf650dfe0.png?crop=focalpoint&fit=crop&fp-x=0.2427&fp-y=0.3307&fp-z=2.5117&w=1200)


###### 2.8. Type "google analytics api"
![Step 8 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/3f2c5b9f-7a2d-4a34-ad8e-1ae0ba49b1fb/a9f2969d-26e1-4c41-8b34-cf028f1f8eb5.png?crop=focalpoint&fit=crop&fp-x=0.5405&fp-y=0.0844&fp-z=1.5435&w=1200)


###### 2.9. Click on Google Analytics API. The Analytics API provides access to Analytics configuration and report data.
![Step 9 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/f307b762-2322-4932-b834-a724ec822719/6f2def16-58df-4b41-9199-947f3f9ce651.png?crop=focalpoint&fit=crop&fp-x=0.5822&fp-y=0.6433&fp-z=1.6094&w=1200)


###### 2.10. Click on "Enable"
![Step 10 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/daa5705d-67ad-48a7-b2b2-5ca794093423/c8c1468d-a1e5-4605-9d77-2ec141d95a0d.png?crop=focalpoint&fit=crop&fp-x=0.1512&fp-y=0.3720&fp-z=2.9662&w=1200)


###### 2.11. Click on "Credentials"
![Step 11 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/f83f6092-78e8-4b1f-beea-d68656bfee98/b6d02a15-159b-41d2-bebb-82974d45d7e7.png?crop=focalpoint&fit=crop&fp-x=0.1005&fp-y=0.2899&fp-z=2.3150&w=1200)


###### 2.12. Click on "Configure Consent Screen"
![Step 12 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/7d3c5a7a-a665-48e1-add0-ecd173d84a6e/4bde2ad5-cbed-4f9a-a490-7717ecc58b34.png?crop=focalpoint&fit=crop&fp-x=0.7431&fp-y=0.3916&fp-z=2.0664&w=1200)


###### 2.13. Select "Internal"
![Step 13 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/70d47033-ec75-4da6-9b65-75d463bfd222/cf9c6d88-1e9f-441b-8412-6190dfdb791a.png?crop=focalpoint&fit=crop&fp-x=0.2769&fp-y=0.3713&fp-z=1.8955&w=1200)


###### 2.14. Click on "Create"
![Step 14 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/3cef8b81-0870-45a3-9f1a-7a64a7bc9c29/736bee5f-4a61-44e2-873b-f49d63860c8b.png?crop=focalpoint&fit=crop&fp-x=0.2092&fp-y=0.6048&fp-z=2.8378&w=1200)


###### 2.15. Give a descriptive name and enter the required details
![Step 15 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/c26bc593-1144-48e1-9435-de908a8bb849/84ebdf89-325a-412f-8884-874f13c863c9.png?crop=focalpoint&fit=crop&fp-x=0.3558&fp-y=0.4179&fp-z=1.5817&w=1200)


###### 2.16. Click on Save and Continue
![Step 16 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/db4b7d8f-e822-4cfe-b779-797315bbee8b/c3194d3a-69c6-411c-82b9-976a53e478bc.png?crop=focalpoint&fit=crop&fp-x=0.1783&fp-y=0.8307&fp-z=3.0000&w=1200)


###### 2.17. Click on Add or Remove Scopes
![Step 17 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/af4d8009-d8ba-43b0-a6c8-709e7b4292dc/12d0b1c3-b1c0-4c69-8b52-56a4e5c40bea.png?crop=focalpoint&fit=crop&fp-x=0.2523&fp-y=0.3856&fp-z=2.4584&w=1200)


###### 2.18. Now manually add the scope "https://www.googleapis.com/auth/analytics.user.deletion"
![Step 18 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/b687d178-08e1-4d42-a7ce-c1dc87059b7a/551961b5-1515-497e-b1cf-e5be4158bd7e.png?crop=focalpoint&fit=crop&fp-x=0.7490&fp-y=0.8301&fp-z=2.0944&w=1200)


###### 2.19. Click on Add to Table
![Step 19 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/0313f69e-6576-483e-8114-b356dc8f1b89/a901ee23-4a80-4879-8b38-4ab30b8d7195.png?crop=focalpoint&fit=crop&fp-x=0.5550&fp-y=0.8907&fp-z=2.7599&w=1200)


###### 2.20. Click on Update
![Step 20 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/8105b64e-f4ce-4e40-9118-3f7377c6aad6/c0e1074a-32ad-41a8-88f2-8c6cc0000e23.png?crop=focalpoint&fit=crop&fp-x=0.5424&fp-y=0.9694&fp-z=2.8325&w=1200)


###### 2.21. Click on Save and Continue
![Step 21 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/a7d15333-537c-4c07-8edd-0e486ca40c30/9d47f416-6d97-43d0-b672-59640c80d800.png?crop=focalpoint&fit=crop&fp-x=0.2361&fp-y=0.9547&fp-z=2.4624&w=1200)


###### 2.22. Click on Back to Dashboard
![Step 22 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/c1ae4abd-5e82-4113-a1f8-45feea994003/be84fa40-e458-4ad9-a655-ba1109f1f2d7.png?crop=focalpoint&fit=crop&fp-x=0.2377&fp-y=0.9541&fp-z=2.5413&w=1200)


###### 2.23. Click on Credentials
![Step 23 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/09698d5c-7141-47d8-93ae-bec11d0440dd/d29ff6de-4793-403a-9330-cd94eed5d46e.png?crop=focalpoint&fit=crop&fp-x=0.1005&fp-y=0.2899&fp-z=2.3150&w=1200)


###### 2.24. Click on Create Credentials
![Step 24 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/e0ba06ef-90f3-4845-9f72-e8c2db6d40cc/c8e1e8a5-144d-4a83-9024-a38c69b9d10a.png?crop=focalpoint&fit=crop&fp-x=0.3369&fp-y=0.1393&fp-z=2.3548&w=1200)


###### 2.25. Click on OAuth client ID…
![Step 25 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/950e2109-a61a-4c4b-bfac-b5caca72634a/7018ca70-1aa8-40d6-b7cf-e9d98eea45e4.png?crop=focalpoint&fit=crop&fp-x=0.4254&fp-y=0.2458&fp-z=1.7226&w=1200)


###### 2.26. Click on Application type
![Step 26 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/2dee44a8-eb11-4120-9320-c2bc3c709e0f/25913657-3d3c-422d-b230-e6fa1d4d490e.png?crop=focalpoint&fit=crop&fp-x=0.3491&fp-y=0.3080&fp-z=1.6156&w=1200)


###### 2.27. Click on Web application
![Step 27 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/4c17258e-ad4b-43fa-9192-227953184daf/ceda5fc2-af3e-4de5-9593-1096fe4a68d2.png?crop=focalpoint&fit=crop&fp-x=0.3558&fp-y=0.3239&fp-z=1.6366&w=1200)


###### 2.28. Type a descriptive name
![Step 28 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/a3bcdd6b-708e-458e-9100-5e57d40b36df/366c2790-6efd-4ef1-a504-c8fea08d19cd.png?crop=focalpoint&fit=crop&fp-x=0.3558&fp-y=0.3737&fp-z=1.5817&w=1200)


###### 2.29. Click on Add URI
![Step 29 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/f863c692-1a11-4261-8745-2bc3d3665b3c/292304ea-deb4-4701-919b-e96d2595cd08.png?crop=focalpoint&fit=crop&fp-x=0.2142&fp-y=0.8364&fp-z=2.8431&w=1200)


###### 2.30. Type in the url where you have hosted Fides along with the additional path 
`<Hosted Fides Url>/api/v1/oauth/callback`
![Step 30 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/574ad2d4-8e7e-4c9c-9aaa-d1818d860805/527d6311-e9ca-41db-962b-093d7fdfa372.png?crop=focalpoint&fit=crop&fp-x=0.2499&fp-y=0.7499&fp-z=2.0000&w=1200)


###### 2.31. Make note of the Redirect URI
![Step 31 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/40cfcc4a-042e-4f3f-9f2b-57c33e154362/e9ede397-d1e4-4624-9c9a-dbef2e8c813a.png?crop=focalpoint&fit=crop&fp-x=0.3399&fp-y=0.7780&fp-z=1.6656&w=1200)


###### 2.32. Click on Create
![Step 32 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/7dc93144-ffab-425f-80a4-0e63812b02f3/e2d00198-42ca-415a-bc16-b92087c0cbe9.png?crop=focalpoint&fit=crop&fp-x=0.2092&fp-y=0.9541&fp-z=2.9720&w=1200)


###### 2.33. Copy Client ID
![Step 33 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/f40cce3c-6d1a-421b-bd18-0ff6f6597745/78b539f8-6192-4868-9f3c-9260bd3c409a.png?crop=focalpoint&fit=crop&fp-x=0.5080&fp-y=0.4850&fp-z=2.0000&w=1200)


###### 2.34. Copy Client Secret
![Step 34 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/df629cc2-3d8a-4228-a3b8-10b4d0f3ccf6/1e28c55a-f3f7-459c-96c4-d2d901761814.png?crop=focalpoint&fit=crop&fp-x=0.5000&fp-y=0.5000&fp-z=2.0000&w=1200)


###### 2.35. Download and securely store the JSON
![Step 35 screenshot](https://images.tango.us/workflows/c031430e-55f2-42c8-be61-eda05ed7092b/steps/18e3ad07-88d8-4d57-8b0a-40cd25adee90/db252881-34f3-4d41-991b-2f3298cd4aec.png?crop=focalpoint&fit=crop&fp-x=0.4655&fp-y=0.5037&fp-z=2.0000&w=1200)


### 3. Configuring Universal Analytics Connector in Fides UI


###### 3.1. Log into your Fides Admin UI


###### 3.2. Click on the Privacy requests tab
![Step 2 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/b0ccc178-53fd-439a-a74f-13de9a213de4/b6ace002-3799-4e53-a61a-136fa4fcd78c.png?crop=focalpoint&fit=crop&fp-x=0.1379&fp-y=0.0228&fp-z=2.3997&w=1200)


###### 3.3. Click on the Connection manager tab
![Step 3 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/49af29b2-4dee-4711-b993-379ae9090c31/52e798af-fb89-4739-9d08-f0ae2cfed4f7.png?crop=focalpoint&fit=crop&fp-x=0.0922&fp-y=0.3403&fp-z=2.3696&w=1200)


###### 3.4. Click on Create new connection
![Step 4 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/20026fba-b04e-4569-84e3-10fd969a6046/e0c18be8-7800-4f30-a4af-83ad9bbfcc90.png?crop=focalpoint&fit=crop&fp-x=0.9078&fp-y=0.2306&fp-z=2.8228&w=1200)


###### 3.5. Search for Universal Analytics and select the connector
![Step 5 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/a3e508f1-a6bb-4ebb-962e-ebfa51abf3c0/3c512c10-87bf-4260-987a-be5120fec2a5.png?crop=focalpoint&fit=crop&fp-x=0.6333&fp-y=0.1936&fp-z=1.4080&w=1200)


###### 3.6. Click on Universal Analytics
![Step 6 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/1036640c-452c-44fe-9f80-3198e47d3e2b/8baef9d0-4b10-463c-b7e5-64c34a3f7791.png?crop=focalpoint&fit=crop&fp-x=0.2934&fp-y=0.5962&fp-z=2.0395&w=1200)


###### 3.7. Give a descriptive name and a unique identifier
![Step 7 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/0ba2a653-9567-4d29-a5c0-a404b4c150ea/73696c4c-8033-408f-8812-b13acd0cfa30.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.3416&fp-z=1.6917&w=1200)


###### 3.8. Enter the Client Id, Secret, Redirect Uri as noted from previous steps
![Step 8 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/77a5dc90-df8c-418c-a865-c99ce06fb31a/5e338dfe-97de-4574-8028-b492aa929d6e.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.6597&fp-z=1.6917&w=1200)


###### 3.9. Enter the Web Property Id as retrieved from the Unviersal Analytics setup
![Step 9 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/ee19df5e-2241-4eb3-b65b-c51885f61800/3e13bb1d-8631-4043-86fe-50acf043695b.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.7349&fp-z=1.6917&w=1200)


###### 3.10. Click **Save**
![Step 10 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/90138daf-e3f0-475b-ab86-d6d69362208e/b8f60e92-6cad-4b2c-a684-8dcd4a7794ee.png?crop=focalpoint&fit=crop&fp-x=0.3259&fp-y=0.9026&fp-z=2.8812&w=1200)


###### 3.11. Click **Save** to associate the default dataset
![Step 11 screenshot](https://images.tango.us/workflows/8dd31416-c2f3-482f-b0cd-f052cbe864ac/steps/3853a0dd-d23a-44f8-8623-fff263b80695/24c165a2-77fb-46e9-8076-5e0767afae34.png?crop=focalpoint&fit=crop&fp-x=0.2218&fp-y=0.6128&fp-z=2.8228&w=1200)


#### OAuth workflow

The goal of the OAuth process is to authenticate the connector and give respective permissions for Google API. Please use Postman or any other client of your choice for running API calls.

##### Create a Fides access_token via the API with `connection:authorize scopes`

###### 3.12. Get a root client token, passing in your root `client id` and `secret` as form data.

![Get Access Token](../../../../public/assets/img/consent/Universal_Analytics/Get_Access_Token.png)

The response returns an `access_token`


###### 3.13. Use that access token as Bearer token to create a client with `connection:authorize` scopes

![Create Client](../../../../public/assets/img/consent/Universal_Analytics/Create_Client.png)

The response returns a fides `client_id` and `client_secret`


###### 3.14. Use that `client_id` and `client_secret` to get a new token for that client

![Get Client Token](../../../../public/assets/img/consent/Universal_Analytics/Get_Client_Token.png)

The response returns an `access_token`. 

##### Get an authorization code from Google Analytics

###### 3.15 Do a GET to the Fides connection authorize endpoint 

`GET /api/v1/connection/{connection_key}/authorize`

Use the Fides `access_token` above as a Bearer token and the connector key defined for the connector as the `connection_key`


###### 3.16. A URL is generated in the following format, please navigate to the URL in a browser.

`https://accounts.google.com/o/oauth2/v2/auth?client_id=...&redirect_uri=...&response_type=code&state=...&prompt=consent&scope=..`


###### 3.17 After following that URL, you should be prompted to log into your Google account 


![Select Google Account](../../../../public/assets/img/consent/Universal_Analytics/Select_Google_Account.png)


###### 3.18 Give Fides permission to manage google analytics user deletion requests

![Allow Permission Screen](../../../../public/assets/img/consent/Universal_Analytics/Permission_Consent_Screen.png)


###### 3.19 Automatic Fides Redirect

Clicking “Allow” prompts the authentication service to send a request back to Fides at the redirect URI with an authentication code.  Fides then takes this and makes a separate request to POST / oauth2.googleapis.com/token to get an access token which it stores on your Fides Google Analytics connector. All of this is done automatically, there is no manual interference required in this step.

**Your Google Analytics connector is now set up to use OAuth 2.0 and is ready to process consent requests!**