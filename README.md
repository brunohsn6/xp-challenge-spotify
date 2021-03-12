# xp-challenge-spotify

XP challenge of spotify application development

### Features

- Spotify Web API
- React
- Typescript
- Axios
- Redux
- Sass/SCSS
- Firebase Deploy

# About the Application

- Request Spotify Token
- Token persistence and request a new when current expires
- Search artists, tracks or albums
- List musics of an album
- Play music preview

> note: The Spotify Token must contain 'user-top-read', 'user-read-recently-played' and 'user-read-private' on its scope. For more info about token scopes, see Spotify API Doc.

[Spotify API Doc](https://developer.spotify.com/documentation/web-api/reference/)
[Spotify API - Scope](https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes)

Check the application at: https://xp-spotifyapp.web.app/

### Run Application

```
# Install Node Dependencies
npm install
// Running with development environment configurations
npm start or npm run start:dev
// Running with homolog environment configurations
npm run start:hml
// Running with prod environment configurations
npm run start:prd
```

### Build Application

```
// Building with development environment configurations
npm start or npm run build:dev
// Building with homolog environment configurations
npm run build:hml
// building with prod environment configurations
npm run build:prd
```
