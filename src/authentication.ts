import { ZObject, HttpResponse, Bundle } from 'zapier-platform-core';
import Constants from './constants';

const getAccessToken = async (z: ZObject, bundle: Bundle) => {
    const response: HttpResponse = await z.request(`${Constants.AUTH_BASE}/token`, {
        method: 'POST',
        params: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: bundle.inputData.redirect_uri,
            grant_type: 'authorization_code',
            code: bundle.inputData.code
        }
    });

    if (response.status !== 200) {
        throw new Error('Unable to get an access token from YNAB: ' + response.content);
    }

    return response.json;
};

const refreshAccessToken = async (z: ZObject, bundle: Bundle) => {
    const response: HttpResponse = await z.request(`${Constants.AUTH_BASE}/token`, {
        method: 'POST',
        params: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: bundle.inputData.redirect_uri,
            grant_type: 'refresh_token',
            refresh_token: bundle.authData.refresh_token
        }
    });

    if (response.status !== 200) {
        throw new Error('Unable to refresh access token with YNAB: ' + response.content);
    }

    return response.json;
};

const testAuth = async (z: ZObject) => {
    const response: HttpResponse = await z.request({
        url: `${Constants.API_BASE}/user`
    });

    if (response.status === 401) {
        throw new Error('The username and/or password you supplied is incorrect');
    }

    const userData: any = response.json;
    console.log('testAuth response: ', response);

    return userData.data.user;
};

const Authentication = {
    type: 'oauth2',
    oauth2Config: {
        authorizeUrl: {
            url: `${Constants.AUTH_BASE}/authorize`,
            params: {
                client_id: '{{process.env.CLIENT_ID}}',
                redirect_uri: '{{bundle.inputData.redirect_uri}}',
                state: '{{bundle.inputData.state}}',
                response_type: 'code'
            }
        },
        getAccessToken: getAccessToken,
        refreshAccessToken: refreshAccessToken,
        autoRefresh: true
    },
    test: testAuth,
    connectionLabel: '{{id}}'
};

export default Authentication;