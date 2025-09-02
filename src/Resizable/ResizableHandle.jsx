import React, { useState } from 'react'
import { Flex, Box } from '@chakra-ui/react'

const ResizeHandle = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const handleMouseDown = (e) => {
        console.log('🖱️ ResizeHandle mouseDown triggered')
        setIsActive(true)
        if (props.onMouseDown) {
            console.log('📡 Forwarding mouseDown to parent')
            props.onMouseDown(e)
        }
    }

    const handleMouseUp = () => {
        console.log('🖱️ ResizeHandle mouseUp triggered')
        setIsActive(false)
    }

    // Attach global mouse up listener
    React.useEffect(() => {
        if (isActive) {
            document.addEventListener('mouseup', handleMouseUp)
            return () => document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isActive])

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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={handleMouseDown}
            transform={isHovered || isActive ? "scale(1.1)" : "scale(1)"}
            boxShadow={isHovered || isActive ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 4px rgba(0,0,0,0.1)"}
            borderColor={isActive ? "blue.400" : isHovered ? "gray.400" : "gray.300"}
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            style={{
                touchAction: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
            }}
            {...props}
        >
            {/* Left handle bar */}
            <Box
                width="2px"
                backgroundColor={isActive ? "blue.400" : isHovered ? "gray.500" : "gray.300"}
                height="75%"
                mr="0.5"
                transform={isActive ? "scaleY(1.2)" : "scaleY(1)"}
                transition="all 0.2s ease"
            />
            {/* Right handle bar */}
            <Box
                width="2px"
                backgroundColor={isActive ? "blue.400" : isHovered ? "gray.500" : "gray.300"}
                height="75%"
                transform={isActive ? "scaleY(1.2)" : "scaleY(1)"}
                transition="all 0.2s ease"
            />

            {/* Enhanced touch area for mobile */}
            <Box
                position="absolute"
                top="-30px"
                bottom="-30px"
                left="-30px"
                right="-20px"
                display={isTouchDevice ? "block" : "none"}
                // The larger touch area for mobile devices is invisible but extends 30px on each side of the visible handle, making it easier to grab on touch screens. This area is only present on mobile devices and smaller screens.
            />

            {/* Animated indicator dots - visible on hover */}
            <Flex
                position="absolute"
                left="50%"
                top="-12px"
                transform="translateX(-50%)"
                opacity={isHovered || isActive ? 1 : 0}
                transition="opacity 0.2s ease"
                gap="2px"
            >
                <Box
                    width="3px"
                    height="3px"
                    backgroundColor="gray.400"
                    borderRadius="full"
                    transform={isActive ? "scale(1.3)" : "scale(1)"}
                    transition="transform 0.2s ease"
                />
                <Box
                    width="3px"
                    height="3px"
                    backgroundColor="gray.400"
                    borderRadius="full"
                    transform={isActive ? "scale(1.3)" : "scale(1)"}
                    transition="transform 0.2s ease"
                />
                <Box
                    width="3px"
                    height="3px"
                    backgroundColor="gray.400"
                    borderRadius="full"
                    transform={isActive ? "scale(1.3)" : "scale(1)"}
                    transition="transform 0.2s ease"
                />
            </Flex>

            {/* Animated pulse effect when active */}
            {isActive && (
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    borderRadius="sm"
                    backgroundColor="blue.50"
                    opacity="0.6"
                    animation="pulse 1.5s infinite"
                    sx={{
                        '@keyframes pulse': {
                            '0%, 100%': { opacity: 0.6 },
                            '50%': { opacity: 0.3 }
                        }
                    }}
                />
            )}
        </Flex>
    )
}

export default ResizeHandle