import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import ResizableHandle from './ResizableHandle';
@@ -17,6 +19,8 @@ const ResizableDrawer = ({
    const [width, setWidth] = useState(defaultWidth);
    const [isResizing, setIsResizing] = useState(false);
    const drawerRef = useRef(null);
    const startXRef = useRef(null);
    const startWidthRef = useRef(null);

    // Notify parent about width changes
    useEffect(() => {
@@ -25,40 +29,52 @@ const ResizableDrawer = ({
    }
}, [width, onWidthChange, isOpen]);

// Mouse move handler
const handleMouseMove = useCallback((e) => {
    if (startXRef.current === null || startWidthRef.current === null) return;

    const deltaX = startXRef.current - e.clientX; // For right-side drawer
    const newWidth = Math.min(
        Math.max(startWidthRef.current + deltaX, minWidth),
        Math.min(maxWidth, window.innerWidth * 0.8)
    );
    setWidth(newWidth);
}, [minWidth, maxWidth]);

// Mouse up handler
const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    startXRef.current = null;
    startWidthRef.current = null;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
}, []);

// Mouse down handler
const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = width;
    e.stopPropagation();

    const handleMouseMove = (e) => {
        const deltaX = startX - e.clientX; // For right-side handle
        const newWidth = Math.min(
            Math.max(startWidth + deltaX, minWidth),
            Math.min(maxWidth, window.innerWidth * 0.8)
        );
        setWidth(newWidth);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
    };
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;

    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}, [width]);

return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
};
}, [width, minWidth, maxWidth]);
// Setup and cleanup mouse event listeners
useEffect(() => {
    if (isResizing) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }
}, [isResizing, handleMouseMove, handleMouseUp]);

// Handle window resize
useEffect(() => {
@@ -76,19 +92,18 @@ const ResizableDrawer = ({
        // Handle escape key
        useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                if (e.key === 'Escape' && isOpen && !isResizing) {
                    onClose();
                }
            };

            if (isOpen) {
                document.addEventListener('keydown', handleEscape);
                return () => {
                    document.removeEventListener('keydown', handleEscape);
                };
            }

            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }, [isOpen, onClose]);
    }, [isOpen, onClose, isResizing]);

    if (!isOpen) return null;

@@ -102,8 +117,10 @@ const ResizableDrawer = ({
        right="0"
        bottom="0"
        bg="blackAlpha.300"
        zIndex="999"
        zIndex={999}
        onClick={onClose}
        opacity={isOpen ? 1 : 0}
        transition="opacity 0.3s"
            />

            {/* Resizable Drawer */}
        @@ -118,11 +135,11 @@ const ResizableDrawer = ({
            boxShadow="0px 0px 1px rgba(45, 55, 72, 0.05), 0px 8px 16px rgba(45, 55, 72, 0.1)"
            borderTopLeftRadius="lg"
            borderBottomLeftRadius="lg"
            zIndex="1000"
            zIndex={1000}
            display="flex"
            flexDirection="row"
            overflow="hidden"
            transition={isResizing ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}
            transition={isResizing ? 'none' : 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}
                >
                {/* Resize Handle */}
    <ResizableHandle
        onMouseDown={handleMouseDown}
        isResizing={isResizing}
    />
    {/* Content */}
    <Box
        flex="1"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        bg="white"
    >
        {children}
    </Box>
</Box>
</>
);
};
    export default ResizableDrawer;