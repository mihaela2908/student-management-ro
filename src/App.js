import React, { useState } from 'react';
import { ChakraProvider, Flex, Box } from '@chakra-ui/react';
import theme from './theme';
import Sidebar from './Sidebar/Sidebar';
import MainPanel from './MainPanel/MainPanel';
import { mockStudents } from './data/mockData';

const App = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleStudentSelect = (student) => {
        console.log('Student selectat:', student); // DEBUG
        setSelectedStudent(student);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    console.log('Studentul curent în App:', selectedStudent); // DEBUG

    return (
        <ChakraProvider theme={theme}>
            <Flex h="100vh" bg="gray.50">
                {/* Sidebar - Lista elevilor */}
                <Box w="400px" borderRight="1px" borderColor="gray.200" bg="white">
                    <Sidebar
                        students={mockStudents}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        selectedStudent={selectedStudent}
                        onStudentSelect={handleStudentSelect}
                    />
                </Box>

                {/* Main Panel - Detaliile elevului */}
                <Box flex="1" bg="gray.50">
                    <MainPanel
                        student={selectedStudent}
                        onClose={() => setSelectedStudent(null)}
                    />
                </Box>
            </Flex>
        </ChakraProvider>
    );
};

export default App;