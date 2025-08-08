import React, { useMemo } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Avatar,
    Input,
    InputGroup,
    InputLeftElement,
    IconButton,
    Flex
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';

const Sidebar = ({ students, searchTerm, onSearchChange, selectedStudent, onStudentSelect }) => {
    // Filter students
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.faculty.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [students, searchTerm]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Box h="100vh" display="flex" flexDirection="column">
            {/* Header */}
            <Box p={4} borderBottom="1px" borderColor="gray.200">
                <Flex align="center" justify="space-between" mb={4}>
                    <HStack>
                        <IconButton
                            icon={<HamburgerIcon />}
                            variant="ghost"
                            size="sm"
                            aria-label="Menu"
                        />
                        <Text fontSize="lg" fontWeight="semibold">
                            Lista Elevilor
                        </Text>
                    </HStack>
                </Flex>

                {/* Search */}
                <InputGroup size="sm">
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        borderRadius="md"
                        bg="gray.50"
                    />
                </InputGroup>
            </Box>

            {/* Student List */}
            <Box flex="1" overflowY="auto">
                <VStack spacing={0} align="stretch">
                    {/* Headers */}
                    <Flex p={3} fontSize="xs" fontWeight="semibold" color="gray.600" bg="gray.50">
                        <Text flex="1">Name</Text>
                        <Text w="100px" textAlign="right">Last visit</Text>
                    </Flex>

                    {/* Students */}
                    {filteredStudents.map((student) => (
                        <Box
                            key={student.id}
                            p={3}
                            cursor="pointer"
                            bg={selectedStudent?.id === student.id ? 'blue.50' : 'white'}
                            borderLeft={selectedStudent?.id === student.id ? '3px solid' : 'none'}
                            borderLeftColor="blue.500"
                            _hover={{ bg: 'gray.50' }}
                            onClick={() => onStudentSelect(student)}
                            borderBottom="1px"
                            borderColor="gray.100"
                        >
                            <Flex align="center">
                                <HStack flex="1" spacing={3}>
                                    <Avatar
                                        size="sm"
                                        src={student.profilePic}
                                        name={`${student.firstName} ${student.lastName}`}
                                    />
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium">
                                            {student.firstName} {student.lastName}
                                        </Text>
                                    </Box>
                                </HStack>

                                <Box w="100px" textAlign="right">
                                    <Text fontSize="xs" fontWeight="medium">
                                        {student.faculty}
                                    </Text>
                                    <Text fontSize="xs" color="gray.500">
                                        {formatDate(student.enrollmentDate)}
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </VStack>
            </Box>

            {/* Footer */}
            <Box p={3} borderTop="1px" borderColor="gray.200" fontSize="xs" color="gray.500">
                1-{filteredStudents.length} of {students.length}
            </Box>
        </Box>
    );
};

export default Sidebar;