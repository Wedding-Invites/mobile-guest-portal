import useFetchData from '../data/useFetchData';
import endpoints from '../data/endpoints';
import { Box, Button, Center, Flex, Image, Link, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const getRemainingDays = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);
    return parseInt(((eventDate.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24)).toString(), 10);
}

function LoginPage() {
    console.log(window.location.href)
    const toast = useToast();
    const navigate = useNavigate();

    const [data, isLoading, isError] = useFetchData(endpoints.LOGIN, 'POST', { "title": window.location.href });
    console.log(data, isLoading, isError)
    if (isError) {
        return <div>Error: {data.message}</div>;
    }
    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    const onClickJoinWedding = () => {
        console.log("onClickJoinWedding");
        if (data.data.eventStatus === false) {
            toast({ title: "Event is Hidden !" })
        }
        else if (data.data.eventWebActive === false) {
            toast({ title: "Event is Not Active !" })
        }
        else {
            if (data.data.eventPrivacy === false) {
                navigate("login", { relative: 'route' })
            }
            toast({ title: "Event is Active !" })
        }
    }

    return (
        data && data.data &&
        <Box>
            <Image src={endpoints.SERVER + '/' + data.data._id + '/' + data.data.eventSplash} />
            <Center flexDirection='column' position='absolute' bgColor='blackAlpha.600' top={0} bottom={0} w='100%'  >
                <Text noOfLines={3} textAlign='center' verticalAlign='center' fontSize='5xl' w='90%' h='30%' color='white' alignSelf='center' >{data.data.eventTitle}</Text>
                <Text color='black' bgColor='whiteAlpha.700' w='70%' p='2' textAlign='center' borderRadius='4'>{getRemainingDays(data.data.eventDate)} DAYS TO GO</Text>
            </Center>
            <Button ml='3%' position='absolute' bottom={0} mb='20%' bgColor='blackAlpha.800' w='90%' borderRadius='12'
                borderWidth='thin' borderColor='white' fontSize='xl' alignSelf='center' color='white' _focus={{ bgColor: 'blackAlpha.800' }}
                onClick={onClickJoinWedding}
            >
                Join Wedding
            </Button>
        </Box>
    );
}

export default LoginPage