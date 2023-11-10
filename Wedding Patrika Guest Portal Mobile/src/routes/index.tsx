import { Routes, Route } from "react-router-dom";
import WelcomePageWP from "../components/WelcomePageWP";
import LoginPage from "../components/LoginPage";
import Dashboard from "../components/Dashboard";
import { Flex } from '@chakra-ui/react';
import { AuthProvider } from "../provider/AuthProvider";
import { DIMS } from "../data/constants";
import Invitation from "../components/features/Invitation";
import DateTimings from "../components/features/DateTimings";
import Gallery from "../components/features/Gallery";
import LiveWedding from "../components/features/LiveWedding";
import Memories from "../components/features/Memories";
import Journey from "../components/features/Journey";
import Firms from "../components/features/Firms";


export default function AppRouter() {
    return (
        <AuthProvider>
            {/* <Center borderWidth='medium' > */}
            <Flex {...DIMS} borderWidth='thin' borderColor='red' alignSelf='center'>
                <Routes>
                    <Route path="/" element={<WelcomePageWP />} />
                    <Route path="/:url" element={<LoginPage />} />
                    <Route path="/:url/dashboard" element={<Dashboard />} />
                    <Route path="/:url/dashboard/Invitation" element={<Invitation />} />
                    <Route path="/:url/dashboard/DateAndTimings" element={<DateTimings />} />
                    <Route path="/:url/dashboard/Gallery" element={<Gallery />} />
                    <Route path="/:url/dashboard/LiveWedding" element={<LiveWedding />} />
                    <Route path="/:url/dashboard/Memories" element={<Memories />} />
                    <Route path="/:url/dashboard/Journeys" element={<Journey />} />
                    <Route path="/:url/dashboard/Firms" element={<Firms />} />
                </Routes>
            </Flex>
            {/* </Center> */}
        </AuthProvider>
    );
}