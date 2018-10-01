'use strict';

var appConfig = window.appConfig || {};
window.appConfig = appConfig;

appConfig.apiUrl = "http://localhost:8080/api";
appConfig.cleanCloudUrl = "https://cleancloudapp.com/api/";
appConfig.cleanCloudAPIKey = "KMniYhLn1585343mPkZcvbDF";

/******************************************************************************
 * Configurations : Components and Dependencies
 ******************************************************************************/
'use strict';

var $appId = 'mrbaffo';

var $dependencies = [
    'ui.router'
];

var $components = [
    'mrbaffo.login',
    'mrbaffo.register',
    'mrbaffo.forgotpass',
    'mrbaffo.user',
    'mrbaffo.user.account',
    'mrbaffo.user.order',
    'mrbaffo.user.referral',
    'mrbaffo.user.admin',
    'mrbaffo.user.verify'
];

$dependencies = $dependencies.concat($components);