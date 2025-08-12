// src/App.js

import React, { useState } from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import Sidebar from './Sidebar/Sidebar';
import MainPanel from './MainPanel/MainPanel';
import { mockStudents } from './data/mockData';
import theme from './theme';

function App() {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    return (
        <ChakraProvider theme={theme}>
            <Flex
                h="100vh"
                overflow="hidden"
                bg="#F5F7FA"
                position="relative"
            >
                {/* Sidebar - Lista Studenților */}
                <Box
                    width={isDrawerOpen ? "45%" : "100%"}
                    minW={isDrawerOpen ? "500px" : "auto"}
                    maxW={isDrawerOpen ? "650px" : "100%"}
                    transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    bg="white"
                    position="relative"
                    zIndex={1}
                    boxShadow={isDrawerOpen ? "2px 0 8px rgba(0,0,0,0.05)" : "none"}
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

                {/* Main Panel - Detalii Student */}
                <Box
                    position="absolute"
                    right={0}
                    top={0}
                    bottom={0}
                    width={isDrawerOpen ? "55%" : "0"}
                    transition="width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    bg="white"
                    overflow="hidden"
                    zIndex={2}
                >
                    {isDrawerOpen && (
                        <MainPanel
                            student={selectedStudent}
                            onClose={handleDrawerClose}
                            isOpen={isDrawerOpen}
                        />
                    )}
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;