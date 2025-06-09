import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader,
    Stack,
    Badge,
    Progress,
    VStack,
    HStack,
    Icon,
    useColorModeValue,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { FiTarget, FiBook, FiTrendingUp } from 'react-icons/fi';

interface CareerPath {
    title: string;
    description: string;
    matchScore: number;
    requiredSkills: string[];
    learningResources: string[];
}

const Dashboard: React.FC = () => {
    const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const bgGradient = useColorModeValue(
        'linear(to-r, blue.500, purple.500)',
        'linear(to-r, blue.200, purple.200)'
    );

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const skills = JSON.parse(localStorage.getItem('skills') || '[]');
                const response = await fetch('http://localhost:5000/api/recommendations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ skills }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch recommendations');
                }

                const data = await response.json();
                setCareerPaths(data.recommendations);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="xl" color="blue.500" />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxW="container.md" py={8}>
                <Alert status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        Error Loading Recommendations
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        {error}
                    </AlertDescription>
                </Alert>
            </Container>
        );
    }

    return (
        <Box>
            {/* Header Section */}
            <Box
                bgGradient={bgGradient}
                color="white"
                py={20}
                position="relative"
                _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bg: 'blackAlpha.600',
                    zIndex: 1,
                }}
            >
                <Container maxW="container.xl" position="relative" zIndex={2}>
                    <Stack spacing={4} align="center" textAlign="center">
                        <Heading as="h1" size="2xl">
                            Your Career Dashboard
                        </Heading>
                        <Text fontSize="xl" maxW="2xl">
                            Based on your skills and preferences, here are your personalized career recommendations
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* Career Paths Section */}
            <Container maxW="container.xl" py={20}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                    {careerPaths.map((path, index) => (
                        <Card
                            key={index}
                            variant="filled"
                            _hover={{
                                transform: 'translateY(-4px)',
                                shadow: 'lg',
                            }}
                            transition="all 0.2s"
                        >
                            <CardHeader>
                                <VStack align="start" spacing={2}>
                                    <Heading size="md">{path.title}</Heading>
                                    <HStack>
                                        <Icon as={FiTarget} color="blue.500" />
                                        <Text>Match Score: {path.matchScore}%</Text>
                                    </HStack>
                                    <Progress
                                        value={path.matchScore}
                                        size="sm"
                                        colorScheme="blue"
                                        w="full"
                                    />
                                </VStack>
                            </CardHeader>
                            <CardBody>
                                <VStack align="start" spacing={4}>
                                    <Text>{path.description}</Text>

                                    <Box w="full">
                                        <Heading size="sm" mb={2}>
                                            Required Skills
                                        </Heading>
                                        <HStack wrap="wrap" spacing={2}>
                                            {path.requiredSkills.map((skill, skillIndex) => (
                                                <Badge
                                                    key={skillIndex}
                                                    colorScheme="blue"
                                                    variant="subtle"
                                                    px={2}
                                                    py={1}
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </HStack>
                                    </Box>

                                    <Box w="full">
                                        <Heading size="sm" mb={2}>
                                            Learning Resources
                                        </Heading>
                                        <VStack align="start" spacing={2}>
                                            {path.learningResources.map((resource, resourceIndex) => (
                                                <HStack key={resourceIndex}>
                                                    <Icon as={FiBook} color="green.500" />
                                                    <Text>{resource}</Text>
                                                </HStack>
                                            ))}
                                        </VStack>
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default Dashboard; 