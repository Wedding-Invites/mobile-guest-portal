import { Routes, Route } from "react-router-dom";
import WelcomePageWP from "../components/WelcomePageWP";
import LoginPage from "../components/LoginPage";
import Dashboard from "../components/Dashboard";
import { Flex } from '@chakra-ui/react';
import { AuthProvider } from "../provider/AuthProvider";
import { DIMS } from "../data/constants";


export default function AppRouter() {
    return (
        <AuthProvider>
            {/* <Center borderWidth='medium' > */}
            <Flex {...DIMS} borderWidth='thin' borderColor='red' alignSelf='center'>
                <Routes>
                    <Route path="/" element={<WelcomePageWP />} />
                    <Route path="/:url" element={<LoginPage />} />
                    <Route path="/:url/dashboard" element={<Dashboard />} />

                </Routes>
            </Flex>
            {/* </Center> */}
        </AuthProvider>
    );
}