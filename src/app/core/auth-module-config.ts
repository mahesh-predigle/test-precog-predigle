import { OAuthModuleConfig } from 'angular-oauth2-oidc';

export const authModuleConfig: OAuthModuleConfig = {
  resourceServer: {
    allowedUrls: ['http://www.angular.at/api', 'http://localhost:4200/'],
    sendAccessToken: true,
  }
};
