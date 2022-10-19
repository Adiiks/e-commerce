export default {
    oidc: {
        clientId: '{yourClientId}',
        issuer: 'https://{yourAddress}/oauth2/default',
        redirectUri: 'https://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']
    }
}
