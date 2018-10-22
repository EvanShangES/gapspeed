/**
 * Created by Evan on 2018-01-18.
 */
var jsArray = [];

function loadScript(scriptName, callback) {
    if (!jsArray[scriptName]) {
        jsArray[scriptName] = true;

        // adding the script tag to the head as suggested before
        var body = document.getElementsByTagName('body')[0];

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptName;

        // then bind the event to the callback function
        // there are several events for cross browser compatibility
        script.onload = callback;

        console.log(script);
        // fire the loading
        body.appendChild(script);

        // clear DOM reference
        //body = null;
        //script = null;

        //callback(scriptName);
    } else if (callback) {
        // changed else to else if(callback)
        if (window.appConfig.debugState){
            console.log("This script was already loaded %c: " + scriptName, window.appConfig.debugStyle_warning);
        }
        //execute function
        callback(scriptName);
    }
}

function preloadComponents($appId, components) {
    var $scriptArray = [];
    var $SmartAdmin = 'SmartAdmin';

    for (var i = 0; i < components.length; i++) {
        var packageName = components[i].replace($SmartAdmin, 'common');
        var component = packageName.replace($appId + '.', '').toLowerCase().split('.');
        var path = "components/" + component[0];
        console.log(component[0]);

        if(component.length > 1){
            $scriptArray.push(path + "/" + component[1] + "/" + component[1] + ".js");
            $scriptArray.push(path + "/" + component[1] + "/" + component[1] + "Service.js");
        }else {
            $scriptArray.push(path + "/" + component[0] + ".js");
            $scriptArray.push(path + "/" + component[0] + "Service.js");
        }
    }

    var $cur = 0;
    var $max = $scriptArray.length;
    var loadComponent = function(){
        if ($cur >= $max) {
            if (window.appConfig.debugState){
                console.log("%cAll components are loaded...", window.appConfig.debugStyle_success);
            }
            loadScript('app/' + $appId + '.app.js', function() {
                $(function () {
                    angular.bootstrap(document, [ $appId ]);
                    if (window.appConfig.debugState){
                        console.log("%c" + $appId + " application is loaded...", window.appConfig.debugStyle_success);
                    }
                });
            })
        }else {
            if (window.appConfig.debugState){
                console.log("Load component %c\"" + $scriptArray[$cur] + "\"", window.appConfig.debugStyle);
            }
            loadScript($scriptArray[$cur], loadComponent);
            $cur++;
        }
    }

    loadComponent();
}

function preloadPlugins(plugins) {
    console.log('hello');

    var $scriptArray = [];

    for (var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i].replace('.', '/') + ".js";
        $scriptArray.push("/plugin/" + plugin);
    }

    var $cur = 0;
    var $max = $scriptArray.length;
    var loadComponent = function(){
        if ($cur < $max) {
            if (window.appConfig.debugState){
                console.log("Load script %c\"" + $scriptArray[$cur] + "\"", window.appConfig.debugStyle);
            }
            loadScript($scriptArray[$cur], loadComponent);
            $cur++;
        }
    };

    loadComponent();
}

function bulkLoad(scripts) {
    console.log('hello');

    for (var i = 0; i < scripts.length; i++) {
        var ext = scripts[i].split(".").pop();
        if(ext === "js"){
            loadScript(scripts[i], function(){});
        }
    }

}

//if (angular.isDefined($plugins)) {
//    preloadPlugins($plugins);
//}

if (angular.isDefined($appId) && angular.isDefined($components)) {
    preloadComponents($appId, $components);
}
