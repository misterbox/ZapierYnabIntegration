import { ZObject, Bundle } from "zapier-platform-core";

const addAuthHeader = (request: any, z: ZObject, bundle: Bundle) => {
    if (bundle.authData.access_token) {
        request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
    }

    return request;
};

const Middleware = {
    addAuthHeader: addAuthHeader
};

export default Middleware;