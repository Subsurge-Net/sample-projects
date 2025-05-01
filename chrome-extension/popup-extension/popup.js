/**
 * This is the message sender for the popup page to communicate with the background script SDK
 * it internally uses chrome.runtime.sendMessage to send messages to the background script to execute 
 * the methods on the SDK with the arguments provided
 *  */
const messageSender = SubsurgeSDK.BrowserExtensionAdapter.createMessageSender(chrome);


const loginPage = document.getElementById("login-page");
const mainPage = document.getElementById("main-page");
const loadingPage = document.getElementById("loading-page");
const userInfoDiv = document.getElementById("userInfo");
const appInfoDiv = document.getElementById("appInfo");
const googleLoginButton = document.getElementById("login-google");
const auth0LoginButton = document.getElementById("login-auth0");
const logoutButton = document.getElementById("logout");
const createPaymentLink = document.getElementById("createPaymentLink");


/**
 * Adding Event Listeners to the buttons
 */

googleLoginButton.addEventListener("click", async () => {
    await messageSender.loginWithGoogleFlow();
    await showMainPage();
});

auth0LoginButton.addEventListener("click", async () => {
    await messageSender.loginWithAuth0Flow();
    await showMainPage();
});

logoutButton.addEventListener("click", async () => {
    const result = await messageSender.logoutAsync();
    showLoginPage();
});


createPaymentLink.addEventListener("click", async () => {
    const response = await messageSender.createPaymentLink(
        'eeb997997a854c008886f7f92b226b13',
        'd11f090aa95440e8b9fd310af54b2806',
        'paypal'
    );
 
    window.open(response, '_blank');
});



(async () => {
    let response = await messageSender.isAuthenticated();
    if (response) {
        await showMainPage();
    } else {
        showLoginPage();
    }
})();


/**
 * Update the UI based on the response from the background script
 */

function showLoginPage() {
    loginPage.style.display = "block";
    mainPage.style.display = "none";
    loadingPage.style.display = "none";
}

async function showMainPage() {
    const response = await messageSender.loadUserInfo();
    renderUserInfo(response);
    loginPage.style.display = "none";
    mainPage.style.display = "block";
    loadingPage.style.display = "none";
}

function showLoadingPage() {
    loadingPage.style.display = "block";
    loginPage.style.display = "none";
    mainPage.style.display = "none";
}

function renderUserInfo(user) {
    userInfoDiv.innerHTML = `
        <h4>User Info</h4>
        <p>Email: ${user.email}</p>`;
    if (user.currentSubscription) {
        userInfoDiv.innerHTML += `
            <p>currentSubscription status: ${user.currentSubscription?.status}</p>
            <p>currentSubscription creationTime: ${user.currentSubscription?.creationTime}</p>
        `;
    } else {
        userInfoDiv.innerHTML += `
            <p>No current subscription</p>
        `;
    }
}
