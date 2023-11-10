import React from 'react'
import { useLocalStorage, EVENT_CREDS, EVENT_DATA } from '../provider/useLocalStorage';
import { Box, Center, Image, Link, Text, VStack } from '@chakra-ui/react';
import { endpoints } from '../data/constants';
import { getRemainingDays } from './LoginPage';
import ReactConfetti from 'react-confetti';
import useWindowDimensions from '../data/useWindowDimensions';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const { height, width } = useWindowDimensions();
    console.log(height, width)
    const [storedEventInfo, setStoredEventInfo] = useLocalStorage(EVENT_CREDS, null);
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    console.log('Stored EventInfo:', storedEventInfo);
    console.log('Stored EventData:', storedEventData);
    const base_img_url = endpoints.SERVER + '/' + storedEventInfo._id + '/';
    const navigate = useNavigate();
    return (
        <VStack w='100%' bgColor='black' h='full'>
            <VStack h={height * 0.4} w='100%'>
                <Image h='100%' w='100%' src={base_img_url + storedEventInfo.eventSplash} />
                <Center position='absolute' top={0} bottom={0} w='100%' maxH={height * 0.3} mt='12'>
                    <VStack>
                        <Text w='40%' fontSize='3xl' fontWeight='medium' color='white' textAlign='center' >{storedEventInfo.eventTitle}</Text>
                        <Text color='black' bgColor='whiteAlpha.700' w='70%' p='2' textAlign='center' borderRadius='4'>{getRemainingDays(storedEventInfo.eventDate)} DAYS TO GO</Text>
                    </VStack>
                </Center>
            </VStack>
            <ReactConfetti numberOfPieces={400} initialVelocityY={0.05} initialVelocityX={1}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} recycle={false}
            />
            <VStack>
                {
                    storedEventData && storedEventData.list && storedEventData.list.length > 0 &&
                    storedEventData.list.map((item: any, i: number) => {
                        return (
                            <VStack as={Link} mr='2' ml='2' borderRadius='16' onClick={() => navigate(item.category)}>
                                <Center borderRadius='16' position='absolute' w='100%' h={height * 0.25} >
                                    <Text w='100%' h='20%' textAlign='center' color='white' fontWeight='medium'>{item.docData.title}</Text>
                                </Center>
                                <Image borderRadius='16' h={height * 0.25} w={width} src={base_img_url + item.docData.titleBg} />
                            </VStack>
                        )
                    })
                }
            </VStack>
        </VStack>
    )
}

export default Dashboard

