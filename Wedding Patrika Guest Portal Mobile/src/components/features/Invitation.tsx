import { EVENT_DATA, useLocalStorage } from '../../provider/useLocalStorage';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { endpoints } from '../../data/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import useWindowDimensions, { getWindowDimensions } from '../../data/useWindowDimensions';
import getParsedData from '../../data/getParsedData';
import FadedImage from '../animated/FadedImage';

const overlayStyle = {
    position: 'absolute',
    top: getWindowDimensions().height * 0.68,
    left: 0, right: 0,
    width: getWindowDimensions().width * 0.8,
    background: `linear-gradient(to bottom, white, #ffffffaa, #ffffffff)`,
};

function Invitation() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const invitationData = getParsedData(storedEventData.list, "Invitation");
    const { height, width } = useWindowDimensions();
    const invitationImgs = invitationData.docData.invitationImgs;
    console.log("invitationData:", invitationData, "invitationImgs:", invitationImgs);

    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        setImageDimensions({ width: naturalWidth, height: naturalHeight });
    };

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
                style={{ backgroundColor: 'white', marginTop: height * 0.1 }}
            >
                {
                    invitationImgs.map((item: string) => {
                        console.log(base_img_url + item);
                        return (
                            <SwiperSlide style={{ display: 'flex', flexDirection: 'column', width: imageDimensions.width / 2, height: height * 0.8, paddingTop: 0, paddingBottom: 0, alignSelf: 'center', backgroundColor: 'transparent' }}>
                                <Image src={base_img_url + item} transform='auto' scaleX={2.2} height={imageDimensions.height * 0.7} onLoad={handleImageLoad} />
                                <FadedImage imageUrl={base_img_url + item} altText="" width={width * 0.8} height={height / 8} />
                                {/* <Box alignSelf='center' width={width * 0.8} height={height / 8} bgColor='red' style={overlayStyle} /> */}
                                {/* <Image src={base_img_url+item} transform="auto" rotate={180} scaleX={2.2} height={height / 8} opacity={0.3} /> */}
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
