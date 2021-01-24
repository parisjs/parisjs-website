# ParisJS

This repository contains the code for the [parisjs.org](https://parisjs.org/) website.

## Acknowledgements

[![Powered by Vercel](./public/assets/powered-by-vercel.svg)](https://vercel.com/?utm_source=meetup-parisjs&utm_campaign=oss)

Thanks to Vercel sponsoring this project by allowing it to be deployed for free for the entire ParisJS Team.

## Getting started

* Clone this repository
* `yarn install`
* `yarn dev`
* Open `http://localhost:3000` in your browser

## Coding standards

* Code is formatted with [prettier](https://prettier.io).
* CSS follows a BEM-ish style.

## Help section

### Some avatars seem to be missing

You can try running `yarn avatars:sync` to get the missing avatars if they are available and then create a pull request.

### How to post talks when running the app locally ?

1. Create a GitHub OAuth app via https://github.com/settings/developers
2. Choose http://localhost:3000 as both a "Homepage URL" and a "Authorization callback URL"
3. Copy your "Client ID" and your "Client Secrets"
4. register your app in https://auth-server.herokuapp.com/ (We can't signin from our website without a backend or auth proxy)
5. The domain should be "http://localhost:3000" and the grant url "https://github.com/login/oauth/access_token"
6. Create a .env.local file
6. Add the client id as "GITHUB_APP_ID"
7. You should probably switch the default env variables "GITHUB_TALK_REPO_OWNER" and "GITHUB_TALK_REPO_NAME" to avoid spamming the default repository
8. Start the app locally !

### I want to tweak the search functionality locally (ranking, reindexing etc)

1. Signup to algolia
2. Create a .env.local file
3. fill the env variables: ALGOLIA_APPLICATION_ID, PUBLIC_ALGOLIA_API_KEY and ALGOLIA_ADMIN_KEY
4. `yarn algolia:index`
5. Start the app locally !
