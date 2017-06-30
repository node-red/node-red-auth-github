# Node-RED Authentication with GitHub

[Node-RED](https://nodered.org) plugin for authenticating users with GitHub.

This modules lets you restrict access to the Node-RED editor to specific GitHub
users.

**Note:** this requires Node-RED 0.17 or later


## Install

In your Node-RED user directory, typically `~/.node-red`:

    $ npm install node-red/node-red-auth-github

## Usage

### Register a new GitHub application

To enable access control with GitHub, you must first [register a new application
on your GitHub account](https://github.com/settings/developers).

Once created, you will be provided a _Client ID_ and _Client Secret_ that
you will need to use to configure the authentication plugin.

### Configure `adminAuth`

Access control for the Node-RED editor is configured in your `settings.js` file
using the `adminAuth` property.

    adminAuth: require('node-red-auth-github')({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        baseURL: "http://localhost:1880/",
        users: [
           { username: "knolleary",permissions: ["*"]}
        ]
    })

The `baseURL` property is the URL used to access the Node-RED editor.

The `users` property is the list of GitHub users who are allowed to access the
editor. It is the same as used by `adminAuth` as described in the [security documentation](http://nodered.org/docs/security), but without the `password` property.

A default user can be specified by adding a `default` property to the options object:

        users: [
           ...
        ],
        default: {
            permissions: "read"
        }

## Copyright and license

Copyright JS Foundation and other contributors, http://js.foundation under [the Apache 2.0 license](LICENSE).
