import { EVENT_DATA, useLocalStorage } from '../../provider/useLocalStorage';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { endpoints } from '../../data/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import useWindowDimensions from '../../data/useWindowDimensions';
import getParsedData from '../../data/getParsedData';

function Invitation() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const invitationData = getParsedData(storedEventData.list, "Invitation");
    const { height, width } = useWindowDimensions();
    const invitationImgs = invitationData.docData.invitationImgs;
    console.log("invitationData:", invitationData, "invitationImgs:", invitationImgs);

    return (
        (invitationImgs && invitationImgs.length > 0)
            ?
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView='auto'
                // spaceBetween={1}
                height={height}
                // width={width / 3}
                modules={[EffectCoverflow,]}
                // slidePrevClass="swiper-slide-prev-next-img"
                // slideNextClass="swiper-slide-prev-next-img"
                tabIndex={0}
                loop
            >
                {
                    invitationImgs.map((item: string) => {
                        console.log(base_img_url + item);
                        return (
                            <SwiperSlide style={{ display: 'flex', flexDirection: 'column', width: width / 1.5, height, alignSelf: 'center', backgroundColor: 'transparent' }}>
                                {/* <VStack w={width * 0.5} h={height} bgColor='red' alignSelf="center"> */}
                                <Image src={base_img_url + item} transform='auto' scaleX={2.2} height={height} />
                                <Image src={base_img_url + item} transform="auto" rotate={180} scaleX={2.2} height={height / 8} opacity={0.3} />
                                {/* </VStack> */}
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            :
            <Text>Invitation Data is not available</Text>
    )
}

export default Invitation