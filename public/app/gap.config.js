'use strict';

var appConfig = window.appConfig || {};
window.appConfig = appConfig;
//
// appConfig.apiUrl = "http://localhost:8080/api";
// appConfig.cleanCloudUrl = "https://cleancloudapp.com/api/";
// appConfig.cleanCloudAPIKey = "KMniYhLn1585343mPkZcvbDF";
//
// /******************************************************************************
//  * Configurations : Components and Dependencies
//  ******************************************************************************/
// 'use strict';

var $appId = 'gap';

var $dependencies = [
    'ui.router'
];

var $components = [
    'gap.home',
    'gap.products',
    'gap.about',
    'gap.contact'
];

$dependencies = $dependencies.concat($components);