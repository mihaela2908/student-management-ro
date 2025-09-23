// src/App.js

import React, { useState, useEffect } from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import StudentsPanel from './Panel/StudentsPanel';
import StudentsDetails from './Details/StudentsDetails';
import ResizableDrawer from './Resizable/ResizableDrawer';
import { mockStudents } from './data/mockData';
import theme from './theme';

function App() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
                {/* Sidebar principal - întotdeauna vizibil */}
                <Box
                    width="100%"
                    height="100%"
                    bg="white"
                    position="relative"
                >
                    <StudentsPanel
                        students={mockStudents}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        selectedStudent={selectedStudent}
                        onStudentSelect={handleStudentSelect}
                        isDrawerOpen={isDrawerOpen}
                    />
                </Box>

                {/* ResizableDrawer pentru detalii student */}
                <ResizableDrawer
                    isOpen={isDrawerOpen}
                    onClose={handleDrawerClose}
                >
                    {selectedStudent && (
                        <StudentsDetails
                            student={selectedStudent}
                            onClose={handleDrawerClose}
                            isOpen={isDrawerOpen}
                        />
                    )}
                </ResizableDrawer>
            </Box>
        </ChakraProvider>
    );
}

export default App;