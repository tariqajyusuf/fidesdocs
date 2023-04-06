import Callout from 'nextra-theme-docs/callout'

# Sovrn Connector (Consent)

## Implementation Summary

Sovrn does not currently offer an API connection for consent requests. When a user submits a request (ex. Opt Out), Fides sends an Email to the specified Email address requesting that they stop processing this user's information.

|Consent Request | Description |
|----|----|
| Opt-in | No action is taken. |
| Opt-out | Fides will send an email to Sovrn requesting them to stop processing user information. |

Please follow the steps below to setup Sovrn connector.

### Configuring Sovrn Connector

###### 1. Log into your Fides Admin UI


###### 2. Click on the Privacy requests tab
![Step 2 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/74df8fb1-3b60-4fd3-bab2-1003a0113409/da2187d1-81b7-4067-abaa-b8b6a9ef5d78.png?crop=focalpoint&fit=crop&fp-x=0.1379&fp-y=0.1240&fp-z=2.3997&w=1200)


###### 3. Click on Connection manager
![Step 3 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/d1d9df3c-cb62-4922-b957-2e6e0e84afcf/763287b1-3aad-4f0c-8a37-07e415ac8820.png?crop=focalpoint&fit=crop&fp-x=0.0922&fp-y=0.3660&fp-z=2.3696&w=1200)


###### 4. Click on Create new connection
![Step 4 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/9a977812-0f81-4a61-a450-e11879908cf7/38c3529a-8de1-4a9a-b5dd-a3b72e15729c.png?crop=focalpoint&fit=crop&fp-x=0.9078&fp-y=0.2480&fp-z=2.7905&w=1200)


###### 5. Select Sovrn from the list
![Step 5 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/806b2456-e014-4868-a56d-362afd06637a/c52dc271-5afa-4323-b287-4e0610a40f7c.png?crop=focalpoint&fit=crop&fp-x=0.4897&fp-y=0.6041&fp-z=2.0395&w=1200)


###### 6. Enter a descriptive name for the connector
![Step 6 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/071cee0f-a977-4a02-904e-2e5255371f7e/93594f7d-ca18-4577-a46e-03f4cd5d9cc3.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.4483&fp-z=1.6917&w=1200)


###### 7. Enter a unique connection identifier
![Step 7 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/62a168fa-42cf-4136-bff5-b28ad26a1d97/b37bdb09-abef-495e-8870-ffbe5afb3cdd.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.6817&fp-z=1.6917&w=1200)


###### 8. Enter the Recipient's Email Address (privacy@sovrn.com)
![Step 8 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/2efd232f-1339-4374-9992-746f634b3f3b/ee6af180-a0dc-433b-b3fe-57d0eb5947b9.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.7414&fp-z=1.6917&w=1200)


###### 9. [Optional] To test the connector, enter your email address and use the **Test email** button.
![Step 9 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/6fb3d9d6-f1ce-4bdd-a801-19410beac17c/e6ad9af2-21bc-452a-b861-08bb53c12576.png?crop=focalpoint&fit=crop&fp-x=0.4619&fp-y=0.8501&fp-z=1.6917&w=1200)


###### 10. Click **Save**
![Step 10 screenshot](https://images.tango.us/workflows/efccddff-393d-4d52-a747-ebadf74690e0/steps/5bf3684e-0bb7-4961-bdad-abfc823d2260/962f488a-0064-45b8-a691-6be730323c56.png?crop=focalpoint&fit=crop&fp-x=0.2968&fp-y=0.9310&fp-z=2.8812&w=1200)

**Your Sovrn connector is now set up and ready to process consent requests!**
