// Core React and hooks for state management and lifecycle
import React, { useState, useEffect } from 'react';
// Axios for HTTP requests to external APIs
import axios from 'axios';
// Local component for rendering price charts
import PriceChart from './components/PriceChart';
// MUI components for layout and UI structure
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
// Animation and icon imports for enhanced user experience
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// --- Supported coins and their types for type safety ---
type Coin = 'bitcoin' | 'ethereum' | 'dogecoin' | 'cardano';
const coins: Coin[] = ['bitcoin', 'ethereum', 'dogecoin', 'cardano'];

// --- API response and chart data structure definitions ---
interface ApiResponse { prices: [number, number][]; }
interface HistoryPoint { time: string; value: number; }
type Histories = Record<Coin, HistoryPoint[]>;

// --- Layout configuration for the chart grid ---
const rows: Coin[][] = [
    ['bitcoin', 'ethereum'],
    ['dogecoin', 'cardano'],
];

const App: React.FC = () => {
    // Access the current theme for consistent styling
    const theme = useTheme();
    // State to hold historical price data for all coins
    const [histories, setHistories] = useState<Histories>({
        bitcoin: [], ethereum: [], dogecoin: [], cardano: []
    });

    useEffect(() => {
        // Fetch historical price data for all coins and update state
        const loadAll = async () => {
            const entries = await Promise.all(
                coins.map(async (coin) => {
                    try {
                        // Query CoinGecko API for 1-day price history
                        const res = await axios.get<ApiResponse>(
                            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
                            { params: { vs_currency: 'usd', days: 1 } }
                        );
                        // Format timestamps and prices for charting
                        const formatted = res.data.prices.map(([ts, price]) => ({
                            time: new Date(ts).toLocaleTimeString('en-US', {
                                timeZone: 'America/New_York',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            }),
                            value: parseFloat(price.toFixed(2)),
                        }));
                        return [coin, formatted] as [Coin, HistoryPoint[]];
                    } catch {
                        // Gracefully handle API errors by returning empty data
                        return [coin, []] as [Coin, HistoryPoint[]];
                    }
                })
            );
            // Update state with the latest fetched data
            setHistories(Object.fromEntries(entries) as Histories);
        };

        loadAll();
        // Set up periodic refresh every 60 seconds
        const iv = setInterval(loadAll, 60000);
        return () => clearInterval(iv);
    }, []);

    return (
        <Box
            height="100vh"
            display="grid"
            gridTemplateRows="auto 1fr"
            p={0}
            sx={{
                backgroundColor: theme.palette.background.default,
                backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-matter.png')`,
                backgroundRepeat: 'repeat',
            }}
        >
            {/* AppBar header with semi-transparent overlay and branding */}
            <AppBar
                position="static"
                color="transparent"
                elevation={0}
                sx={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
            >
                <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
                    <Box
                        component={motion.div}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <TrendingUpIcon
                            sx={{
                                fontSize: '2.5rem',
                                color: theme.palette.secondary.main,
                                mr: 1
                            }}
                        />
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                background: 'linear-gradient(45deg, #90caf9, #f48fb1)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                                letterSpacing: '0.08em',
                                userSelect: 'none'
                            }}
                        >
                            CryptoDash
                        </Typography>
                        <Typography
                            variant="body2"
                            component="a"
                            href="https://github.com/hussrepo"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                background: 'linear-gradient(45deg, #90caf9, #f48fb1)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                                textDecoration: 'none',
                                fontSize: '0.875rem',
                                alignSelf: 'center',
                                position: 'absolute',
                                right: 32,
                                top: '50%',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            @hussrepo
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Responsive 2×2 chart grid for displaying each coin's price history */}
            <Box
                gridRow="2"
                display="grid"
                gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                gridTemplateRows="1fr 1fr"
                gap={2}
                sx={{ overflow: 'hidden' }}
            >
                {rows.flat().map((coin) => (
                    <Paper
                        key={coin}
                        elevation={4}
                        sx={{
                            p: 2,
                            backgroundColor: theme.palette.background.paper,
                            height: '100%'
                        }}
                    >
                        <Typography variant="h5" color="secondary" gutterBottom>
                            {coin.charAt(0).toUpperCase() + coin.slice(1)}
                        </Typography>
                        <Box sx={{ height: 'calc(100% - 40px)' }}>
                            <PriceChart data={histories[coin]} />
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

// Export the main App component for rendering
export default App;
