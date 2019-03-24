import { Inject } from '@angular/core';
import { ApplicationConfig, MY_CONFIG, MY_CONFIG_TOKEN } from '../app/app.config';

export class TokenService {
    config: ApplicationConfig;

    constructor(
        @Inject(MY_CONFIG_TOKEN) configuration: ApplicationConfig
    ) {
        this.config = configuration;
    }

    getWhitelistedDomains() {
        return [this.config.apiDomain];
    }

    getBlacklistedRoutes() {
        return this.config.apiBlacklistedRoutes;
    }
}