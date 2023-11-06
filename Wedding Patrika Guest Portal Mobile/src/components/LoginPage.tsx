import useFetchData from '../data/useFetchData';
import { Box, Button, Center, Flex, Icon, IconButton, Image, Input, Link, ScaleFade, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, DIMS, endpoints, keypad_numbers } from '../data/constants';
import { useState } from 'react';
import deleteIcon from '../assets/delete.png'
import { EVENT_CREDS, EVENT_DATA, useLocalStorage } from '../provider/useLocalStorage';

export const getRemainingDays = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);
    return parseInt(((eventDate.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24)).toString(), 10);
}

function KeyboardBtn({ title, setInputPin, input }: { title: string, input: string, setInputPin: (txt: string) => void }) {
    return (
        <Box>
            {
                (title === '-') ?
                    <Image w='12' h='12' src={deleteIcon} onClick={() => setInputPin(input.slice(0, -1))} />
                    :
                    <>
                        <Box w='16' h='16' borderRadius='full' position='absolute' bgColor={title !== ' ' ? 'blackAlpha.700' : 'transparent'} filter='auto' blur='sm' />
                        <Button borderWidth={0.1} _focus={{ bgColor: 'transparent' }} display={title === ' ' ? 'none' : 'flex'} onClick={() => title !== ' ' && setInputPin(input + title)} bgColor='transparent' color='white' borderRadius='full' fontSize={'2xl'} h='16' w='16'>
                            {title}
                        </Button>
                    </>
            }
        </Box >

    )
}

const fetchEventCompleteData = (_id: string, eventDataCollection: (eventData: any) => void) => {
    fetch(BASE_URL + endpoints.EVENT_DATA, {
        body: JSON.stringify({ eventId: _id }),
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        console.log(res);
        if (res.ok && res.status === 200) {
            const eventData = await res.json();
            console.log(eventData);
            if (eventData._id && eventData.list) {
                eventDataCollection(eventData)
            }
        }
    })
}

function LoginPage() {
    console.log(window.location.href)
    const toast = useToast();
    const navigate = useNavigate();
    const [checkPinLayout, setCheckPinLayout] = useState(false);
    const [inputPin, setInputPin] = useState('');
    const [storedEventInfo, setStoredEventInfo] = useLocalStorage(EVENT_CREDS, null);
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);

    const [loading, setLoding] = useState(false);
    const [data, isLoading, isError] = useFetchData(endpoints.LOGIN, 'POST', { "title": window.location.href });

    console.log(data, isLoading, isError)
    if (isError) {
        return <div>Error: {data.message}</div>;
    }
    if (isLoading || !data) {
        return <div>Loading...</div>;
    }
    console.log('Stored EventInfo:', storedEventInfo);
    console.log('Stored EventData:', storedEventData);

    const eventDataCollection = (eventData: any) => {
        toast({ title: 'Event Data Fetched Successfully !', position: 'top' })
        setStoredEventData(eventData);
        setLoding(false);
        navigate(`dashboard`)
    }

    const onClickJoinWedding = () => {
        console.log("onClickJoinWedding");
        if (checkPinLayout === false) {
            if (data.data.eventStatus === false) {
                toast({ title: "Event is Hidden !" });
                setStoredEventInfo(null);
                setStoredEventData(null);
            }
            else if (data.data.eventWebActive === false) {
                toast({ title: "Event is Not Active !" });
                setStoredEventInfo(null);
                setStoredEventData(null);
            }
            else {
                if (data.data.eventPrivacy === true) {
                    setCheckPinLayout(true);
                }
                else {
                    //! Move to dashboard directly...
                    //    fetchEventData();
                    fetchEventCompleteData(data.data._id, eventDataCollection)
                }
            }
        }
        else if (checkPinLayout === true) {
            if (inputPin === data.data.eventPasscode) {
                toast({ title: "PIN MATCHED !!!", position: 'top' });
                setStoredEventInfo(data.data);
                setLoding(true);
                fetchEventCompleteData(data.data._id, eventDataCollection)
            }
            else if (inputPin !== data.data.eventPasscode) {
                setStoredEventInfo(null);
                setStoredEventData(null);
                toast({ title: 'Wrong Passcode !', position: 'top' });
            }
            // fetchEventData();
        }
    }

    return (
        data && data.data &&
        <Box>
            <Image filter={'auto'} blur={checkPinLayout ? 'md' : 'none'} src={endpoints.SERVER + '/' + data.data._id + '/' + data.data.eventSplash} />
            {
                !checkPinLayout && <Center transition='ease' transitionDelay='4' flexDirection='column' position='absolute' bgColor='blackAlpha.600' top={0} bottom={0} w='100%' {...DIMS} >
                    <Text noOfLines={3} textAlign='center' verticalAlign='center' fontSize='5xl' w='90%' h='30%' color='white' alignSelf='center' >{data.data.eventTitle}</Text>
                    <Text color='black' bgColor='whiteAlpha.700' w='70%' p='2' textAlign='center' borderRadius='4'>{getRemainingDays(data.data.eventDate)} DAYS TO GO</Text>
                </Center>
            }
            <ScaleFade initialScale={0} in={checkPinLayout}>
                <Center position='absolute' top='-24' bottom={0} left={0} right={0} flexDirection='column'>
                    <Text fontSize='4xl' color='white' >Enter Passcode</Text>
                    <Input letterSpacing='widest' textAlign='center' value={inputPin} contentEditable={false} alignSelf='center' borderBottomColor='white' variant='unstyled' mb='12' borderBottomWidth='medium' w='32' fontSize='3xl' color='white' />
                    <SimpleGrid columns={3} justifyContent='center' alignItems='center' spacing='8'>
                        {
                            keypad_numbers.map((item, i) => {
                                return <KeyboardBtn title={item} key={i} setInputPin={(txt: string) => setInputPin(txt)} input={inputPin} />
                            })
                        }
                    </SimpleGrid>
                </Center>
            </ScaleFade>

            <Center>
                <Button loadingText='Loading' isLoading={loading} _loading={{ color: 'green', bgColor: 'black' }} position='absolute' bottom={0} mb='4' bgColor='blackAlpha.800' minW={DIMS.minW} borderRadius='12' maxW={DIMS.maxW}
                    borderWidth='thin' borderColor='white' fontSize='xl' alignSelf='center' color='white' _focus={{ bgColor: 'blackAlpha.800' }}
                    onClick={onClickJoinWedding}
                >
                    Join Event
                </Button>
            </Center>
        </Box>
    );
}

export default LoginPage