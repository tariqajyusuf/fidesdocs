import Callout from 'nextra-theme-docs/callout'

# Wunderkind Connector (Consent)

## Implementation Summary

Wunderkind provides an API to opt the user out of processing to comply with CCPA, CPRA and other regulations. We have integrated with this API to communicate to Wunderkind about user's consent preferences.


|Consent Request | Description |
|----|----|
| Opt-in | If user has opted out of a consent preference then Fides sends string ("1YN") to Wunderkind |
| Opt-out | If user has opted out of a consent preference then Fides sends string ("1YY") to Wunderkind |

Please follow the steps below to setup Wunderkind connector.

### Configuring Wunderkind Connector

###### 1. Log into your Fides Admin UI

###### 2. Click on the Privacy requests tab
![Step 2 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/f63fad83-8b96-4c3e-900d-a64f69c9657d/637c19c5-b66e-435f-83fe-aa4e71c8139c.png?crop=focalpoint&fit=crop&fp-x=0.1379&fp-y=0.1240&fp-z=2.3997&w=1200)


###### 3. Click on the Connection manager tab
![Step 3 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/7ed7f150-1cd0-47f2-a3f0-defe5768c63e/ed4c3738-377d-418b-97f3-9901ae26d945.png?crop=focalpoint&fit=crop&fp-x=0.0922&fp-y=0.3660&fp-z=2.3696&w=1200)


###### 4. Click on Create new connection
![Step 4 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/4c460d3a-aa5c-4d8b-b6fd-13b017a90ced/a2e2608e-951a-4926-940e-1bd800925533.png?crop=focalpoint&fit=crop&fp-x=0.9078&fp-y=0.2480&fp-z=2.7905&w=1200)


###### 5. Search and select Wunderkind
![Step 5 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/0140dae0-dd3a-44d3-902b-3260f260df7b/af1db86f-0a34-481c-8dd3-6145b22a94a9.png?crop=focalpoint&fit=crop&fp-x=0.8816&fp-y=0.7434&fp-z=3.1157&w=1200)


###### 6. Give a descriptive name and a unique identifier
![Step 6 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/a4e2ab42-ce13-4723-bb89-e09dda48420d/9322b4a6-057b-4326-90b2-5e6308266ff1.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.4708&fp-z=1.6917&w=1200)


###### 7. Enter the Website Id that you received when you registered with Wunderkind
![Step 7 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/39a07ec3-a3de-43e3-be88-1d17afe8f26a/1e198211-760b-4909-8140-2fcf7281784c.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.8130&fp-z=1.6917&w=1200)


###### 8. Click **Save**
![Step 8 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/3a53fca3-ad55-4fa8-bd64-fc1ef9ec1820/fc8ff54a-bf5b-4377-8a31-da9620a513d7.png?crop=focalpoint&fit=crop&fp-x=0.3259&fp-y=0.8939&fp-z=2.8812&w=1200)


###### 9. Click **Save** to associate the default dataset
![Step 9 screenshot](https://images.tango.us/workflows/4ba41586-c7f4-417f-9a0e-f219f7f65ae1/steps/86c6badd-a30c-4159-b576-78f241a5ae96/f8576e27-f283-4ed4-93ea-2f239dcb47b0.png?crop=focalpoint&fit=crop&fp-x=0.2218&fp-y=0.6592&fp-z=2.7905&w=1200)

**Your Wunderkind connector is now set up and ready to process consent requests!**
