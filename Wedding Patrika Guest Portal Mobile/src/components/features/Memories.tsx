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
import { Image, Text } from '@chakra-ui/react';
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
        <>
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
                                <Image boxShadow='md' src={base_img_url + item.memoryImg} transform='auto' scaleX={1.5} scaleY={1.2} />
                                <Text position='absolute' top={0}>hello</Text>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </>
    );
}
