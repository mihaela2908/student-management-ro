// src/App.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import StudentsSidebar from './Sidebar/StudentsSidebar';
import MainPanel from './MainPanel/MainPanel';
import ResizableHandle from './ResizableDrawer/ResizableHandle';
import { mockStudents } from './data/mockData';
import theme from './theme';

function App() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarWidth, setSidebarWidth] = useState(45); // procent
    const [isDragging, setIsDragging] = useState(false);

    const containerRef = useRef(null);
    const startX = useRef(0);
    const startWidth = useRef(45);

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

    // Funcții pentru redimensionare - versiune simplificată
    const startDragging = useCallback((e) => {
        if (isMobile || !isDrawerOpen) return;

        e.preventDefault();
        setIsDragging(true);
        startX.current = e.clientX;
        startWidth.current = sidebarWidth;

        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    }, [isMobile, isDrawerOpen, sidebarWidth]);

    const onDrag = useCallback((e) => {
        if (!isDragging || !containerRef.current) return;

        e.preventDefault();
        const containerWidth = containerRef.current.offsetWidth;
        const deltaX = e.clientX - startX.current;
        const deltaPercent = (deltaX / containerWidth) * 100;
        const newWidth = startWidth.current + deltaPercent;

        // Limitează între 20% și 80%
        if (newWidth >= 20 && newWidth <= 80) {
            setSidebarWidth(newWidth);
        }
    }, [isDragging]);

    const stopDragging = useCallback(() => {
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, []);

    // Event listeners globale
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDragging);
            document.addEventListener('mouseleave', stopDragging);
        }

        return () => {
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('mouseleave', stopDragging);
        };
    }, [isDragging, onDrag, stopDragging]);

    // Resize handler pentru fereastră
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <Box
                ref={containerRef}
                position="fixed"
                top={0}
                left={0}
                right={0}
                bottom={0}
                width="100vw"
                height="100vh"
                bg="#F5F7FA"
                overflow="hidden"
            >
                <Flex width="100%" height="100%" position="relative">
                    {/* Sidebar */}
                    <Box
                        width={isDrawerOpen ? `${sidebarWidth}%` : "100%"}
                        height="100%"
                        bg="white"
                        transition={isDragging ? "none" : "width 0.3s ease"}
                        position="relative"
                        minWidth={isDrawerOpen ? "250px" : "auto"}
                        maxWidth={isDrawerOpen ? "70%" : "100%"}
                        boxShadow={isDrawerOpen ? "2px 0 8px rgba(0,0,0,0.05)" : "none"}
                    >
                        <StudentsSidebar
                            students={mockStudents}
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            selectedStudent={selectedStudent}
                            onStudentSelect={handleStudentSelect}
                            isDrawerOpen={isDrawerOpen}
                        />
                    </Box>

                    {/* Elegant Resize Handle */}
                    {isDrawerOpen && !isMobile && (
                        <Box
                            position="relative"
                            width="6px"
                            height="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <ResizableHandle onMouseDown={startDragging} />
                        </Box>
                    )}

                    {/* Main Panel */}
                    <Box
                        width={isDrawerOpen ? `${100 - sidebarWidth}%` : "0%"}
                        height="100%"
                        bg="white"
                        transition={isDragging ? "none" : "width 0.3s ease"}
                        overflow="hidden"
                        position="relative"
                    >
                        {isDrawerOpen && selectedStudent && (
                            <Box width="100%" height="100%" overflow="hidden">
                                <MainPanel
                                    student={selectedStudent}
                                    onClose={handleDrawerClose}
                                    isOpen={isDrawerOpen}
                                />
                            </Box>
                        )}
                    </Box>
                </Flex>

                {/* Overlay pentru drag */}
                {isDragging && (
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        cursor="col-resize"
                        zIndex={1000}
                    />
                )}
            </Box>
        </ChakraProvider>
    );
}

export default App;