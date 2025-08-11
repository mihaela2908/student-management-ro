// src/ResizableDrawer/ResizableHandle.jsx

import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const ResizableHandle = ({ onMouseDown, isResizing }) => {
    return (
        <Box
            position="relative"
            width="8px"
            height="100%"
            cursor="ew-resize"
            onMouseDown={onMouseDown}
            bg={isResizing ? 'blue.100' : 'transparent'}
            transition="background 0.2s"
            _hover={{
                bg: 'blue.50',
                '&::after': {
                    opacity: 1
                }
            }}
            _after={{
                content: '""',
                position: 'absolute',
                left: '3px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '2px',
                height: '60px',
                bg: isResizing ? 'blue.500' : 'gray.400',
                borderRadius: 'full',
                opacity: isResizing ? 1 : 0,
                transition: 'all 0.2s'
            }}
        >
            {/* Dots indicator */}
            <Flex
                position="absolute"
                left="2px"
                top="50%"
                transform="translateY(-50%)"
                direction="column"
                gap="3px"
                opacity={isResizing ? 1 : 0.5}
                transition="opacity 0.2s"
                _groupHover={{ opacity: 1 }}
            >
                <Box w="2px" h="2px" bg="gray.500" borderRadius="full" />
                <Box w="2px" h="2px" bg="gray.500" borderRadius="full" />
                <Box w="2px" h="2px" bg="gray.500" borderRadius="full" />
                <Box w="2px" h="2px" bg="gray.500" borderRadius="full" />
                <Box w="2px" h="2px" bg="gray.500" borderRadius="full" />
            </Flex>

            {/* Active resize line */}
            {isResizing && (
                <Box
                    position="absolute"
                    left="3px"
                    top="0"
                    bottom="0"
                    width="2px"
                    bg="blue.500"
                    borderRadius="full"
                />
            )}
        </Box>
    );
};

export default ResizableHandle;