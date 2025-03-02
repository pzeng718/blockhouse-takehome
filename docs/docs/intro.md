---
id: intro
title: Introduction
---

# Crypto Price Tracker

This documentation describes the implementation details of the Crypto Price Tracker project.

## Project Setup Guide

### Web App (Next.js)

1. Navigate to the `web-app` directory.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### Documentation (Docusaurus)

1. Navigate to the `docs` directory.
2. Install dependencies: `npm install`
3. Start the Docusaurus site: `npm run start`

## API Integration Details

The dashboard fetches live cryptocurrency prices from the [CoinGecko API](https://www.coingecko.com/en/api):

- **Endpoint:** `/api/v3/coins/markets`
- **Parameters:** `vs_currency=usd` and a comma-separated list of cryptocurrency IDs.
- **Method:** GET request using Axios.
- **State Management:** Data is fetched and cached with React Query, which handles loading, errors, and refetching.

## State Management

React Query was chosen for state management because:

- It simplifies API data fetching and caching.
- It provides built-in support for loading and error states.
- It makes it easy to refetch data (e.g., via the “Refresh” button).

## Challenges & Solutions

- **API Rate Limiting:** CoinGecko has rate limits. React Query’s caching minimizes unnecessary requests.
- **UI Responsiveness:** The design was kept minimal and responsive with simple inline CSS.
- **State Synchronization:** React Query abstracts away much of the boilerplate needed to manage API state effectively.
