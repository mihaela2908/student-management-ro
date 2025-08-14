// src/Sidebar/StudentsSidebar.jsx

import React, { useMemo } from 'react';
import {
    Box,
    Flex,
    VStack,
    Text,
    Avatar,
    Badge,
    Heading,
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const StudentsSidebar = ({
                             students,
                             searchTerm,
                             onSearchChange,
                             selectedStudent,
                             onStudentSelect,
                             isDrawerOpen
                         }) => {
    // Filter students based on search term
    const filteredStudents = useMemo(() => {
        if (!searchTerm) return students;

        return students.filter(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            const searchLower = searchTerm.toLowerCase();

            return (
                fullName.includes(searchLower) ||
                student.email.toLowerCase().includes(searchLower) ||
                student.faculty.toLowerCase().includes(searchLower)
            );
        });
    }, [searchTerm, students]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        return status === 'active' ? 'green' : 'orange';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Activ' : 'Inactiv';
    };

    return (
        <Box
            height="100%"
            width="100%"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            bg="white"
        >
            <Container maxW="full" py={6} flex="1" display="flex" flexDirection="column">
                {/* Header */}
                <VStack spacing={4} align="stretch" mb={6}>
                    <Box>
                        <Heading
                            size={isDrawerOpen ? "lg" : "xl"}
                            color="brand.700"
                            mb={2}
                        >
                            {isDrawerOpen ? "Studenți" : "Managementul Studenților"}
                        </Heading>
                        {!isDrawerOpen && (
                            <Text color="gray.600" fontSize="md">
                                Vizualizează și gestionează informațiile studenților
                            </Text>
                        )}
                    </Box>

                    {/* Search Bar */}
                    <Box maxW={isDrawerOpen ? "full" : "md"}>
                        <InputGroup>
                            <InputLeftElement>
                                <SearchIcon color="gray.400" />
                            </InputLeftElement>
                            <Input
                                placeholder={isDrawerOpen ? "Caută..." : "Caută după nume, email sau facultate..."}
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                bg="white"
                                borderColor="gray.300"
                                _hover={{ borderColor: 'brand.300' }}
                                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)' }}
                            />
                        </InputGroup>
                    </Box>
                </VStack>

                {/* Students Table */}
                <Box
                    bg="white"
                    shadow="lg"
                    rounded="lg"
                    overflow="hidden"
                    flex="1"
                    display="flex"
                    flexDirection="column"
                >
                    <Box flex="1" overflow="auto">
                        <TableContainer height="100%" overflowX="auto">
                            <Table variant="simple" size="md" minW={isDrawerOpen ? "1000px" : "auto"}>
                                <Thead bg="gray.50" position="sticky" top="0" zIndex="1">
                                    <Tr>
                                        <Th minW="200px">Student</Th>
                                        <Th minW="200px">Email</Th>
                                        <Th minW="120px">Facultate</Th>
                                        <Th minW="80px">An</Th>
                                        <Th minW="80px">Medie</Th>
                                        <Th minW="80px">Status</Th>
                                        <Th minW="120px">Data înscrierii</Th>
                                        <Th minW="120px">Telefon</Th>
                                        <Th minW="250px">Adresa</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {filteredStudents.map((student) => (
                                        <Tr
                                            key={student.id}
                                            onClick={() => onStudentSelect(student)}
                                            cursor="pointer"
                                            bg={selectedStudent?.id === student.id ? 'brand.50' : 'white'}
                                            _hover={{ bg: selectedStudent?.id === student.id ? 'brand.100' : 'brand.50' }}
                                            transition="background-color 0.2s"
                                        >
                                            {/* Student - Avatar + Name */}
                                            <Td minW="200px">
                                                <Flex align="center" gap={3}>
                                                    <Avatar
                                                        size="md"
                                                        name={`${student.firstName} ${student.lastName}`}
                                                        src={student.profilePic}
                                                    />
                                                    <Box minW="0" flex="1">
                                                        <Text
                                                            fontWeight="semibold"
                                                            fontSize="md"
                                                            isTruncated
                                                        >
                                                            {student.firstName} {student.lastName}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            </Td>

                                            {/* Email */}
                                            <Td minW="200px">
                                                <Text fontSize="sm" color="blue.600" isTruncated>
                                                    {student.email}
                                                </Text>
                                            </Td>

                                            {/* Facultate */}
                                            <Td minW="120px">
                                                <Text fontSize="sm" isTruncated>
                                                    {student.faculty}
                                                </Text>
                                            </Td>

                                            {/* An de studiu */}
                                            <Td minW="80px">
                                                <Badge
                                                    colorScheme="blue"
                                                    variant="outline"
                                                    fontSize="sm"
                                                >
                                                    Anul {student.year}
                                                </Badge>
                                            </Td>

                                            {/* Medie */}
                                            <Td minW="80px">
                                                <Badge
                                                    colorScheme={student.gpa >= 9 ? 'green' : student.gpa >= 8 ? 'yellow' : 'red'}
                                                    variant="subtle"
                                                    px={2}
                                                    py={1}
                                                    rounded="full"
                                                    fontSize="sm"
                                                    fontWeight="bold"
                                                >
                                                    {student.gpa}
                                                </Badge>
                                            </Td>

                                            {/* Status */}
                                            <Td minW="80px">
                                                <Badge
                                                    colorScheme={getStatusColor(student.status)}
                                                    variant="subtle"
                                                    px={3}
                                                    py={1}
                                                    rounded="full"
                                                    fontSize="sm"
                                                >
                                                    {getStatusText(student.status)}
                                                </Badge>
                                            </Td>

                                            {/* Data înscrierii */}
                                            <Td minW="120px">
                                                <Text color="gray.600" fontSize="sm">
                                                    {formatDate(student.enrollmentDate)}
                                                </Text>
                                            </Td>

                                            {/* Telefon */}
                                            <Td minW="120px">
                                                <Text fontSize="sm" color="gray.700">
                                                    {student.phone}
                                                </Text>
                                            </Td>

                                            {/* Adresa */}
                                            <Td minW="250px">
                                                <Text fontSize="sm" color="gray.600" isTruncated>
                                                    {student.address}
                                                </Text>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* Results Counter */}
                    {searchTerm && (
                        <Box
                            px={4}
                            py={3}
                            borderTop="1px solid"
                            borderColor="gray.200"
                            bg="gray.50"
                        >
                            <Text fontSize="sm" color="gray.600" textAlign="center">
                                {filteredStudents.length} din {students.length} studenți
                            </Text>
                        </Box>
                    )}

                    {filteredStudents.length === 0 && (
                        <Box textAlign="center" py={10}>
                            <Text color="gray.500" fontSize="lg">
                                {searchTerm ?
                                    "Nu au fost găsiți studenți cu criteriile de căutare specificate." :
                                    "Nu există studenți în baza de date."
                                }
                            </Text>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default StudentsSidebar;