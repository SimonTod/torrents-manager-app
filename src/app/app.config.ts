import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    apiDomain: string;
    apiEndpoint: string;
    apiBlacklistedRoutes: Array<string>;
}

export const MY_CONFIG = {
    // apiDomain: "api.torrents-manager.local",
    // apiEndpoint: "http://api.torrents-manager.local/app_dev.php",
    // apiBlacklistedRoutes: [
    //     "api.torrents-manager.local/app_dev.php/login_check",
    //     "api.torrents-manager.local/app_dev.php/register",
    //     "api.torrents-manager.local/app_dev.php/token/refresh"
    // ],
    // chatUrl: "http://localhost:8080"

    apiDomain: "api.torrents-manager.siju.tk",
    apiEndpoint: "https://api.torrents-manager.siju.tk",
    apiBlacklistedRoutes: [
        "api.torrents-manager.siju.tk/login_check",
        "api.torrents-manager.siju.tk/register",
        "api.torrents-manager.siju.tk/token/refresh"
    ],
    chatUrl: "https://api.torrents-manager.siju.tk:8080"
};

export const MY_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');