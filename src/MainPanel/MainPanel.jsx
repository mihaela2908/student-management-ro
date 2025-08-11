// src/MainPanel/MainPanel.jsx

import React, { useState } from 'react';
import {
    Box,
    Flex,
    HStack,
    VStack,
    Text,
    Avatar,
    IconButton,
    Badge,
    Button,
    useToast,
    Divider
} from '@chakra-ui/react';
import {
    ArrowBackIcon,
    CloseIcon,
    EditIcon,
    StarIcon,
    CopyIcon,
} from '@chakra-ui/icons';

const MainPanel = ({ student, onClose, isOpen }) => {
    const [isStarred, setIsStarred] = useState(false);
    const toast = useToast();

    if (!student) return null;

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Copy to clipboard
    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: `${type} copiat!`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'bottom-right',
            });
        });
    };

    // Get avatar color
    const getAvatarColor = () => {
        const colors = ['purple.500', 'blue.500', 'teal.500', 'green.500'];
        const index = (student.firstName.charCodeAt(0) + student.lastName.charCodeAt(0)) % colors.length;
        return colors[index];
    };

    return (
        <Box
            h="100vh"
            bg="white"
            display="flex"
            flexDirection="column"
            opacity={isOpen ? 1 : 0}
            transition="opacity 0.3s"
        >
            {/* Header */}
            <Flex
                px={6}
                py={4}
                align="center"
                justify="space-between"
                borderBottom="1px"
                borderColor="gray.200"
                bg="white"
            >
                <HStack spacing={3}>
                    <IconButton
                        icon={<ArrowBackIcon />}
                        variant="ghost"
                        size="sm"
                        aria-label="Back"
                        onClick={onClose}
                    />
                    <Avatar
                        size="md"
                        name={`${student.firstName} ${student.lastName}`}
                        bg={getAvatarColor()}
                    />
                    <Text fontSize="lg" fontWeight="600" color="gray.800">
                        {student.firstName} {student.lastName}
                    </Text>
                    <IconButton
                        icon={<StarIcon />}
                        variant="ghost"
                        size="sm"
                        color={isStarred ? "yellow.400" : "gray.400"}
                        onClick={() => setIsStarred(!isStarred)}
                        aria-label="Favorite"
                    />
                </HStack>

                <IconButton
                    icon={<CloseIcon />}
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    aria-label="Close"
                />
            </Flex>

            {/* Content */}
            <Box
                flex="1"
                overflowY="auto"
                px={8}
                py={6}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f3f5',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#cbd5e0',
                        borderRadius: '3px',
                    },
                }}
            >
                <VStack spacing={8} align="stretch">
                    {/* Personal Information Section */}
                    <Box>
                        <Flex align="center" justify="space-between" mb={6}>
                            <Text fontSize="lg" fontWeight="600" color="gray.800">
                                Informații Personale
                            </Text>
                            <IconButton
                                icon={<EditIcon />}
                                variant="ghost"
                                size="sm"
                                aria-label="Edit"
                            />
                        </Flex>

                        <VStack spacing={4} align="stretch">
                            <HStack justify="space-between">
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Nume complet
                                    </Text>
                                    <Text fontSize="sm" color="gray.800">
                                        {student.firstName} {student.lastName}
                                    </Text>
                                </Box>
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Email
                                    </Text>
                                    <HStack spacing={2}>
                                        <Text fontSize="sm" color="gray.800">
                                            {student.email}
                                        </Text>
                                        <IconButton
                                            icon={<CopyIcon />}
                                            size="xs"
                                            variant="ghost"
                                            onClick={() => copyToClipboard(student.email, 'Email')}
                                            aria-label="Copy email"
                                        />
                                    </HStack>
                                </Box>
                            </HStack>

                            <HStack justify="space-between">
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Data nașterii
                                    </Text>
                                    <Text fontSize="sm" color="gray.800">
                                        🎂 {formatDate(student.birthDate)}
                                    </Text>
                                </Box>
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Telefon
                                    </Text>
                                    <HStack spacing={2}>
                                        <Text fontSize="sm" color="gray.800">
                                            {student.phone}
                                        </Text>
                                        <IconButton
                                            icon={<CopyIcon />}
                                            size="xs"
                                            variant="ghost"
                                            onClick={() => copyToClipboard(student.phone, 'Telefon')}
                                            aria-label="Copy phone"
                                        />
                                    </HStack>
                                </Box>
                            </HStack>

                            <HStack justify="space-between">
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Status
                                    </Text>
                                    <Badge
                                        colorScheme={student.status === 'active' ? 'green' : 'yellow'}
                                        px={2}
                                        py={1}
                                    >
                                        {student.status === 'active' ? 'ACTIV' : 'INACTIV'}
                                    </Badge>
                                </Box>
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Înscris din
                                    </Text>
                                    <Text fontSize="sm" color="gray.800">
                                        📅 {formatDate(student.enrollmentDate)}
                                    </Text>
                                </Box>
                            </HStack>
                        </VStack>
                    </Box>

                    <Divider />

                    {/* Academic Information Section */}
                    <Box>
                        <Flex align="center" justify="space-between" mb={6}>
                            <Text fontSize="lg" fontWeight="600" color="gray.800">
                                Informații Academice
                            </Text>
                            <IconButton
                                icon={<EditIcon />}
                                variant="ghost"
                                size="sm"
                                aria-label="Edit"
                            />
                        </Flex>

                        <VStack spacing={4} align="stretch">
                            <HStack justify="space-between">
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Facultatea
                                    </Text>
                                    <Text fontSize="sm" color="gray.800">
                                        {student.faculty}
                                    </Text>
                                </Box>
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Anul de studiu
                                    </Text>
                                    <Text fontSize="sm" color="gray.800">
                                        Anul {student.year}
                                    </Text>
                                </Box>
                            </HStack>

                            <HStack justify="space-between">
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Media generală
                                    </Text>
                                    <Text
                                        fontSize="2xl"
                                        fontWeight="bold"
                                        color={student.gpa >= 9 ? 'green.500' : 'blue.500'}
                                    >
                                        {student.gpa}
                                    </Text>
                                </Box>
                                <Box flex="1">
                                    <Text fontSize="xs" color="gray.500" mb={1}>
                                        Bursă
                                    </Text>
                                    <Badge
                                        colorScheme={student.scholarship ? 'green' : 'gray'}
                                        px={2}
                                        py={1}
                                    >
                                        {student.scholarship ? 'DA' : 'NU'}
                                    </Badge>
                                </Box>
                            </HStack>

                            <Box>
                                <Text fontSize="xs" color="gray.500" mb={1}>
                                    Adresa
                                </Text>
                                <Text fontSize="sm" color="gray.800">
                                    📍 {student.address}
                                </Text>
                            </Box>
                        </VStack>
                    </Box>

                    <Divider />

                    {/* Courses Section */}
                    <Box>
                        <Flex align="center" justify="space-between" mb={4}>
                            <Text fontSize="lg" fontWeight="600" color="gray.800">
                                Cursuri Curente
                            </Text>
                            <IconButton
                                icon={<EditIcon />}
                                variant="ghost"
                                size="sm"
                                aria-label="Edit"
                            />
                        </Flex>

                        <Flex wrap="wrap" gap={2}>
                            {student.courses?.map((course, index) => (
                                <Badge
                                    key={index}
                                    colorScheme="blue"
                                    variant="outline"
                                    px={3}
                                    py={1.5}
                                    borderRadius="full"
                                    fontSize="xs"
                                >
                                    {course.toUpperCase()}
                                </Badge>
                            ))}
                        </Flex>
                    </Box>
                </VStack>
            </Box>
        </Box>
    );
};

export default MainPanel;