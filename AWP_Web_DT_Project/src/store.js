import * as msal from "@azure/msal-browser";
import { Client } from "@microsoft/microsoft-graph-client";
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            msalInstance: new msal.PublicClientApplication({
                auth: {
                    clientId: process.env.VUE_APP_MICROSOFT_OAUTH_CLIENT_ID,
                    redirectUri: "http://localhost:8080/"
                },
                cache: {
                    cacheLocation: "sessionStorage"
                }
            }),
            graphClient: Client.init({
                authProvider: callback => {
                    if (store.state.msalInstance.getActiveAccount()) {
                        store.state.msalInstance.acquireTokenSilent({
                            scopes: ["user.read", "mail.read"],
                            account: store.state.msalInstance.getActiveAccount()
                        })
                            .then(res => {
                                callback(null, res.accessToken)
                            })
                    } else {
                        callback(null, null)
                    }
                }
            }),
        }
    },
    mutations: {
        setCurrentMicrosoftAccount(state, account) {
            state.msalInstance.setActiveAccount(account)
            location.reload()
        },
    },
    actions: {
        loginMicrosoft(context) {
            return context.state.msalInstance.handleRedirectPromise()
                .then(authResult => {
                    if (authResult && authResult.account) {
                        context.commit("setCurrentMicrosoftAccount", authResult.account)
                    } else {
                        return context.state.msalInstance.loginPopup({
                            scopes: ["User.Read", "Mail.Read"]
                        }).then(authResult => {
                            context.commit("setCurrentMicrosoftAccount", authResult.account)
                        })
                    }
                })
        },
        loginGoogle() {
            alert('This functionality is still in development.\n It will be available soon !\n Please come back later.')
        },
        logout(context) {
            if (context.state.msalInstance.getActiveAccount()) {
                return context.state.msalInstance.logoutRedirect()
                    .then(() => {
                        context.commit("setMsalActiveAccount", null)
                    })
            } else {
                console.log('must logout google')
            }
        }
    }
});

export default store;
