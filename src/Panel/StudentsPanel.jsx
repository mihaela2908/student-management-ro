import React, { useMemo, useState } from 'react';
import {
    Box,
    Flex,
    VStack,
    HStack,
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
    Input,
    InputGroup,
    InputLeftElement,
    IconButton,
    Tooltip,
    Collapse
} from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

const StudentsPanel = ({
                             students,
                             searchTerm,
                             onSearchChange,
                             selectedStudent,
                             onStudentSelect,
                             isDrawerOpen
                         }) => {
    const [expandedRows, setExpandedRows] = useState(new Set());

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

    const toggleRowExpansion = (studentId, e) => {
        e.stopPropagation();
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(studentId)) {
            newExpanded.delete(studentId);
        } else {
            newExpanded.add(studentId);
        }
        setExpandedRows(newExpanded);
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
                    rounded="lg"
                    overflow="hidden"
                    flex="1"
                    display="flex"
                    flexDirection="column"
                    border="1px solid"
                    borderColor="gray.100"
                >
                    <Box flex="1" overflow="auto">
                        <Table variant="simple" size="md">
                            <Thead bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
                                <Tr>
                                    <Th
                                        fontSize="xs"
                                        fontWeight="semibold"
                                        color="gray.600"
                                        textTransform="capitalize"
                                        px={6}
                                        py={4}
                                        letterSpacing="normal"
                                        width="40%"
                                    >
                                        Student
                                    </Th>
                                    <Th
                                        fontSize="xs"
                                        fontWeight="semibold"
                                        color="gray.600"
                                        textTransform="capitalize"
                                        px={4}
                                        py={4}
                                        letterSpacing="normal"
                                        width="25%"
                                    >
                                        Facultate & An
                                    </Th>
                                    <Th
                                        fontSize="xs"
                                        fontWeight="semibold"
                                        color="gray.600"
                                        textTransform="capitalize"
                                        px={4}
                                        py={4}
                                        letterSpacing="normal"
                                        width="20%"
                                    >
                                        Status & Medie
                                    </Th>
                                    <Th
                                        fontSize="xs"
                                        fontWeight="semibold"
                                        color="gray.600"
                                        textTransform="capitalize"
                                        px={4}
                                        py={4}
                                        letterSpacing="normal"
                                        textAlign="right"
                                        width="15%"
                                    >
                                        Acțiuni
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredStudents.map((student) => (
                                    <React.Fragment key={student.id}>
                                        <Tr
                                            onClick={() => onStudentSelect(student)}
                                            cursor="pointer"
                                            bg={selectedStudent?.id === student.id ? 'blue.50' : 'white'}
                                            _hover={{ bg: selectedStudent?.id === student.id ? 'blue.100' : 'gray.50' }}
                                            transition="all 0.2s"
                                            borderBottom="1px solid"
                                            borderColor="gray.100"
                                        >
                                            {/* Student Column - Avatar + Name + Email */}
                                            <Td px={6} py={4} borderBottom="none">
                                                <Flex align="center" gap={3}>
                                                    <IconButton
                                                        aria-label="Expand row"
                                                        icon={expandedRows.has(student.id) ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                                        size="xs"
                                                        variant="ghost"
                                                        onClick={(e) => toggleRowExpansion(student.id, e)}
                                                        mr={1}
                                                    />
                                                    <Avatar
                                                        size="md"
                                                        name={`${student.firstName} ${student.lastName}`}
                                                        src={student.profilePic}
                                                        bg="gray.100"
                                                    />
                                                    <Box minW="0" flex="1">
                                                        <Text
                                                            fontWeight="semibold"
                                                            fontSize="sm"
                                                            color="gray.900"
                                                            mb={0.5}
                                                        >
                                                            {student.firstName} {student.lastName}
                                                        </Text>
                                                        <Tooltip label={student.email} placement="top">
                                                            <Text
                                                                fontSize="xs"
                                                                color="gray.500"
                                                                isTruncated
                                                                cursor="help"
                                                            >
                                                                {student.email}
                                                            </Text>
                                                        </Tooltip>
                                                    </Box>
                                                </Flex>
                                            </Td>

                                            {/* Faculty & Year Column */}
                                            <Td px={4} py={4} borderBottom="none">
                                                <Box>
                                                    <Text
                                                        fontSize="sm"
                                                        fontWeight="medium"
                                                        color="gray.900"
                                                        mb={0.5}
                                                    >
                                                        {student.faculty}
                                                    </Text>
                                                    <Flex align="center" gap={2}>
                                                        <Box
                                                            w={2}
                                                            h={2}
                                                            bg={student.status === 'active' ? 'green.400' : 'orange.400'}
                                                            rounded="full"
                                                            flexShrink={0}
                                                        />
                                                        <Text fontSize="xs" color="gray.500">
                                                            Anul {student.year} • {formatDate(student.enrollmentDate)}
                                                        </Text>
                                                    </Flex>
                                                </Box>
                                            </Td>

                                            {/* Status & GPA Column */}
                                            <Td px={4} py={4} borderBottom="none">
                                                <VStack spacing={2} align="start">
                                                    <Flex align="center" gap={2}>
                                                        <Avatar
                                                            size="xs"
                                                            name="Teacher"
                                                            bg={getStatusColor(student.status) === 'green' ? 'green.100' : 'orange.100'}
                                                        />
                                                        <Text fontSize="xs" color="gray.600">
                                                            {getStatusText(student.status)}
                                                        </Text>
                                                    </Flex>
                                                    <Badge
                                                        colorScheme={student.gpa >= 9 ? 'green' : student.gpa >= 8 ? 'yellow' : 'red'}
                                                        variant="subtle"
                                                        fontSize="xs"
                                                        px={2}
                                                        py={0.5}
                                                        rounded="md"
                                                    >
                                                        Medie {student.gpa}
                                                    </Badge>
                                                </VStack>
                                            </Td>

                                            {/* Actions Column */}
                                            <Td px={4} py={4} borderBottom="none" textAlign="right">
                                                <Flex justify="flex-end" align="center" gap={2}>
                                                    <Box
                                                        as="button"
                                                        p={1}
                                                        rounded="md"
                                                        _hover={{ bg: 'gray.100' }}
                                                        transition="all 0.2s"
                                                    >
                                                        ⭐
                                                    </Box>
                                                    <Box
                                                        bg="gray.50"
                                                        border="1px solid"
                                                        borderColor="gray.200"
                                                        rounded="md"
                                                        px={3}
                                                        py={1.5}
                                                        _hover={{ bg: 'gray.100' }}
                                                        transition="all 0.2s"
                                                        cursor="pointer"
                                                        fontSize="xs"
                                                        fontWeight="medium"
                                                        color="gray.600"
                                                    >
                                                        Vezi detalii ▶
                                                    </Box>
                                                </Flex>
                                            </Td>
                                        </Tr>

                                        {/* Expanded Row with Complete Information */}
                                        <Tr>
                                            <Td colSpan={4} p={0} borderBottom="none">
                                                <Collapse in={expandedRows.has(student.id)} animateOpacity>
                                                    <Box bg="gray.25" borderTop="1px solid" borderColor="gray.100" px={6} py={4}>
                                                        <VStack spacing={4} align="stretch">
                                                            {/* Contact & Location Row */}
                                                            <HStack spacing={8} wrap="wrap" align="start">
                                                                <Box minW="200px">
                                                                    <Text fontSize="xs" color="gray.600" fontWeight="bold" mb={2}>
                                                                        📞 CONTACT
                                                                    </Text>
                                                                    <VStack spacing={1.5} align="start">
                                                                        <Tooltip label="Apelează" placement="top">
                                                                            <Text fontSize="xs" color="blue.600" cursor="pointer" _hover={{ textDecor: 'underline' }}>
                                                                                {student.phone}
                                                                            </Text>
                                                                        </Tooltip>
                                                                        <Tooltip label="Trimite email" placement="top">
                                                                            <Text fontSize="xs" color="blue.600" cursor="pointer" _hover={{ textDecor: 'underline' }}>
                                                                                {student.email}
                                                                            </Text>
                                                                        </Tooltip>
                                                                    </VStack>
                                                                </Box>

                                                                <Box minW="250px" flex="1">
                                                                    <Text fontSize="xs" color="gray.600" fontWeight="bold" mb={2}>
                                                                        📍 ADRESA
                                                                    </Text>
                                                                    <Text fontSize="xs" color="gray.600" lineHeight="1.4">
                                                                        {student.address}
                                                                    </Text>
                                                                </Box>

                                                                <Box minW="150px">
                                                                    <Text fontSize="xs" color="gray.600" fontWeight="bold" mb={2}>
                                                                        🎓 ACADEMIC
                                                                    </Text>
                                                                    <VStack spacing={1} align="start">
                                                                        <Text fontSize="xs" color="gray.600">
                                                                            Medie: <Badge size="sm" colorScheme={student.gpa >= 9 ? 'green' : student.gpa >= 8 ? 'yellow' : 'red'}>
                                                                            {student.gpa}
                                                                        </Badge>
                                                                        </Text>
                                                                        <Text fontSize="xs" color="gray.600">
                                                                            Status: <Badge size="sm" colorScheme={student.status === 'active' ? 'green' : 'orange'}>
                                                                            {getStatusText(student.status)}
                                                                        </Badge>
                                                                        </Text>
                                                                        <Text fontSize="xs" color="gray.500">
                                                                            Înscris: {formatDate(student.enrollmentDate)}
                                                                        </Text>
                                                                    </VStack>
                                                                </Box>
                                                            </HStack>

                                                            {/* Courses Section */}
                                                            <Box>
                                                                <Text fontSize="xs" color="gray.600" fontWeight="bold" mb={2}>
                                                                    📚 CURSURI CURENTE ({student.courses?.length || 0})
                                                                </Text>
                                                                <Flex wrap="wrap" gap={2}>
                                                                    {student.courses?.map((course, index) => (
                                                                        <Badge
                                                                            key={index}
                                                                            colorScheme="blue"
                                                                            variant="outline"
                                                                            fontSize="xs"
                                                                            px={2}
                                                                            py={1}
                                                                            rounded="md"
                                                                        >
                                                                            {course}
                                                                        </Badge>
                                                                    ))}
                                                                </Flex>
                                                            </Box>

                                                            {/* Observations Section */}
                                                            {student.observations && (
                                                                <Box>
                                                                    <Text fontSize="xs" color="gray.600" fontWeight="bold" mb={2}>
                                                                        📝 OBSERVAȚII ȘI NOTE
                                                                    </Text>
                                                                    <Box
                                                                        bg="white"
                                                                        p={3}
                                                                        rounded="md"
                                                                        border="1px solid"
                                                                        borderColor="gray.200"
                                                                    >
                                                                        <Text fontSize="xs" color="gray.700" lineHeight="1.5">
                                                                            {student.observations}
                                                                        </Text>
                                                                    </Box>
                                                                </Box>
                                                            )}

                                                            {/* Quick Actions */}
                                                            <Box pt={2} borderTop="1px solid" borderColor="gray.200">
                                                                <Text fontSize="xs" color="gray.600" fontWeight="bold" mb={2}>
                                                                    ⚡ ACȚIUNI RAPIDE
                                                                </Text>
                                                                <Flex gap={2} wrap="wrap">
                                                                    <Box
                                                                        as="button"
                                                                        bg="blue.50"
                                                                        color="blue.600"
                                                                        px={3}
                                                                        py={1.5}
                                                                        rounded="md"
                                                                        fontSize="xs"
                                                                        fontWeight="medium"
                                                                        _hover={{ bg: 'blue.100' }}
                                                                        transition="all 0.2s"
                                                                    >
                                                                        📧 Trimite Email
                                                                    </Box>
                                                                    <Box
                                                                        as="button"
                                                                        bg="green.50"
                                                                        color="green.600"
                                                                        px={3}
                                                                        py={1.5}
                                                                        rounded="md"
                                                                        fontSize="xs"
                                                                        fontWeight="medium"
                                                                        _hover={{ bg: 'green.100' }}
                                                                        transition="all 0.2s"
                                                                    >
                                                                        📞 Apelează
                                                                    </Box>
                                                                    <Box
                                                                        as="button"
                                                                        bg="purple.50"
                                                                        color="purple.600"
                                                                        px={3}
                                                                        py={1.5}
                                                                        rounded="md"
                                                                        fontSize="xs"
                                                                        fontWeight="medium"
                                                                        _hover={{ bg: 'purple.100' }}
                                                                        transition="all 0.2s"
                                                                    >
                                                                        ✏️ Editează
                                                                    </Box>
                                                                    <Box
                                                                        as="button"
                                                                        bg="orange.50"
                                                                        color="orange.600"
                                                                        px={3}
                                                                        py={1.5}
                                                                        rounded="md"
                                                                        fontSize="xs"
                                                                        fontWeight="medium"
                                                                        _hover={{ bg: 'orange.100' }}
                                                                        transition="all 0.2s"
                                                                    >
                                                                        📄 Export Date
                                                                    </Box>
                                                                </Flex>
                                                            </Box>
                                                        </VStack>
                                                    </Box>
                                                </Collapse>
                                            </Td>
                                        </Tr>
                                    </React.Fragment>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>

                    {/* Footer with pagination */}
                    <Box
                        px={6}
                        py={3}
                        borderTop="1px solid"
                        borderColor="gray.200"
                        bg="white"
                    >
                        <Flex justify="space-between" align="center">
                            <Text fontSize="sm" color="gray.600">
                                {searchTerm ?
                                    `${filteredStudents.length} din ${students.length} studenți găsiți` :
                                    `1–${Math.min(filteredStudents.length, 6)} din ${filteredStudents.length}`
                                }
                            </Text>
                            <Flex gap={1}>
                                <Box
                                    as="button"
                                    p={1.5}
                                    rounded="md"
                                    bg="gray.50"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    _hover={{ bg: 'gray.100' }}
                                    transition="all 0.2s"
                                    fontSize="sm"
                                    color="gray.600"
                                >
                                    ◀
                                </Box>
                                <Box
                                    as="button"
                                    p={1.5}
                                    rounded="md"
                                    bg="gray.50"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    _hover={{ bg: 'gray.100' }}
                                    transition="all 0.2s"
                                    fontSize="sm"
                                    color="gray.600"
                                >
                                    ▶
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>

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

export default StudentsPanel;