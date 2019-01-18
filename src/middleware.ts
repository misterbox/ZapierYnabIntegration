import { ZObject, Bundle, HttpResponse } from "zapier-platform-core";

const addAuthHeader = (request: any, z: ZObject, bundle: Bundle) => {
    if (bundle.authData.access_token) {
        request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
    }

    return request;
};

const handleHttpError = (response: HttpResponse, z: ZObject) => {
    if (response.status >= 400) {
        z.console.log(`Status: ${response.status}`);
        z.console.log(`Content: ${response.content}`);
        z.console.log(`Request: ${JSON.stringify(response.request)}`);

        throw new Error(`Got an unexpected response from YNAB API: ${response.content}`);
    }

    return response;
};

const Middleware = {
    AddAuthHeader: addAuthHeader,
    HandleHttpError: handleHttpError
};

export default Middleware;