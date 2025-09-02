import React, { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { Box, Flex } from '@chakra-ui/react'
import ResizeHandle from './ResizableHandle'

const ResizableDrawer = ({ children, isOpen, onClose }) => {
    const INITIAL_WIDTH = 530
    const MIN_WIDTH = 320
    const CLOSE_THRESHOLD = 50

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const [ width, setWidth ] = useState(INITIAL_WIDTH)
    const [ isClosing, setIsClosing ] = useState(false)
    const [ isResizing, setIsResizing ] = useState(false)
    const controls = useAnimation()

    const handleClose = useCallback((newWidth) => {
        if (newWidth <= CLOSE_THRESHOLD) {
            console.log('🚪 Closing drawer - width below threshold:', newWidth)
            setIsClosing(true)
            controls.start({
                x: '100%',
                transition: { duration: 0.5 }
            }).then(() => {
                console.log('✅ Drawer close animation complete')
                setIsClosing(false)
                onClose()
            })
        }
    }, [onClose, controls])

    const handleResize = useMemo(() => {
        let frameId
        return (newWidth) => {
            if (frameId) {
                cancelAnimationFrame(frameId)
            }
            frameId = requestAnimationFrame(() => {
                const width = isTouchDevice
                    ? Math.max(CLOSE_THRESHOLD, newWidth)
                    : Math.max(MIN_WIDTH, newWidth)

                setWidth(width)
            })
        }
    }, [isTouchDevice])

    const handleDrag = useCallback((state) => {
        if (state.first) {
            console.log('🖱️ Drag started')
            setIsResizing(true)
        }
        if (state.active) {
            handleResize(-state.offset[0])
        }

        if (state.last) {
            console.log('🏁 Drag ended')
            setIsResizing(false)
            if (isTouchDevice) {
                handleClose(-state.offset[0])
            }
        }
    }, [handleResize, handleClose, isTouchDevice])

    const useResizeHandleDrag = useDrag(
        handleDrag,
        {
            from: () => [-width, 0],
            filterTaps: true,
            threshold: 1,
        },
    )

    const resizeHandleProps = useResizeHandleDrag()

    // Log doar la deschidere/închidere
    React.useEffect(() => {
        if (isOpen) {
            console.log('🚀 Drawer opened - initial width:', width)
        }
    }, [isOpen])

    return (
        <AnimatePresence mode='wait'>
            {(isOpen && !isClosing) && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{
                        type: 'spring',
                        damping: 32,
                        stiffness: 400
                    }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: `${isTouchDevice ? width : Math.max(width, MIN_WIDTH)}px`,
                        height: '100dvh',
                        maxWidth: '100%',
                        backgroundColor: 'white',
                        boxShadow: '0px 0px 1px rgba(45, 55, 72, 0.05), 0px 8px 16px rgba(45, 55, 72, 0.1)',
                        borderTopLeftRadius: 'var(--chakra-radii-lg)',
                        borderBottomLeftRadius: 'var(--chakra-radii-lg)',
                        zIndex: 1000,
                        overflow: 'visible',
                    }}
                >
                    <Flex
                        direction='column'
                        height='100%'
                        className='drawer-container'
                        sx={{
                            '&:hover .resize-handle': {
                                opacity: 1
                            },
                            position: 'relative',
                        }}
                    >
                        <Box
                            flex={1}
                            height='100%'
                            width='100%'
                            overflow='auto'
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'gray.50',
                                    borderRadius: '3px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'gray.300',
                                    borderRadius: '3px',
                                    '&:hover': {
                                        background: 'gray.400',
                                    },
                                },
                            }}
                        >
                            {children}
                        </Box>
                        <ResizeHandle
                            {...resizeHandleProps}
                            className='resize-handle'
                            isResizing={isResizing}
                            sx={{
                                opacity: 1,
                                transition: 'opacity 0.2s',
                                flexShrink: 0,
                            }}
                        />
                    </Flex>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ResizableDrawer