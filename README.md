# gatsby-source-google-reviews-en

This is forked/modified from https://github.com/unmaskz/gatsby-source-google-reviews/ by unmaskz

This source plugin will allow you to include google place reviews in your gasby graph

Requirements:

- Google Place Id
- Scale Serp API key: www.scaleserp.com

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
      apiKey: GATSBY_SCALE_SERP_API_KEY,
    },
  },
]
```

You can find your place id [here](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder). Simply input the business or location name and Google will do the rest.

## Query reviews

### All Reviews

```
{
  googleReview {
    id
    rating
    position
    body
    date
    sourceLink
    sourceImage
    position
    source
    position
  }
}
```

### Single Review

```
{
  allGoogleReview{
    nodes{
      id
      rating
      position
      body
      date
      sourceLink
      sourceImage
      position
      source
      position
    }
  }
}
```

Your Support is appreceated and goes a long way to keeping open source software available and maintained:
Buy me a coffee: https://www.buymeacoffee.com/stargazerllc
