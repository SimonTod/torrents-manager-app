import {environment} from '../environments/environment';

export class TokenService {

    constructor() {}

    static getWhitelistedDomains() {
        return [environment.apiDomain];
    }

    static getBlacklistedRoutes() {
        return environment.apiBlacklistedRoutes;
    }
}
