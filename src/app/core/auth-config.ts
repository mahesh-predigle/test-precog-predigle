import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,// for not checking exact above url in given
    redirectUri: window.location.origin,
    silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',// redirect after logged in to google to my application
    clientId:
        '101289191754-ue0omn4map44ra6enrtat6kui29up7kh.apps.googleusercontent.com',
    responseType: 'token id_token',
    scope: 'openid profile email',
    showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
    useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
    silentRefreshTimeout: 1000, // For faster testing
    timeoutFactor: 0.25, // For faster testing
    sessionChecksEnabled: true,
    clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
    nonceStateSeparator: 'semicolon'// Real semicolon gets mangled by Duende ID Server's URI encoding
};