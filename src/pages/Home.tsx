import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Card,
    CardBody,
    CardFooter,
    Stack,
    useColorModeValue,
    Icon,
    Flex,
    VStack,
    HStack,
} from '@chakra-ui/react';
import {
    FiUpload,
    FiUser,
    FiTarget,
    FiBook,
} from 'react-icons/fi';

const features = [
    {
        title: 'Resume Analysis',
        description: 'Upload your resume and get instant feedback on your skills and experience.',
        icon: FiUpload,
    },
    {
        title: 'Personality Assessment',
        description: 'Take our MBTI-style quiz to understand your work preferences and strengths.',
        icon: FiUser,
    },
    {
        title: 'Smart Recommendations',
        description: 'Get personalized career recommendations based on your profile and preferences.',
        icon: FiTarget,
    },
    {
        title: 'Learning Paths',
        description: 'Access curated learning resources to develop skills for your target career.',
        icon: FiBook,
    },
];

const Home: React.FC = () => {
    const navigate = useNavigate();
    const bgGradient = useColorModeValue(
        'linear(to-r, blue.500, purple.500)',
        'linear(to-r, blue.200, purple.200)'
    );

    return (
        <Box>
            {/* Hero Section */}
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
                    <Stack spacing={8} align="center" textAlign="center">
                        <Heading
                            as="h1"
                            size="2xl"
                            fontWeight="bold"
                            lineHeight="shorter"
                        >
                            Discover Your Perfect Career Path
                        </Heading>
                        <Text fontSize="xl" maxW="2xl">
                            CareerWise uses AI to analyze your skills, personality, and goals to help you find the ideal career path.
                        </Text>
                        <Button
                            size="lg"
                            colorScheme="whiteAlpha"
                            onClick={() => navigate('/upload')}
                            leftIcon={<Icon as={FiUpload} />}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg',
                            }}
                        >
                            Get Started
                        </Button>
                    </Stack>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxW="container.xl" py={20}>
                <VStack spacing={8} align="center">
                    <Heading as="h2" size="xl">
                        How It Works
                    </Heading>
                    <Text fontSize="lg" color="gray.600" textAlign="center" maxW="2xl">
                        Our platform combines resume analysis, personality assessment, and AI-powered recommendations
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                variant="filled"
                                _hover={{
                                    transform: 'translateY(-4px)',
                                    shadow: 'lg',
                                }}
                                transition="all 0.2s"
                            >
                                <CardBody>
                                    <VStack spacing={4} align="center">
                                        <Icon
                                            as={feature.icon}
                                            w={10}
                                            h={10}
                                            color="blue.500"
                                        />
                                        <Heading size="md" textAlign="center">
                                            {feature.title}
                                        </Heading>
                                        <Text textAlign="center" color="gray.600">
                                            {feature.description}
                                        </Text>
                                    </VStack>
                                </CardBody>
                                <CardFooter justify="center">
                                    <Button
                                        variant="ghost"
                                        colorScheme="blue"
                                        onClick={() => navigate('/upload')}
                                    >
                                        Learn More
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Container>

            {/* CTA Section */}
            <Box bg="gray.50" py={20}>
                <Container maxW="container.md">
                    <Card
                        bgGradient={bgGradient}
                        color="white"
                        p={8}
                        textAlign="center"
                    >
                        <VStack spacing={6}>
                            <Heading as="h2" size="xl">
                                Ready to Start Your Career Journey?
                            </Heading>
                            <Text fontSize="lg">
                                Upload your resume and take our personality assessment to get personalized career recommendations.
                            </Text>
                            <Button
                                size="lg"
                                colorScheme="whiteAlpha"
                                onClick={() => navigate('/upload')}
                                leftIcon={<Icon as={FiUpload} />}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                            >
                                Get Started Now
                            </Button>
                        </VStack>
                    </Card>
                </Container>
            </Box>
        </Box>
    );
};

export default Home; 