//-- https://cdn.jsdelivr.net/npm/subsurge@1.0.3/dist/index.iife.js
importScripts('./index.iife.js');

//-- IMPORTANT: Make sure to set the Redirect URL in Auth0 and/or google console to use their auth flow
console.log('redirect url', chrome.identity.getRedirectURL());

const clientSDK = new SubsurgeSDK.APIClient({
    /**
     * On background.js, we need to use the platformName 'browser-extension' 
     * if on popup page or any web page the value should be 'web'
     *  */
    platformName: 'browser-extension',
    appId: '{{YOUR_APP_ID}}', //-- App Id on subsurge.com

    /**
     * Google Client Id If you want to use Google Auth
     *  */
    googleClientId: "{{YOUR Google ClientId}}",

    /**
     * Auth0 Client Id & Domain If you want to use Auth0 Auth
     *  */
    auth0ClientId: "{{YOUR Auth0 ClientId}}",
    auth0Domain: "{{YOUR Auth0 Domain}}"

    
}, 
chrome //-- chrome or firefox
);

//-- Start listening for messages from the popup page
SubsurgeSDK.BrowserExtensionAdapter.startListeningForMessages(clientSDK, chrome);
