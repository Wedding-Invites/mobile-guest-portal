import { EVENT_DATA, useLocalStorage } from '../../../provider/useLocalStorage';
import { endpoints } from '../../../data/constants';
import getParsedData from '../../../data/getParsedData';
import useWindowDimensions from '../../../data/useWindowDimensions';
import 'react-slideshow-image/dist/styles.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Box, HStack, Icon, Image, Link, Text, VStack } from '@chakra-ui/react';
import { Camera, VideoCamera } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Gallery() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    // console.log(storedEventData);
    const galleryData = getParsedData(storedEventData.list, "Gallery");
    const galleryBasicDetails = galleryData.docData.basicDetails;
    const sliderImgs = galleryBasicDetails.sliderImgs.filter((item: string, i: number) => item !== '')
    console.log(galleryData, sliderImgs);
    const { height, width } = useWindowDimensions();
    const navigate = useNavigate();

    return (
        <VStack h={height} width={width} bgColor='white'>
            <Swiper
                // spaceBetween={30}
                effect={'fade'}
                // style={{ backgroundColor: 'red' }}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}
                className="mySwiper"
            >
                {
                    sliderImgs.map((item: string, i: number) => {
                        return (
                            <SwiperSlide key={i}>
                                <Image transform='auto' scale={1.5} height={height * 0.6} src={base_img_url + item} />
                                <Box position='absolute' w={width} top={0} left={0} height="auto" borderWidth={24} bottom={0} right={0}
                                    borderColor='blackAlpha.600'
                                >
                                    <Text fontSize='4xl' h="full" bgColor='blackAlpha.400' pt={height * 0.23} textAlign='center' borderWidth='medium'>Gallery</Text>
                                </Box>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            {/* <SwitcherView images={sliderImgs.map((item) => base_img_url + item)} /> */}
            <HStack height={height * 0.315} w={width} justifyContent='space-evenly' bgColor='white' alignItems='center'>
                <Box as={Link} w={width * 0.4} height='auto' alignSelf='center' alignItems='center' justifyContent='center' onClick={() => navigate('photos')}>
                    <VStack position='absolute' mt='3' zIndex='popover' w={width * 0.4} height={height * 0.3} bgColor='blackAlpha.600' borderRadius='md' justifyContent='center' alignItems='center' >
                        <Icon as={() => <Camera color='white' size='52' floodColor='red' weight='duotone' />} />
                        <Text mt='-4' color='white' fontWeight='medium' alignSelf='center'>Photos</Text>
                    </VStack>
                    <Image w={width * 0.4} scaleY={0.88} transform='auto' src={base_img_url + galleryBasicDetails.photosBg} borderRadius='md' />
                </Box>
                <Box as={Link} w={width * 0.4} height='auto' alignSelf='center' alignItems='center' justifyContent='center' onClick={() => navigate('videos')}>
                    <VStack position='absolute' mt='3' zIndex='popover' w={width * 0.4} height={height * 0.3} bgColor='blackAlpha.600' borderRadius='md' justifyContent='center' alignItems='center' >
                        <Icon as={() => <VideoCamera color='white' size='52' floodColor='red' weight='duotone' />} />
                        <Text mt='-4' color='white' fontWeight='medium' alignSelf='center'>Videos</Text>
                    </VStack>
                    <Image w={width * 0.4} scaleY={0.88} transform='auto' src={base_img_url + galleryBasicDetails.videosBg} borderRadius='md' />
                </Box>
            </HStack>
        </VStack>
    );
}
