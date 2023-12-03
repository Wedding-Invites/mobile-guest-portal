import useFetchData from '../data/useFetchData';
import { Box, Button, Center, IconButton, Image, Input, SimpleGrid, SlideFade, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, DIMS, endpoints, keypad_numbers } from '../data/constants';
import { useState } from 'react';
import { EVENT_CREDS, EVENT_DATA, useLocalStorage } from '../provider/useLocalStorage';
import useWindowDimensions from '../data/useWindowDimensions';
import { Backspace } from '@phosphor-icons/react';

export const getRemainingDays = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);
    const result = parseInt(((eventDate.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24)).toString(), 10);
    return result > 0 ? result : 0
}

function KeyboardBtn({ title, setInputPin, input }: { title: string, input: string, setInputPin: (txt: string) => void }) {
    const [isScaled, setIsScaled] = useState(false);

    const handleButtonClick = () => {
        setIsScaled(true);
        setTimeout(() => {
            setIsScaled(false);
        }, 250);
        if (title !== '')
            setInputPin(input + title)
    };
    const handleBackspace = () => {
        setIsScaled(true);
        setTimeout(() => {
            setIsScaled(false);
        }, 250);
        setInputPin(input.slice(0, -1));
    }
    return (
        <Box>
            {
                (title === '-') ?
                    <IconButton aria-label='' icon={<Backspace size={36} color='white' />}
                        boxSize='16'
                        m='2'
                        onClick={handleBackspace}
                        borderRadius='full'
                        style={{
                            transform: isScaled ? 'scale(1.0)' : 'scale(0.9)',
                            transformOrigin: '50% 50%',
                            transition: 'transform 250ms ease',
                            // color: '#FFFFFF', // Text color
                            // cursor: 'pointer', // Add pointer cursor on hover,
                            backgroundColor: '#00000022',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    />
                    :
                    <>
                        {/* <Box w='16' h='16' borderRadius='full' position='absolute' bgColor={title !== ' ' ? 'blackAlpha.700' : 'transparent'} /> */}
                        <Button
                            display={title === ' ' ? 'none' : 'flex'}
                            onClick={handleButtonClick}
                            borderRadius="full"
                            fontSize='3xl'
                            px='8'
                            py='10'
                            colorScheme='blackAlpha'
                            style={{
                                transform: isScaled ? 'scale(1.0)' : 'scale(0.9)',
                                transformOrigin: '50% 50%',
                                transition: 'transform 250ms ease',
                                color: '#FFFFFF', // Text color
                                cursor: 'pointer', // Add pointer cursor on hover,
                                WebkitTapHighlightColor: 'transparent'
                            }}
                        >
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
    const { height, width } = useWindowDimensions();

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
        toast({ colorScheme: 'blackAlpha', title: 'Event Data Fetched Successfully !', position: 'bottom' })
        setStoredEventData(eventData);
        setLoding(false);
        navigate(`dashboard`)
    }

    const onClickJoinWedding = () => {
        console.log("onClickJoinWedding");
        if (checkPinLayout === false) {
            if (data.data.eventStatus === false) {
                toast({ colorScheme: 'blackAlpha', title: "Event is Hidden !" });
                setStoredEventInfo(null);
                setStoredEventData(null);
            }
            else if (data.data.eventWebActive === false) {
                toast({ colorScheme: 'blackAlpha', title: "Event is Not Active !" });
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
                toast({ colorScheme: 'blackAlpha', title: "PIN MATCHED !!!", position: 'bottom' });
                setStoredEventInfo(data.data);
                setLoding(true);
                fetchEventCompleteData(data.data._id, eventDataCollection)
            }
            else if (inputPin !== data.data.eventPasscode) {
                setStoredEventInfo(null);
                setStoredEventData(null);
                toast({ colorScheme: 'blackAlpha', title: 'Wrong Passcode !', position: 'top' });
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
                    <Text noOfLines={3} mt={height * 0.38} textAlign='center' verticalAlign='center' fontSize='5xl' w='90%' color='white' mb="4" alignSelf='center' >{data.data.eventTitle}</Text>
                    <Text color='black' bgColor='whiteAlpha.700' w='70%' p='2' textAlign='center' borderRadius='4'>{getRemainingDays(data.data.eventDate)} DAYS TO GO</Text>
                </Center>
            }
            {
                checkPinLayout && <Box position='absolute' top={0} w={width} height={height} bgColor='blackAlpha.600' />
            }
            {/* <SlideFade in={checkPinLayout}> */}
            <Center visibility={checkPinLayout ? 'visible' : 'hidden'} position='absolute' top='-24' bottom={0} left={0} right={0} flexDirection='column'>
                <Text fontSize='4xl' color='white' >Enter Passcode</Text>
                <Input textAlign='center' value={inputPin} contentEditable={false} minWidth='1.5' w={4 * inputPin.length + ""} minW={0}
                    variant='unstyled' mb='12' borderBottomWidth='thin' fontSize='3xl' color='white' maxLength={6} borderRadius={0} />
                <SimpleGrid columns={3} justifyContent='center' alignItems='center' spacing='8'>
                    {
                        keypad_numbers.map((item, i) => {
                            return <KeyboardBtn title={item} key={i} setInputPin={(txt: string) => setInputPin(txt)} input={inputPin} />
                        })
                    }
                    {/* <BouncyButton /> */}
                </SimpleGrid>
            </Center>
            {/* </SlideFade> */}

            <Center>
                <Button loadingText='Loading' isLoading={loading} _loading={{ color: 'green', bgColor: 'black' }} position='absolute' bottom={0} mb='6' bgColor='blackAlpha.800' minW={DIMS.minW} borderRadius='16' maxW={DIMS.maxW}
                    borderWidth='2px' borderColor='white' fontSize='xl' alignSelf='center' color='white' _focus={{ bgColor: 'blackAlpha.800' }} p="2"
                    onClick={onClickJoinWedding} h="12"
                >
                    JOIN EVENT
                </Button>
            </Center>
        </Box>
    );
}

export default LoginPage