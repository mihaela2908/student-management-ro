// src/ResizableDrawer/ResizableHandle.jsx

import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const ResizableHandle = (props) => {
    return (
        <Flex
            position="absolute"
            top="calc(50% - 35px)"
            left="-9px"
            width="17px"
            height="50px"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            borderWidth="1px"
            borderRadius="sm"
            backgroundColor="white"
            cursor="ew-resize"
            zIndex={999}
            style={{
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
            }}
            {...props}
        >
            <Box
                width="2px"
                backgroundColor="gray.300"
                height="75%"
                mr="0.5"
            />
            <Box
                width="2px"
                backgroundColor="gray.300"
                height="75%"
            />
            <Box
                position="absolute"
                top="-30px"
                bottom="-30px"
                left="-30px"
                right="-35px"
                display={isTouchDevice ? 'block' : 'none'} // The larger touch area for mobile devices is invisible but extends 30px on each side of the visible handle, making it easier to grab on touch screens. This area is only present on mobile devices and smaller screens.
            />
        </Flex>
    );
};

export default ResizableHandle;