import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Icon,
    useColorModeValue,
    Card,
    CardBody,
    CardHeader,
    List,
    ListItem,
    ListIcon,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Progress,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react';
import { FiUpload, FiCheckCircle, FiAlertCircle, FiFileText } from 'react-icons/fi';

const ResumeUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedSkills, setUploadedSkills] = useState<string[]>([]);
    const navigate = useNavigate();
    const bgGradient = useColorModeValue(
        'linear(to-r, blue.500, purple.500)',
        'linear(to-r, blue.200, purple.200)'
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Please upload a PDF file');
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('resume', file);

            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload resume');
            }

            const data = await response.json();
            setUploadedSkills(data.skills);
            localStorage.setItem('skills', JSON.stringify(data.skills));
            navigate('/quiz');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setUploading(false);
        }
    };

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
                            Upload Your Resume
                        </Heading>
                        <Text fontSize="xl" maxW="2xl">
                            Upload your resume to get personalized career recommendations based on your skills and experience
                        </Text>
                    </VStack>
                </Container>
            </Box>

            {/* Upload Section */}
            <Container maxW="container.md" py={20}>
                <VStack spacing={8}>
                    <Card w="full" variant="filled">
                        <CardHeader>
                            <VStack align="start" spacing={2}>
                                <Heading size="md">Resume Upload</Heading>
                                <Text color="gray.600">
                                    Upload your resume in PDF format to analyze your skills and experience
                                </Text>
                            </VStack>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={6}>
                                <FormControl>
                                    <FormLabel>Select Resume (PDF)</FormLabel>
                                    <Input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        p={1}
                                        border="2px dashed"
                                        borderColor="gray.200"
                                        _hover={{ borderColor: 'blue.500' }}
                                    />
                                    <FormHelperText>
                                        Only PDF files are accepted
                                    </FormHelperText>
                                </FormControl>

                                {file && (
                                    <HStack spacing={2}>
                                        <Icon as={FiFileText} color="blue.500" />
                                        <Text>{file.name}</Text>
                                    </HStack>
                                )}

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
                                    leftIcon={<Icon as={FiUpload} />}
                                    onClick={handleUpload}
                                    isLoading={uploading}
                                    loadingText="Uploading..."
                                    w="full"
                                >
                                    Upload Resume
                                </Button>
                            </VStack>
                        </CardBody>
                    </Card>

                    {/* What to Expect Section */}
                    <Card w="full" variant="filled">
                        <CardHeader>
                            <Heading size="md">What to Expect</Heading>
                        </CardHeader>
                        <CardBody>
                            <List spacing={4}>
                                <ListItem>
                                    <HStack align="start">
                                        <ListIcon as={FiCheckCircle} color="green.500" />
                                        <VStack align="start" spacing={1}>
                                            <Text fontWeight="bold">Skill Extraction</Text>
                                            <Text color="gray.600">
                                                We'll analyze your resume to identify your key skills and experience
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </ListItem>
                                <ListItem>
                                    <HStack align="start">
                                        <ListIcon as={FiCheckCircle} color="green.500" />
                                        <VStack align="start" spacing={1}>
                                            <Text fontWeight="bold">Experience Analysis</Text>
                                            <Text color="gray.600">
                                                Your work history and achievements will be evaluated
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </ListItem>
                                <ListItem>
                                    <HStack align="start">
                                        <ListIcon as={FiCheckCircle} color="green.500" />
                                        <VStack align="start" spacing={1}>
                                            <Text fontWeight="bold">Personalized Recommendations</Text>
                                            <Text color="gray.600">
                                                Get career paths and learning resources tailored to your profile
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </ListItem>
                            </List>
                        </CardBody>
                    </Card>
                </VStack>
            </Container>
        </Box>
    );
};

export default ResumeUpload; 