/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var path = require("path");
var githubStrategy = require("passport-github");

var requiredOptions = [
    'clientID',
    'clientSecret',
    'baseURL',
    'users'
];

module.exports = function(opts) {
    for (var i=0;i<requiredOptions.length;i++) {
        if (!opts.hasOwnProperty(requiredOptions[i])) {
            throw new Error("Missing auth option: "+requiredOptions[i]);
        }
    }

    var callbackURL = opts.baseURL+
        ((opts.baseURL[opts.baseURL.length-1] === "/")?"":"/")+
        "auth/strategy/callback";

    var adminAuth = {
        type:"strategy",
        strategy: {
            name: "github",
            label: 'Sign in with GitHub',
            icon:"fa-github",
            strategy: githubStrategy.Strategy,
            options: {
                clientID: opts.clientID,
                clientSecret: opts.clientSecret,
                callbackURL: callbackURL
            },
            verify: function(accessToken, refreshToken, profile, done) {
                done(null,profile);
            }
        },
        users: opts.users
    };
    if (opts.hasOwnProperty('default')) {
        adminAuth.default = opts.default;
    }

    return adminAuth;

};
