import React from 'react';
import {
    Box,
    Flex,
    HStack,
    VStack,
    Text,
    Avatar,
    IconButton,
    Card,
    CardBody,
    Grid,
    GridItem
} from '@chakra-ui/react';
import { ArrowBackIcon, CloseIcon, EditIcon, StarIcon } from '@chakra-ui/icons';

const MainPanel = ({ student, onClose }) => {
    console.log('MainPanel primește student:', student); // DEBUG

    if (!student) {
        return (
            <Box
                h="100vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="gray.500"
            >
                <Text fontSize="lg">Selectează un elev pentru a vedea detaliile</Text>
            </Box>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Box h="100vh" bg="white">
            {/* Header */}
            <Flex
                align="center"
                justify="space-between"
                p={4}
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
                    />
                    <Avatar
                        size="sm"
                        src={student.profilePic}
                        name={`${student.firstName} ${student.lastName}`}
                    />
                    <Text fontWeight="semibold">
                        {student.firstName} {student.lastName}
                    </Text>
                    <IconButton
                        icon={<StarIcon />}
                        variant="ghost"
                        size="sm"
                        color="gray.400"
                        aria-label="Star"
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
            <Box p={6} h="calc(100vh - 73px)" overflowY="auto">
                <VStack spacing={6} align="stretch">
                    {/* Personal Information */}
                    <Card>
                        <CardBody>
                            <Flex align="center" justify="space-between" mb={4}>
                                <Text fontSize="lg" fontWeight="semibold">
                                    Personal information
                                </Text>
                                <IconButton
                                    icon={<EditIcon />}
                                    variant="ghost"
                                    size="sm"
                                    aria-label="Edit"
                                />
                            </Flex>

                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                <GridItem>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="gray.600">Nume</Text>
                                        <Text fontSize="sm">{student.firstName} {student.lastName}</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="gray.600">Email</Text>
                                        <Text fontSize="sm">{student.email}</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="gray.600">Telefon</Text>
                                        <Text fontSize="sm">{student.phone}</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="gray.600">Facultate</Text>
                                        <Text fontSize="sm">{student.faculty}</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="gray.600">An</Text>
                                        <Text fontSize="sm">Anul {student.year}</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem>
                                    <VStack align="start" spacing={1}>
                                        <Text fontSize="sm" color="gray.600">Medie</Text>
                                        <Text fontSize="sm" fontWeight="bold" color="green.500">
                                            {student.gpa}
                                        </Text>
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </CardBody>
                    </Card>
                </VStack>
            </Box>
        </Box>
    );
};

export default MainPanel;