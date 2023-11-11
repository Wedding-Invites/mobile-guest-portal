import { EVENT_DATA, useLocalStorage } from '../../provider/useLocalStorage';
import { Box, Image, Text } from '@chakra-ui/react';
import { endpoints } from '../../data/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import useWindowDimensions from '../../data/useWindowDimensions';
import './invitationStyles.css'
import getParsedData from '../../data/getParsedData';
var fn = function () {
    /* do you want */
}

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
                slidesPerView={3}
                // coverflowEffect={{
                //     // rotate: 50,
                //     // stretch: 2,
                //     // depth: 100,
                //     // slideShadows: true,
                // }}
                modules={[EffectCoverflow,]}
                slidePrevClass="swiper-slide-prev-next-img"
                slideNextClass="swiper-slide-prev-next-img"
                loop
            >
                {
                    invitationImgs.map((item: string) => {
                        console.log(base_img_url + item);
                        return (
                            <SwiperSlide style={{ alignSelf: 'center', width: width, height: height * 0.75 }}>
                                <Image src={base_img_url + item} height={height * 0.75} scaleX={2.2} transform="auto" />
                                <Image src={base_img_url + item} mt="12" scale={2.2} transform="auto" rotate={180} opacity={0.7} maxH={"20"} />
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