import React from 'react';
import { Box } from '@chakra-ui/react';

const ResizableHandle = ({ onMouseDown, isResizing }) => {
    return (
        <Box
            width="6px"
            height="100%"
            cursor="ew-resize"
            bg={isResizing ? 'blue.400' : 'transparent'}
            _hover={{
                bg: 'gray.300',
            }}
            onMouseDown={onMouseDown}
            position="relative"
            transition="all 0.2s"
            flexShrink="0"
            borderRight="1px"
            borderColor="gray.100"
        >
            {/* Visual indicator */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                height="40px"
                width="4px"
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                alignItems="center"
                opacity={isResizing ? 1 : 0.6}
                transition="opacity 0.2s"
            >
                {[...Array(6)].map((_, i) => (
                    <Box
                        key={i}
                        width="2px"
                        height="2px"
                        bg={isResizing ? 'blue.500' : 'gray.400'}
                        borderRadius="full"
                        transition="background-color 0.2s"
                    />
                ))}
            </Box>
        </Box>
    );
};

export default ResizableHandle;