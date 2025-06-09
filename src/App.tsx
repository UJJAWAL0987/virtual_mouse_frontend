import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumeUpload from './pages/ResumeUpload';
import PersonalityQuiz from './pages/PersonalityQuiz';
import Dashboard from './pages/Dashboard';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'gray.50',
                color: 'gray.800',
            },
        },
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'semibold',
                borderRadius: 'md',
            },
            variants: {
                solid: {
                    _hover: {
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    },
                },
            },
        },
        Card: {
            baseStyle: {
                container: {
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                },
            },
        },
    },
});

const App: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<ResumeUpload />} />
                    <Route path="/quiz" element={<PersonalityQuiz />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
};

export default App;
