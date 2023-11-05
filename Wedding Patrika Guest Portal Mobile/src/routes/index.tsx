import { Routes, Route } from "react-router-dom";
import WelcomePageWP from "../components/WelcomePageWP";
import LoginPage from "../components/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";
import { Center, Flex } from '@chakra-ui/react';
import { AuthProvider } from "../provider/AuthProvider";
import PinCheckPage from "../components/PinCheckPage";

export default function AppRouter() {
    return (
        <AuthProvider>
            <Center borderWidth='medium' >
                <Flex minW='360px' maxW='414px' minH='640px' maxH='932px' borderWidth='medium' borderColor='red' alignSelf='center'>
                    <Routes>
                        <Route path="/" element={<WelcomePageWP />} />
                        <Route path="/:url" element={<LoginPage />} />
                        <Route path="/:url/login" element={<PinCheckPage />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Flex>
            </Center>
        </AuthProvider>
    );
}