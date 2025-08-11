// src/App.js

import React, { useState } from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar/Sidebar';
import MainPanel from './MainPanel/MainPanel';
import ResizableHandle from './ResizableDrawer/ResizableHandle';
import { mockStudents } from './data/mockData';
import theme from './theme';

function App() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(600);
    const [isResizing, setIsResizing] = useState(false);

    const handleStudentSelect = (student) => {
        setSelectedStudent(student);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setTimeout(() => {
            setSelectedStudent(null);
        }, 300);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    // Handle drawer resize
    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);

        const startX = e.clientX;
        const startWidth = drawerWidth;

        const handleMouseMove = (e) => {
            const deltaX = startX - e.clientX;
            const newWidth = Math.min(
                Math.max(startWidth + deltaX, 400),
                Math.min(1200, window.innerWidth * 0.8)
            );
            setDrawerWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <ChakraProvider theme={theme}>
            <Flex
                h="100vh"
                overflow="hidden"
                bg="#F5F7FA"
                position="relative"
            >
                {/* Sidebar - Always visible and interactive */}
                <Box
                    flex="1"
                    width={isDrawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%"}
                    transition={isResizing ? "none" : "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"}
                    bg="white"
                    position="relative"
                    overflow="hidden"
                >
                    <Sidebar
                        students={mockStudents}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        selectedStudent={selectedStudent}
                        onStudentSelect={handleStudentSelect}
                        isDrawerOpen={isDrawerOpen}
                    />
                </Box>

                {/* Main Panel Drawer - Slides in from right */}
                {isDrawerOpen && (
                    <Box
                        position="relative"
                        width={`${drawerWidth}px`}
                        height="100%"
                        bg="white"
                        boxShadow="-4px 0 20px rgba(0,0,0,0.1)"
                        transition={isResizing ? "none" : "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"}
                        display="flex"
                        flexDirection="row"
                        overflow="hidden"
                    >
                        {/* Resize Handle */}
                        <ResizableHandle
                            onMouseDown={handleMouseDown}
                            isResizing={isResizing}
                        />

                        {/* Main Panel Content */}
                        <Box
                            flex="1"
                            overflow="hidden"
                            display="flex"
                            flexDirection="column"
                        >
                            <MainPanel
                                student={selectedStudent}
                                onClose={handleDrawerClose}
                                isOpen={isDrawerOpen}
                                drawerWidth={drawerWidth}
                            />
                        </Box>
                    </Box>
                )}
            </Flex>
        </ChakraProvider>
    );
}

export default App;