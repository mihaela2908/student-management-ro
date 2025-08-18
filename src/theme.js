// src/theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#2196f3',
            600: '#1e88e5',
            700: '#1976d2',
            800: '#1565c0',
            900: '#0d47a1',
        },
        bg: {
            surface: '#ffffff',
            accent: {
                default: '#f8fafc',
                subtle: '#e2e8f0',
            }
        }
    },
    fonts: {
        heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    },
    styles: {
        global: {
            body: {
                bg: '#F5F7FA',
                color: 'gray.800',
            },
        },
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'brand',
            },
        },
        Table: {
            variants: {
                simple: {
                    th: {
                        borderBottomWidth: '2px',
                        borderColor: 'gray.200',
                        backgroundColor: 'gray.50',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: 'xs',
                        letterSpacing: 'wider',
                        color: 'gray.700',
                    },
                    td: {
                        borderBottomWidth: '1px',
                        borderColor: 'gray.100',
                    },
                },
            },
        },
        Badge: {
            variants: {
                subtle: {
                    fontWeight: 'semibold',
                },
            },
        },
    },
});

export default theme;