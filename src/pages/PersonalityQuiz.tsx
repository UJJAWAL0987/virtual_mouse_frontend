import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Radio,
    RadioGroup,
    Button,
    Progress,
    Card,
    CardBody,
    CardHeader,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';

interface Question {
    id: number;
    text: string;
    options: {
        text: string;
        value: string;
    }[];
}

const questions: Question[] = [
    {
        id: 1,
        text: 'How do you prefer to work?',
        options: [
            { text: 'Independently, focusing on my own tasks', value: 'I' },
            { text: 'In a team, collaborating with others', value: 'E' },
        ],
    },
    {
        id: 2,
        text: 'When solving problems, you tend to:',
        options: [
            { text: 'Focus on concrete facts and details', value: 'S' },
            { text: 'Consider abstract theories and possibilities', value: 'N' },
        ],
    },
    {
        id: 3,
        text: 'When making decisions, you usually:',
        options: [
            { text: 'Base them on logic and objective analysis', value: 'T' },
            { text: 'Consider how they affect people and values', value: 'F' },
        ],
    },
    {
        id: 4,
        text: 'In your work environment, you prefer:',
        options: [
            { text: 'A structured, planned approach', value: 'J' },
            { text: 'Flexibility and spontaneity', value: 'P' },
        ],
    },
];

const PersonalityQuiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const bgGradient = useColorModeValue(
        'linear(to-r, blue.500, purple.500)',
        'linear(to-r, blue.200, purple.200)'
    );

    const handleAnswer = (value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: value,
        }));
    };

    const handleNext = () => {
        if (!answers[currentQuestion]) {
            setError('Please select an answer before proceeding');
            return;
        }
        setError(null);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            const personalityType = Object.values(answers).join('');
            localStorage.setItem('personalityType', personalityType);
            navigate('/dashboard');
        }
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

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
                    <VStack spacing={4} align="center" textAlign="center">
                        <Heading as="h1" size="2xl">
                            Personality Assessment
                        </Heading>
                        <Text fontSize="xl" maxW="2xl">
                            Help us understand your work preferences to provide better career recommendations
                        </Text>
                    </VStack>
                </Container>
            </Box>

            {/* Quiz Section */}
            <Container maxW="container.md" py={20}>
                <VStack spacing={8}>
                    <Card w="full" variant="filled">
                        <CardHeader>
                            <VStack align="start" spacing={2}>
                                <Heading size="md">
                                    Question {currentQuestion + 1} of {questions.length}
                                </Heading>
                                <Progress
                                    value={progress}
                                    size="sm"
                                    colorScheme="blue"
                                    w="full"
                                />
                            </VStack>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={6} align="start">
                                <Text fontSize="lg" fontWeight="medium">
                                    {questions[currentQuestion].text}
                                </Text>

                                <RadioGroup
                                    onChange={handleAnswer}
                                    value={answers[currentQuestion] || ''}
                                >
                                    <VStack spacing={4} align="start">
                                        {questions[currentQuestion].options.map((option, index) => (
                                            <Radio
                                                key={index}
                                                value={option.value}
                                                size="lg"
                                                colorScheme="blue"
                                            >
                                                <Text>{option.text}</Text>
                                            </Radio>
                                        ))}
                                    </VStack>
                                </RadioGroup>

                                {error && (
                                    <Alert status="error" variant="subtle">
                                        <AlertIcon />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    colorScheme="blue"
                                    size="lg"
                                    onClick={handleNext}
                                    w="full"
                                >
                                    {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
                                </Button>
                            </VStack>
                        </CardBody>
                    </Card>

                    {/* Information Card */}
                    <Card w="full" variant="filled">
                        <CardHeader>
                            <Heading size="md">About This Assessment</Heading>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={4} align="start">
                                <Text>
                                    This assessment is based on the MBTI (Myers-Briggs Type Indicator) framework,
                                    which helps us understand your work preferences and personality traits.
                                </Text>
                                <Text>
                                    Your answers will help us provide more accurate career recommendations
                                    that align with your natural strengths and preferences.
                                </Text>
                            </VStack>
                        </CardBody>
                    </Card>
                </VStack>
            </Container>
        </Box>
    );
};

export default PersonalityQuiz; 