// src/Sidebar/Sidebar.jsx

import React, { useMemo, useRef, useState, useEffect } from 'react';
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
    Flex,
    Badge,
    Button,
    Tooltip
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, ChevronLeftIcon, ChevronRightIcon, PhoneIcon, StarIcon } from '@chakra-ui/icons';

const Sidebar = ({
                     students,
                     searchTerm,
                     onSearchChange,
                     selectedStudent,
                     onStudentSelect,
                     isDrawerOpen
                 }) => {
    const scrollContainerRef = useRef(null);
    const tableContainerRef = useRef(null);

    // Filter students
    const filteredStudents = useMemo(() => {
        if (!searchTerm) return students;

        const term = searchTerm.toLowerCase();
        return students.filter(student =>
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(term) ||
            student.email.toLowerCase().includes(term) ||
            student.faculty.toLowerCase().includes(term) ||
            student.phone.includes(term)
        );
    }, [students, searchTerm]);

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ro-RO', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Avatar colors
    const getAvatarColor = (firstName, lastName) => {
        const colors = [
            '#667EEA', '#4299E1', '#48BB78', '#ED8936',
            '#F56565', '#38B2AC', '#D69E2E', '#9F7AEA'
        ];
        const index = (firstName.charCodeAt(0) + lastName.charCodeAt(0)) % colors.length;
        return colors[index];
    };

    // Status helpers
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'green';
            case 'inactive': return 'yellow';
            case 'graduated': return 'blue';
            default: return 'gray';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return 'ACTIV';
            case 'inactive': return 'INACTIV';
            case 'graduated': return 'ABSOLVENT';
            default: return 'NECUNOSCUT';
        }
    };

    // GPA color
    const getGpaColor = (gpa) => {
        if (gpa >= 9.5) return 'green.500';
        if (gpa >= 9) return 'teal.500';
        if (gpa >= 8) return 'blue.500';
        if (gpa >= 7) return 'orange.500';
        return 'red.500';
    };



    return (
        <Box
            h="100vh"
            display="flex"
            flexDirection="column"
            bg="#FAFBFC"
            position="relative"
            width="100%"
        >
            {/* Header */}
            <Box
                px={5}
                py={4}
                bg="white"
                borderBottom="1px solid #E2E8F0"
                flexShrink={0}
            >
                <HStack mb={4} spacing={3}>
                    <IconButton
                        icon={<HamburgerIcon />}
                        variant="ghost"
                        size="sm"
                        aria-label="Menu"
                        color="gray.600"
                        _hover={{ bg: 'gray.100' }}
                    />
                    <Text
                        fontSize="lg"
                        fontWeight="600"
                        color="gray.800"
                    >
                        Lista Studenților
                    </Text>
                </HStack>

                <InputGroup size="md">
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon color="gray.400" boxSize={4} />
                    </InputLeftElement>
                    <Input
                        placeholder="Caută studenți..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        bg="gray.50"
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="lg"
                        fontSize="sm"
                        _hover={{ borderColor: 'gray.400', bg: 'white' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: 'none', bg: 'white' }}
                    />
                </InputGroup>
            </Box>



            {/* Main scrollable container */}
            <Box
                ref={scrollContainerRef}
                flex="1"
                overflowY="auto"
                bg="white"
                position="relative"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '0px',
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {/* Horizontal scroll container */}
                <Box
                    ref={tableContainerRef}
                    overflowX="auto"
                    overflowY="hidden"
                    h="100%"
                    css={{
                        '&::-webkit-scrollbar': {
                            height: '0px',
                            width: '0px',
                            display: 'none',
                        },
                        '&::-webkit-scrollbar-track': {
                            display: 'none',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            display: 'none',
                        },
                        // For Firefox
                        scrollbarWidth: 'none',
                        // For IE and Edge
                        msOverflowStyle: 'none',
                    }}
                >
                    {/* Table with fixed width to force scroll */}
                    <Box minW="1500px" h="100%">
                        {/* Table Headers */}
                        <Flex
                            px={5}
                            py={3}
                            bg="#F7FAFC"
                            borderBottom="1px solid #E2E8F0"
                            position="sticky"
                            top={0}
                            zIndex={10}
                            fontSize="11px"
                            fontWeight="600"
                            color="gray.600"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            <Text flex="0 0 250px">NUME</Text>
                            <Text flex="0 0 140px">DATA ÎNSCRIERII</Text>
                            <Text flex="0 0 150px">FACULTATE</Text>
                            <Text flex="0 0 220px">EMAIL</Text>
                            <Text flex="0 0 140px">TELEFON</Text>
                            <Text flex="0 0 80px">MEDIE</Text>
                            <Text flex="0 0 100px">STATUS</Text>
                            <Text flex="0 0 80px">CREDITE</Text>
                            <Text flex="0 0 100px">BURSĂ</Text>
                            <Text flex="0 0 240px">ADRESĂ</Text>
                        </Flex>

                        {/* Students List */}
                        <VStack spacing={0} align="stretch">
                            {filteredStudents.map((student, index) => (
                                <Box
                                    key={student.id}
                                    position="relative"
                                    borderBottom="1px solid #F7FAFC"
                                    bg={selectedStudent?.id === student.id ? '#EFF6FF' : 'white'}
                                    _hover={{
                                        bg: selectedStudent?.id === student.id ? '#EFF6FF' : '#F9FAFB',
                                    }}
                                    transition="background 0.1s"
                                >
                                    <Flex
                                        px={5}
                                        py={3}
                                        align="center"
                                        cursor="pointer"
                                        onClick={() => onStudentSelect(student)}
                                        position="relative"
                                    >
                                        {/* Selection Indicator */}
                                        {selectedStudent?.id === student.id && (
                                            <Box
                                                position="absolute"
                                                left={0}
                                                top={0}
                                                bottom={0}
                                                w="3px"
                                                bg="blue.500"
                                            />
                                        )}

                                        {/* Name Column */}
                                        <HStack flex="0 0 250px" spacing={3}>
                                            <Box position="relative">
                                                <Avatar
                                                    size="sm"
                                                    name={`${student.firstName} ${student.lastName}`}
                                                    bg={getAvatarColor(student.firstName, student.lastName)}
                                                    color="white"
                                                    fontSize="xs"
                                                    fontWeight="600"
                                                />
                                                {student.scholarship && (
                                                    <Box
                                                        position="absolute"
                                                        top="-2px"
                                                        right="-2px"
                                                        bg="green.500"
                                                        borderRadius="full"
                                                        w="10px"
                                                        h="10px"
                                                        border="2px solid white"
                                                    />
                                                )}
                                            </Box>
                                            <Box>
                                                <Text fontSize="sm" fontWeight="500" color="gray.900">
                                                    {student.firstName} {student.lastName}
                                                </Text>
                                                <Text fontSize="xs" color="gray.500">
                                                    ID: {student.id}
                                                </Text>
                                            </Box>
                                        </HStack>

                                        {/* Date Column */}
                                        <Box flex="0 0 140px">
                                            <Text fontSize="sm" color="gray.700">
                                                {formatDate(student.enrollmentDate)}
                                            </Text>
                                            <Text fontSize="xs" color="gray.500">
                                                Anul {student.year}
                                            </Text>
                                        </Box>

                                        {/* Faculty Column */}
                                        <Box flex="0 0 150px">
                                            <Text fontSize="sm" color="gray.700" noOfLines={1}>
                                                {student.faculty}
                                            </Text>
                                        </Box>

                                        {/* Email Column */}
                                        <Box flex="0 0 220px">
                                            <Text fontSize="sm" color="gray.600" noOfLines={1}>
                                                {student.email}
                                            </Text>
                                        </Box>

                                        {/* Phone Column */}
                                        <HStack flex="0 0 140px" spacing={1}>
                                            <PhoneIcon boxSize={3} color="gray.400" />
                                            <Text fontSize="sm" color="gray.600">
                                                {student.phone}
                                            </Text>
                                        </HStack>

                                        {/* GPA Column */}
                                        <Box flex="0 0 80px">
                                            <Tooltip label={`Top ${index + 1} din clasă`} isDisabled={student.gpa < 9}>
                                                <Text fontSize="sm" fontWeight="bold" color={getGpaColor(student.gpa)}>
                                                    {student.gpa}
                                                </Text>
                                            </Tooltip>
                                        </Box>

                                        {/* Status Column */}
                                        <Box flex="0 0 100px">
                                            <Badge
                                                colorScheme={getStatusColor(student.status)}
                                                variant="subtle"
                                                fontSize="xs"
                                                px={2}
                                                py={0.5}
                                            >
                                                {getStatusLabel(student.status)}
                                            </Badge>
                                        </Box>

                                        {/* Credits Column */}
                                        <Box flex="0 0 80px">
                                            <Text fontSize="sm" color="gray.700" fontWeight="500">
                                                {30 * student.year} ECTS
                                            </Text>
                                        </Box>

                                        {/* Scholarship Column */}
                                        <Box flex="0 0 100px">
                                            {student.scholarship ? (
                                                <Badge colorScheme="green" variant="solid" fontSize="xs" px={2} py={0.5}>
                                                    MERIT
                                                </Badge>
                                            ) : (
                                                <Badge colorScheme="gray" variant="outline" fontSize="xs" px={2} py={0.5}>
                                                    FĂRĂ
                                                </Badge>
                                            )}
                                        </Box>

                                        {/* Address Column */}
                                        <Box flex="0 0 240px">
                                            <Text fontSize="sm" color="gray.600" noOfLines={1}>
                                                📍 {student.address}
                                            </Text>
                                        </Box>

                                        {/* Chevron when selected and drawer open */}
                                        {selectedStudent?.id === student.id && isDrawerOpen && (
                                            <ChevronRightIcon
                                                position="absolute"
                                                right={4}
                                                color="blue.500"
                                                boxSize={5}
                                            />
                                        )}
                                    </Flex>
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                </Box>
            </Box>

            {/* Footer */}
            <Box
                px={5}
                py={3}
                bg="white"
                borderTop="1px solid #E2E8F0"
                flexShrink={0}
            >
                <Flex justify="space-between" align="center">
                    <HStack spacing={4}>
                        <Text fontSize="sm" color="gray.600">
                            {filteredStudents.length} din {students.length} studenți
                        </Text>
                        <Text fontSize="sm" color="gray.400">|</Text>
                        <HStack spacing={2}>
                            <Box w="3" h="3" bg="green.500" borderRadius="full" />
                            <Text fontSize="xs" color="gray.500">
                                {students.filter(s => s.status === 'active').length} activi
                            </Text>
                        </HStack>
                        <HStack spacing={2}>
                            <Box w="3" h="3" bg="yellow.500" borderRadius="full" />
                            <Text fontSize="xs" color="gray.500">
                                {students.filter(s => s.status === 'inactive').length} inactivi
                            </Text>
                        </HStack>
                    </HStack>
                    <Button
                        size="xs"
                        variant="link"
                        color="blue.500"
                        rightIcon={<Text>→</Text>}
                        leftIcon={<Text>←</Text>}
                        fontSize="xs"
                    >
                        Scroll pentru toate coloanele
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default Sidebar;