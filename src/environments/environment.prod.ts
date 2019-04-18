export const environment = {
  production: true,
  apiDomain: "api.torrents-manager.siju.tk",
  apiEndpoint: "https://api.torrents-manager.siju.tk",
  apiBlacklistedRoutes: [
      "api.torrents-manager.siju.tk/login_check",
      "api.torrents-manager.siju.tk/register",
      "api.torrents-manager.siju.tk/token/refresh"
  ]
};
