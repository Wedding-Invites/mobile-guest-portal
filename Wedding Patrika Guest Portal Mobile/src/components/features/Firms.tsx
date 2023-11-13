import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper/modules";
import { endpoints } from "../../data/constants";
import getParsedData from "../../data/getParsedData";
import useWindowDimensions from "../../data/useWindowDimensions";
import { useLocalStorage, EVENT_DATA } from "../../provider/useLocalStorage";
import { Box, Button, Divider, HStack, Image, Link, Text, VStack } from '@chakra-ui/react';
import { InstagramLogo, Phone, PhoneCall, WhatsappLogo } from '@phosphor-icons/react';

function Firms() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const firmsData = getParsedData(storedEventData.list, "Firms");
    console.log(firmsData);
    const firmsList = firmsData.docData.firms
    console.log(firmsList)
    const { height, width } = useWindowDimensions();
    return (
        <Swiper modules={[Pagination]} className="mySwiper"
            pagination={{
                clickable: true
            }}
        >
            {
                firmsList.map((item: any, i: number) => {
                    return (
                        <SwiperSlide style={{ height: height }}>
                            <Image src={base_img_url + item.firmImg} transform='auto' scaleX={1.5} scaleY={1.4} />
                            <VStack spacing={0} bgColor='transparent' position='absolute' bottom={0} left={0} w={width} h={height * 0.58}  >
                                <Text w={width} p='4' color='white' textAlign='center' bgColor='blackAlpha.700'>{item.firmTitle}</Text>
                                <Text w={width} bgColor='white' color='black' fontSize='sm' textAlign='center' p='3' fontWeight='medium' >{item.firmSubtitle}</Text>
                                <Divider />
                                <Text w={width} minH={'40%'} bgColor='white' color='black' fontSize='sm' textAlign='center' p='1'>{item.firmDescription}</Text>
                                <Divider />
                                <HStack w={width} justifyContent='space-around' bgColor='white' p='1'>
                                    <VStack alignItems='center' as={Link} w='full'>
                                        <Phone weight='fill' color='black' size={28} />
                                        <Text fontSize='small' color='black'>Phone</Text>
                                    </VStack>
                                    <VStack alignItems='center' as={Link} w='full'>
                                        <WhatsappLogo weight='fill' color='black' size={28} />
                                        <Text fontSize='small' color='black'>Whatsapp</Text>
                                    </VStack>
                                    <VStack alignItems='center' as={Link} w='full'>
                                        <InstagramLogo weight='fill' color='black' size={28} />
                                        <Text fontSize='small' color='black'>Instagram</Text>
                                    </VStack>
                                </HStack>
                                <Box w={width} h='24' bgColor='gray' />
                            </VStack>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default Firms