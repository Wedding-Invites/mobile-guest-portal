import Foldy from "foldy";
import { endpoints } from "../../data/constants";
import getParsedData from "../../data/getParsedData";
import useWindowDimensions from "../../data/useWindowDimensions";
import { useLocalStorage, EVENT_DATA } from "../../provider/useLocalStorage";
import React from "react";
import { Box, Button, Center, Divider, Image, Text, VStack } from "@chakra-ui/react";

function Journey() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const journeysData = getParsedData(storedEventData.list, "Journeys");
    console.log(journeysData);
    const journeysList = journeysData.docData.journeys
    console.log(journeysList)
    // journeyDetails:"I have always been an achiever."
    // journeyHeading:"Shiva"journeyImg:"1699128142790-@-journey_groom.jpg"_id:"6546a38bcd9a966243716415"
    const front = <Button w='24'>This is displayed when Foldy is collapsed</Button>;
    const [open, setOpen] = React.useState<number | null>(null);
    const { height, width } = useWindowDimensions();
    const onFoldClickHandler = (i: number) => {
        setOpen(i)
    }
    const layoutWidth = width * 0.95;
    return (
        <VStack bgColor='red' alignItems={'center'} mt='4' >
            {
                journeysList.map(
                    (item: any, i: number) => {
                        const list = [
                            <Box w={layoutWidth} mx='1' onClick={() => setOpen(open === i ? null : i)} h="32">
                                <Image w={layoutWidth} mx='1' h="32" src={base_img_url + item.journeyImg} />
                            </Box>,
                            open === i ?
                                <VStack px='4' pt='2' w={layoutWidth} mx='1' onClick={() => setOpen(open === i ? null : i)} >
                                    <Text>{item.journeyHeading}</Text>
                                    <Box h='0.1' w='100%' bgColor='black' />
                                    <Text>{item.journeyDetails}</Text>
                                </VStack> : <></>,

                            open !== i ?
                                <Box w={layoutWidth} mx='1' onClick={() => setOpen(open === i ? null : i)} >
                                    <Image h="32" src={base_img_url + item.journeyImg} w={layoutWidth} mx='1' />
                                    <Center onClick={() => setOpen(i)} w={layoutWidth} mx='1' bgColor="blackAlpha.500" position='absolute' top={0} height="32" >
                                        <Text color='white' borderWidth='2px' borderColor='white' px='28' py='4' >{item.journeyHeading}</Text>
                                    </Center>
                                </Box> : <></>,
                        ]
                        return (
                            <Foldy
                                customClass="foldy"
                                front={front}
                                list={list}
                                duration={1000}
                                open={open === i}
                            />
                        )
                    }
                )
            }

        </VStack>

    )
}

export default Journey
