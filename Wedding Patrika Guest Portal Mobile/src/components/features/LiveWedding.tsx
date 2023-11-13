import { Box, Center, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { endpoints } from "../../data/constants";
import getParsedData from "../../data/getParsedData";
import useWindowDimensions from "../../data/useWindowDimensions";
import { useLocalStorage, EVENT_DATA } from "../../provider/useLocalStorage";
import { CarProfile, FaceMask, PlayCircle } from "@phosphor-icons/react";

function LiveWedding() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const liveWeddingData = getParsedData(storedEventData.list, "LiveWedding").docData.basicDetails;
    console.log(liveWeddingData)
    const { height, width } = useWindowDimensions();
    return (
        <VStack w={width} h={height} bgColor='black'>
            {liveWeddingData === undefined && <Text color='white'>No Data Available for Live Wedding !</Text>}
            <Center>
                <Image h={height * 0.5} width={width} src={base_img_url + liveWeddingData.liveWeddingBg} />
                <PlayCircle style={{ position: 'absolute' }} color='white' size={56} />
            </Center>
            <VStack w={width * 0.9} bgColor='blackAlpha.800' mt="-20" py='1'>
                <Text color='white' textAlign='left' w={width * 0.8} fontSize='small' >Premieres on { }</Text>
                <Text color='white' textAlign='left' w={width * 0.8} fontSize='small'>Estimated Time { }</Text>
            </VStack>
            <VStack h={height * 0.5} w={width} bgColor='black' pt='2'>
                <VStack spacing={0} w={width} px="4">
                    <HStack w={"100%"} alignItems='center'>
                        <Box borderRadius='4' w="2" h="2" bgColor='red' />
                        <Text color="white"> {liveWeddingData.weddingTitle}</Text>
                    </HStack>
                    <HStack w={"100%"}>
                        <Text color='white'>Family Waiting </Text>
                        <Text color='blue'>{liveWeddingData.hashtags} </Text>
                    </HStack>
                </VStack>
                <Divider />
                <HStack alignItems='center' justifyContent='space-between' w={width * 0.95}>
                    <HStack>
                        <Box w="8" h="8" bgColor="white" borderRadius={24} />
                        <Text color='white'>{liveWeddingData.channelName}</Text>
                    </HStack>
                    <Text color='white'>Subscribe</Text>
                </HStack>
                <Divider />
            </VStack>
            <Text h="full" w={width} color='white' p="4">
                {liveWeddingData.description}
            </Text>
        </VStack>
    )
}

export default LiveWedding