import React from 'react'
import { useLocalStorage, EVENT_CREDS, EVENT_DATA } from '../provider/useLocalStorage';
import { Box, Button, Center, Image, Link, Text, VStack } from '@chakra-ui/react';
import { endpoints } from '../data/constants';
import { getRemainingDays } from './LoginPage';
import ReactConfetti from 'react-confetti';
import useWindowDimensions from '../data/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import ShimmerView from './animated/ShimmerView';

const colors = [
    '#ff726d', // lt_orange
    '#f4306d', // lt_pink
    '#b48def', // lt_purple
    '#fce18a', // lt_yellow
];
const colorArray = [
    '#be2f2a', // roseStart
    '#dbcc1d', // roseEnd
    '#7141e2', // greenStart
    '#d46cb3', // greenEnd
];
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
            <VStack h={height * 0.5} w='100%'>
                <Image w={width} height={height * 0.5} src={base_img_url + storedEventInfo.eventSplash} />
                <Box w={width} height={height * 0.5} position='absolute' bgColor='blackAlpha.600' />
                <Center position='absolute' top={0} bottom={0} w='100%' maxH={height * 0.4} mt='12'>
                    <VStack>
                        <Text w='40%' fontSize='3xl' fontWeight='medium' color='white' textAlign='center' >{storedEventInfo.eventTitle}</Text>
                        <Text color='black' bgColor='whiteAlpha.700' w='70%' p='2' textAlign='center' borderRadius='4'>{getRemainingDays(storedEventInfo.eventDate)} DAYS TO GO</Text>
                    </VStack>
                </Center>
                {/* <ShimmerView width={100} height={24} duration={1} label={"Days to go"} onClick={() => { }} /> */}
            </VStack>
            <ReactConfetti numberOfPieces={200} initialVelocityY={0.01} initialVelocityX={1} colors={colors}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} recycle={false}
            />
            <VStack>
                {
                    storedEventData && storedEventData.list && storedEventData.list.length > 0 &&
                    storedEventData.list.map((item: any, i: number) => {
                        return (
                            <VStack style={{ WebkitTapHighlightColor: 'transparent' }} as={Link} mr='3' ml='3' mt='1' borderRadius='8' onClick={() => navigate(item.category)}>
                                <Center borderRadius='8' position='absolute' w='100%' h={height * 0.20} >
                                    <Text w='100%' h='20%' textAlign='center' color='white' fontWeight='medium'>{item.docData.title}</Text>
                                </Center>
                                <Image borderRadius='8' h={height * 0.2} w={width} src={base_img_url + item.docData.titleBg} />
                            </VStack>
                        )
                    })
                }
            </VStack>
            <Button color='white' mb='6' mt='2' fontSize='x-small' variant='link' onClick={() => navigate('aboutus')}>
                DESIGNED BY - WEDDING PATRIKA
            </Button>
        </VStack>
    )
}

export default Dashboard
