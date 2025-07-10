# CryptoDash

CryptoDash is a React-based web application that provides real-time cryptocurrency price tracking and visualization. The app fetches data from the CoinGecko API and displays it in an interactive and visually appealing format using Material-UI and Recharts.

## Features

- **Real-Time Price Updates**: Automatically fetches and updates cryptocurrency prices every minute.
- **Interactive Charts**: Displays historical price data for Bitcoin, Ethereum, DogeCoin, and Cardano using responsive line charts.
- **Modern UI**: Built with Material-UI for a sleek, responsive design, and includes animations from Framer Motion.
- **GitHub Integration**: Includes a link to my GitHub profile in the app header.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Material-UI (MUI), Framer Motion
- **Charts**: Recharts
- **API**: CoinGecko API
- **HTTP Client**: Axios
- **State Management**: React Hooks (`useState`, `useEffect`)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/hussrepo/CryptoDash.git
    cd CryptoDash
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```

4.  Open the app in your browser at `http://localhost:3000`

## File Structure

-   `src/App.tsx`: Main application file that sets up the layout, fetches data, and renders components.
-   `src/components/PriceChart.tsx`: Component for rendering interactive line charts of cryptocurrency prices.

## API Integration

The app uses the [CoinGecko API](https://www.coingecko.com/en/api) to fetch historical price data for the following cryptocurrencies:
-   Bitcoin
-   Ethereum
-   DogeCoin
-   Cardano

The API requests are made using Axios, and the data is processed to extract relevant price information for chart rendering.