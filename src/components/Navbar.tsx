import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useColorModeValue,
    Stack,
    Icon,
    Text,
    Container,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FiHome, FiUpload, FiUser, FiTarget } from 'react-icons/fi';

const Links = [
    { name: 'Home', path: '/', icon: FiHome },
    { name: 'Upload Resume', path: '/upload', icon: FiUpload },
    { name: 'Personality Quiz', path: '/quiz', icon: FiUser },
    { name: 'Dashboard', path: '/dashboard', icon: FiTarget },
];

const NavLink = ({ children, to, icon: Icon }: { children: React.ReactNode; to: string; icon: any }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    const bgColor = useColorModeValue('blue.50', 'blue.900');
    const textColor = useColorModeValue('blue.600', 'blue.200');

    return (
        <RouterLink to={to}>
            <HStack
                px={4}
                py={2}
                rounded="md"
                _hover={{
                    textDecoration: 'none',
                    bg: bgColor,
                }}
                bg={isActive ? bgColor : 'transparent'}
                color={isActive ? textColor : 'inherit'}
            >
                <Icon />
                <Text>{children}</Text>
            </HStack>
        </RouterLink>
    );
};

const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    return (
        <Box
            bg={bgColor}
            px={4}
            borderBottom="1px"
            borderColor={borderColor}
            position="sticky"
            top={0}
            zIndex={1000}
        >
            <Container maxW="container.xl">
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />

                    <HStack spacing={8} alignItems="center">
                        <RouterLink to="/">
                            <Text
                                fontSize="xl"
                                fontWeight="bold"
                                color={useColorModeValue('blue.600', 'blue.200')}
                            >
                                CareerWise
                            </Text>
                        </RouterLink>
                        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.name} to={link.path} icon={link.icon}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <Flex alignItems="center">
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded="full"
                                variant="link"
                                cursor="pointer"
                                minW={0}
                            >
                                <Text>Menu</Text>
                            </MenuButton>
                            <MenuList>
                                {Links.map((link) => (
                                    <MenuItem
                                        key={link.name}
                                        as={RouterLink}
                                        to={link.path}
                                        icon={<Icon as={link.icon} />}
                                    >
                                        {link.name}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Container>

            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">CareerWise</DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4} align="stretch">
                            {Links.map((link) => (
                                <NavLink key={link.name} to={link.path} icon={link.icon}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default Navbar; 