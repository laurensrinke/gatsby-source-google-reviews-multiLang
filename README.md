# gatsby-source-google-reviews-en

This is forked/modified from https://github.com/unmaskz/gatsby-source-google-reviews/ by unmaskz

This source plugin will allow you to include google place reviews in your gasby graph using the native google api.

Requirements:

- Google Place Id
- Google places API Key

## Instalation

```
npm i gatsby-source-google-reviews-en
```

```
yarn add gatsby-source-google-reviews-en
```

```
plugins: [
  {
    resolve: `gatsby-source-google-reviews-en`,
    options: {
      placeId: `placeid`,
      apiKey: GATSBY_GOGGLE_API_KEY,
    },
  },
]
```

You can find your place id [here](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder). Simply input the business or location name and Google will do the rest.

## Query reviews

### All Reviews Schema

```
{
  googleReview {
  sourceImage: String
      sourceLink: String
      id: ID
      position: Int
      author_name: String
      author_url: String
      language: String
      rating: Int
      profile_photo_url: String
      time: Int
      relative_time_description: String
      text: String
  }
}
```

### Single Review

```
{
  allGoogleReview{
    nodes{
      sourceLink: String
      id: ID
      position: Int
      author_name: String
      author_url: String
      language: String
      rating: Int
      profile_photo_url: String
      time: Int
      relative_time_description: String
      text: String
    }
  }
}
```

Your Support is appreceated and goes a long way to keeping open source software available and maintained:
Buy me a coffee: https://www.buymeacoffee.com/stargazerllc
