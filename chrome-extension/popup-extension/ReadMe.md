# Chrome Extension Subsurge sample mv3
Use subsurge sdk to manage user payments and subscriptions and authentication all in one place for your mobile, desktop, web, and web extensions in one place

There are two possible ways to setup susbsurge in browser extension the prefered method is using the background page as a central client that communicates through messages to the other pages.


## Steps:

### Background.Js setup

First we need to import the script
```ts
//-- https://cdn.jsdelivr.net/npm/subsurge@1.0.3/dist/index.iife.js
importScripts('./index.iife.js');

```
Now we need to initialize the SDK client, and provide two important parameters:

1. options object containing app id and other client ids
2. reference to the chrome/browser 

```ts

const clientSDK = new SubsurgeSDK.APIClient({
    appId: '{{YOUR_APP_ID}}', // App Id on subsurge.com e.g 21a79421a7964ddcbf41222829041194
    // On background.js, we need to use the platformName 'browser-extension' 
    platformName: 'browser-extension',
    // Auth0 Client Id & Domain If you want to use Auth0 Auth
    auth0ClientId: "{{YOUR Auth0 ClientId}}", // for example "z2Nw7xeikj0s9wJSIOdaPuXdG8Q94125"
    auth0Domain: "{{YOUR Auth0 Domain}}" // e.g  "dev-wf241mdmk.us.auth0.com"
}, chrome); 
```

Last step is to ensure that the backend is listening on the messages

```ts
SubsurgeSDK.BrowserExtensionAdapter.startListeningForMessages(clientSDK, chrome);
```



### PopUp.Js setup
Here we need to also load the script in the popup.html page before the popup.js

```html
<!--  https://cdn.jsdelivr.net/npm/subsurge@1.0.3/dist/index.iife.js -->
    <script src="index.iife.js"></script>
    <script src="popup.js"></script>
```

Now we can create a message sender object to communicate with the background page


```ts
const messageSender = SubsurgeSDK.BrowserExtensionAdapter.createMessageSender(chrome);

// Can be used like this
await messageSender.loginWithGoogleFlow();
await messageSender.loginWithAuth0Flow();
await messageSender.logoutAsync();

const paymentLink = await messageSender.createPaymentLink(
        'aab117997a854c008886f7f92b226b13', // Product Id on subsurge
        'd23f090aa95440e8b9fd310af54b2806', // Package id
        'paypal' |// or 'stripe'
    );

// Open the payment page for the user
window.open(paymentLink, '_blank');

```