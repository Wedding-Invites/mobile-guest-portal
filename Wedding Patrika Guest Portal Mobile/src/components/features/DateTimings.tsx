import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


import './dateTimingStyles.css'

// import required modules
import { Parallax, Pagination } from 'swiper/modules';
import { endpoints } from '../../data/constants';
import getParsedData from '../../data/getParsedData';
import useWindowDimensions from '../../data/useWindowDimensions';
import { useLocalStorage, EVENT_DATA } from '../../provider/useLocalStorage';
import { Box, Button, Image, Tag, TagLabel, TagLeftIcon, Text, VStack } from '@chakra-ui/react';
import { IdentificationBadge, MapPin, Clock } from '@phosphor-icons/react';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/pagination'


export default function DateTimings() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const dateTimingData = getParsedData(storedEventData.list, "DateAndTimings");
    const functions = dateTimingData.docData.functions;
    console.log(dateTimingData, functions);
    const { height, width } = useWindowDimensions();
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    return (
        <VStack h={height} bgColor="red" w={width}>
            <Swiper
                speed={600}
                parallax={true}
                modules={[Parallax]}
                className="mySwiper"
                onSlideChange={({ activeIndex }) => setActiveSlideIndex(activeIndex)}
            // style={{ backgroundColor: 'red' }}
            >
                <Text bgColor="white" borderLeftRadius="16" w="16" p="1" mt={height * 0.065} textAlign="center" position="absolute" right={0} top={0} ml="4">
                    {activeSlideIndex + 1}/{functions.length}
                </Text>
                {
                    functions.map((item: any, i: number) => {
                        return (
                            <SwiperSlide style={{ width: width, }}>
                                <Text data-swiper-parallax="-800" >{item.fnTitle}</Text>
                                <Image marginTop={- height * 0.05} scale={0.75} borderWidth="thick" border="4px" borderRadius="2xl" borderColor="white" transform="auto" src={base_img_url + item.fnImg} />
                                <Box position="absolute" top={height * 0.55} left={0} bottom={0} w={width} pl="4" bgColor="white">
                                    <Text m="2" ml="7" data-swiper-parallax-y="100" color="black" fontWeight="semibold">{item.location}</Text>
                                    <Tag data-swiper-parallax="-800" bgColor="transparent" >
                                        <TagLeftIcon as={MapPin} color="black" />
                                        <Text fontWeight="normal">{item.address}</Text>
                                    </Tag>
                                    <Tag data-swiper-parallax-y="100" bgColor="transparent" >
                                        <TagLeftIcon as={Clock} color="black" />
                                        <Text fontWeight="normal">{item.timing}</Text>
                                    </Tag>
                                </Box>
                                <Image transition="all" data-swiper-parallax-y="-1000" src={base_img_url + item.mapImg} position="absolute" top={height * 0.72} left={0} bottom={0} />
                                {/* <Button children="Open Map"/> */}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </VStack>
    );
}