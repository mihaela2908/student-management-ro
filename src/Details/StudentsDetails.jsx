import React from 'react';
import {
    Box,
    Flex,
    VStack,
    Text,
    Avatar,
    Badge,
    Button,
    IconButton,
    Divider,
    Card,
    CardBody,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Heading,
    Container,
    useColorModeValue
} from '@chakra-ui/react';
import { CloseIcon, EmailIcon, PhoneIcon, CalendarIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';

const StudentsDetails = ({ student, onClose, isOpen }) => {
    // Hooks must be called before any early returns
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ro-RO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        return status === 'active' ? 'green' : 'orange';
    };

    const getStatusText = (status) => {
        return status === 'active' ? 'Activ' : 'Inactiv';
    };

    if (!student || !isOpen) return null;

    return (
        <Box
            height="100%"
            width="100%"
            bg={bgColor}
            overflow="hidden"
            display="flex"
            flexDirection="column"
        >
            {/* Header */}
            <Box
                p={6}
                borderBottom="1px solid"
                borderColor={borderColor}
                bg="white"
                boxShadow="sm"
            >
                <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="lg" color="brand.700">
                        Detalii Student
                    </Heading>
                    <IconButton
                        aria-label="Închide panoul"
                        icon={<CloseIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={onClose}
                    />
                </Flex>

                <Flex align="center" gap={4}>
                    <Avatar
                        size="xl"
                        name={`${student.firstName} ${student.lastName}`}
                        src={student.profilePic}
                        border="4px solid"
                        borderColor="brand.100"
                    />
                    <Box>
                        <Text fontSize="2xl" fontWeight="bold" mb={2}>
                            {student.firstName} {student.lastName}
                        </Text>
                        <Flex gap={3} align="center">
                            <Badge
                                colorScheme={getStatusColor(student.status)}
                                variant="solid"
                                px={3}
                                py={1}
                                rounded="full"
                                fontSize="sm"
                            >
                                {getStatusText(student.status)}
                            </Badge>
                            <Text color="gray.600" fontSize="lg">
                                {student.faculty} • Anul {student.year}
                            </Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>

            {/* Content */}
            <Box flex="1" overflow="auto" p={6}>
                <Container maxW="full" p={0}>
                    <VStack spacing={6} align="stretch">
                        {/* Contact Information */}
                        <Card>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    <Heading size="md" color="brand.700" mb={2}>
                                        Informații de Contact
                                    </Heading>

                                    <Flex align="center" gap={3}>
                                        <EmailIcon color="brand.500" w={5} h={5} />
                                        <Box>
                                            <Text fontSize="sm" color="gray.600">Email</Text>
                                            <Text fontWeight="medium" color="blue.600" cursor="pointer">
                                                {student.email}
                                            </Text>
                                        </Box>
                                    </Flex>

                                    <Flex align="center" gap={3}>
                                        <PhoneIcon color="brand.500" w={5} h={5} />
                                        <Box>
                                            <Text fontSize="sm" color="gray.600">Telefon</Text>
                                            <Text fontWeight="medium">{student.phone}</Text>
                                        </Box>
                                    </Flex>

                                    <Flex align="center" gap={3}>
                                        <Box w={5} h={5} bg="brand.500" rounded="sm" />
                                        <Box>
                                            <Text fontSize="sm" color="gray.600">Adresa</Text>
                                            <Text fontWeight="medium">{student.address}</Text>
                                        </Box>
                                    </Flex>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Academic Information */}
                        <Card>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    <Heading size="md" color="brand.700" mb={2}>
                                        Informații Academice
                                    </Heading>

                                    <Flex justify="space-between" wrap="wrap" gap={4}>
                                        <Stat>
                                            <StatLabel>Facultatea</StatLabel>
                                            <StatNumber fontSize="lg">{student.faculty}</StatNumber>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Anul de studiu</StatLabel>
                                            <StatNumber fontSize="lg">Anul {student.year}</StatNumber>
                                        </Stat>
                                    </Flex>

                                    <Flex justify="space-between" wrap="wrap" gap={4}>
                                        <Stat>
                                            <StatLabel>Media generală</StatLabel>
                                            <StatNumber
                                                fontSize="3xl"
                                                color={student.gpa >= 9 ? 'green.500' :
                                                    student.gpa >= 8 ? 'yellow.500' : 'red.500'}
                                            >
                                                {student.gpa}
                                            </StatNumber>
                                            <StatHelpText>
                                                {student.gpa >= 9 ? 'Excelent' :
                                                    student.gpa >= 8 ? 'Foarte Bine' :
                                                        student.gpa >= 7 ? 'Bine' : 'Satisfăcător'}
                                            </StatHelpText>
                                        </Stat>
                                        <Stat>
                                            <StatLabel>Data înscrierii</StatLabel>
                                            <StatNumber fontSize="lg">
                                                {formatDate(student.enrollmentDate)}
                                            </StatNumber>
                                            <StatHelpText>
                                                <CalendarIcon mr={1} />
                                                {Math.floor((new Date() - new Date(student.enrollmentDate)) / (1000 * 60 * 60 * 24 * 365))} ani de studiu
                                            </StatHelpText>
                                        </Stat>
                                    </Flex>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Current Courses */}
                        <Card>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    <Heading size="md" color="brand.700" mb={2}>
                                        Cursuri Curente
                                    </Heading>

                                    {student.courses?.map((course, index) => (
                                        <Box
                                            key={index}
                                            p={4}
                                            bg="brand.50"
                                            rounded="md"
                                            borderLeft="4px"
                                            borderLeftColor="brand.500"
                                            transition="all 0.2s"
                                            _hover={{ bg: "brand.100", transform: "translateX(4px)" }}
                                        >
                                            <Flex justify="space-between" align="center">
                                                <Text fontWeight="medium" fontSize="md">
                                                    {course}
                                                </Text>
                                                <IconButton
                                                    aria-label="Vezi detalii curs"
                                                    icon={<ExternalLinkIcon />}
                                                    size="sm"
                                                    variant="ghost"
                                                    color="brand.600"
                                                />
                                            </Flex>
                                        </Box>
                                    ))}
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Observations */}
                        <Card>
                            <CardBody>
                                <VStack spacing={4} align="stretch">
                                    <Heading size="md" color="brand.700" mb={2}>
                                        Observații și Note
                                    </Heading>
                                    <Box
                                        p={4}
                                        bg="gray.50"
                                        rounded="md"
                                        border="1px solid"
                                        borderColor="gray.200"
                                    >
                                        <Text color="gray.700" lineHeight="tall">
                                            {student.observations}
                                        </Text>
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card>

                        {/* Action Buttons */}
                        <Card>
                            <CardBody>
                                <VStack spacing={4}>
                                    <Heading size="md" color="brand.700">
                                        Acțiuni Rapide
                                    </Heading>
                                    <Flex gap={3} wrap="wrap" justify="center">
                                        <Button
                                            leftIcon={<EditIcon />}
                                            colorScheme="brand"
                                            variant="solid"
                                            size="lg"
                                            minW="150px"
                                        >
                                            Editează Profil
                                        </Button>
                                        <Button
                                            leftIcon={<EmailIcon />}
                                            colorScheme="gray"
                                            variant="outline"
                                            size="lg"
                                            minW="150px"
                                        >
                                            Trimite Email
                                        </Button>
                                        <Button
                                            leftIcon={<PhoneIcon />}
                                            colorScheme="green"
                                            variant="outline"
                                            size="lg"
                                            minW="150px"
                                        >
                                            Apelează
                                        </Button>
                                    </Flex>
                                </VStack>
                            </CardBody>
                        </Card>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
};

export default StudentsDetails;