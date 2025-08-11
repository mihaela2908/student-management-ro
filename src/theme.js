// src/theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        gray: {
            50: '#F9FAFB',
            100: '#F7FAFC',
            200: '#E2E8F0',
            300: '#CBD5E0',
            400: '#A0AEC0',
            500: '#718096',
            600: '#4A5568',
            700: '#2D3748',
            800: '#1A202C',
            900: '#171923',
        },
        blue: {
            50: '#EFF6FF',
            100: '#DBEAFE',
            200: '#BFDBFE',
            300: '#93C5FD',
            400: '#60A5FA',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
            800: '#1E40AF',
            900: '#1E3A8A',
        }
    },
    fonts: {
        heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
        body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
    },
    styles: {
        global: {
            body: {
                bg: '#FAFBFC',
                color: 'gray.800',
            },
            '*': {
                boxSizing: 'border-box',
            }
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: '500',
                borderRadius: 'lg',
            },
            defaultProps: {
                size: 'md',
            },
        },
        Input: {
            defaultProps: {
                focusBorderColor: 'blue.500',
            },
            baseStyle: {
                field: {
                    borderRadius: 'lg',
                },
            },
        },
        Badge: {
            baseStyle: {
                borderRadius: 'full',
                px: 2,
                py: 1,
                fontSize: 'xs',
                fontWeight: '600',
                textTransform: 'uppercase',
            },
        },
    },
});

export default theme;