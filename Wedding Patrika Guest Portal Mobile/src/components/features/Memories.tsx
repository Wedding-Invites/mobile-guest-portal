// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// import required modules
import { Parallax, EffectFade } from 'swiper/modules';
import { endpoints } from '../../data/constants';
import getParsedData from '../../data/getParsedData';
import { useLocalStorage, EVENT_DATA } from '../../provider/useLocalStorage';
import { Box, Divider, Image, Text, VStack } from '@chakra-ui/react';
import useWindowDimensions from '../../data/useWindowDimensions';

export default function Memories() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const memoriesData = getParsedData(storedEventData.list, "Memories");
    console.log(memoriesData);
    const memoriesList = memoriesData.docData.memories
    console.log(memoriesList)
    const { height, width } = useWindowDimensions();

    return (
        <VStack w={width} h={height}>
            <Swiper
                effect='fade'
                speed={600}
                parallax={true}
                modules={[Parallax, EffectFade]}
                className="mySwiper"
            >
                {
                    memoriesList.map((item: any, i: number) => {
                        return (
                            <SwiperSlide style={{ width: width, height: height * 0.65 }}>
                                <VStack>
                                    <Image boxShadow='md' src={base_img_url + item.memoryImg} transform='auto' scaleX={1.5} scaleY={1.2} />
                                    <Box data-swiper-parallax-y="50" data-swiper-parallax-opacity="0" w={width} alignSelf='center' mt="-10">
                                        <VStack bgGradient='linear(to-b, blackAlpha.400, blackAlpha.900,green.900,  )' alignSelf='center' px="4" h={height * 0.4} >
                                            <Text fontWeight='medium' color='white' >{item.memoryName}</Text>
                                            <Divider />
                                            <Text fontWeight='medium'>{item.memoryDateTime}</Text>
                                            <Text fontSize='12'>{item.memoryStory}</Text>
                                        </VStack>
                                    </Box>
                                    <Image data-swiper-parallax="-100" top={height * 0.92} src={base_img_url + item.memoryIcon} boxSize='10' position='absolute' data-swiper-parallax-opacity="0.7" data-swiper-parallax-scale="0.4" />
                                </VStack>
                            </SwiperSlide>
                        )
                    })
                }
                {memoriesList.length===0 && <Text>Data not available for Memories !</Text>}
            </Swiper>
        </VStack>
    );
}
