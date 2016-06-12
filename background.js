function getParamValue(url, name) {
    "use strict";

    var params  = url.substr(url.indexOf("#") + 1);
    params = params.split("&");
	var value;

    for (var index = 0; index < params.length; index += 1) {
        var temp = params[index].split("=");

        if (temp[0] === name) {
            value = temp[1];
            break;
        }
    }
    return value;
}

function onError(title, message) {
    "use strict";
    alert(title + '\n' + message);
}


function Request(url, params){

    this.url = url;
    this.params = params;

    this.create = function() {
        return !urlFree() ? url + "?"+ createParams() : null;
    };

    function createParams(){
        if (checkParams()) {
            throw "params array can't be undefined"
        }
        var generated = [];
        for (var index in params) {
            var name = index;
            var value = params[index];
            generated.push(name + "=" + value);
        }
        return generated.join("&");
    }

    function urlFree() { 
        return url.length == 0; 
    }

    function checkParams() {
        return params === undefined;
    }
}


function authorize() {
    "use strict";
    var params  = new Array();
    params['client_id']     = "5137509";
    params['redirect_uri']  = "https://oauth.vk.com/blank.html";
    params['display']       = "page";
    params['scope']         = "wall,friends,photos, groups,offline";
    params['response_type'] = "token";
    params['v']             = "5.40";
    var request = new Request("https://oauth.vk.com/authorize", params);
    chrome.storage.sync.get('vkauthtoken', function(item) {
        if ($.isEmptyObject(item)) {
            chrome.tabs.create({url: request.create()}, function(tab){
                chrome.tabs.onUpdated.addListener(authListener(tab.id));
            });
        }
    });
}

function authListener(authTabId) {
    "use strict";
    return function tabListener(tabId, tabInfo) {
        if (tabInfo !== undefined) {
            if (tabInfo.url.indexOf('oauth.vk.com/blank.html#access_token') > -1) {
                chrome.tabs.onUpdated.removeListener(tabListener);
                var token = getParamValue(tabInfo.url, 'access_token');
                if (token === undefined || token.length === undefined) {
                    onError("unable to authorize", "please try later");
                    return;
                }
                chrome.storage.sync.set({'vkauthtoken': token}, function(){
                    chrome.tabs.remove(tabId);
                });
                var userID = getParamValue(tabInfo.url, 'user_id');
                chrome.storage.sync.set({'userid': userID});
                var expires = getParamValue(tabInfo.url, 'expires_in');
                chrome.storage.sync.set({'expiresin': expires});
            }
        }
    }
}

chrome.runtime.onInstalled.addListener(function(){
    authorize();
})
