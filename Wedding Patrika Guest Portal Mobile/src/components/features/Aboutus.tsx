import { Button, HStack, IconButton, Image, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import useWindowDimensions from '../../data/useWindowDimensions';
import AboutUsBg from '../../assets/wedding_back_1_blur.webp'
import WPLogo from '../../assets/weddingpatrika_logo.png'
import { useBouncyButton } from '../animated/BouncyButton';
import { AppStoreLogo, ArrowLeft, FacebookLogo, GooglePlayLogo, HourglassMedium, Info, InstagramLogo, Person, Share, ShareNetwork, Star, User, WhatsappLogo, YoutubeLogo } from '@phosphor-icons/react';
import RippleButton from '../animated/RippleButton';

import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Swiper } from 'swiper/react';
import { SwiperSlide, useSwiper } from 'swiper/react';

import ServiceImg from '../../assets/qplus.png'

function Aboutus() {
    const { height, width } = useWindowDimensions();

    return (
        <>
            <Image src={AboutUsBg} w={width} height={height} position='absolute' />

            <Swiper
                style={{ backgroundColor: 'transparent', height: height }}
            >
                <SwiperSlide style={{ backgroundColor: 'transparent', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                    <VStack >
                        <Image src={WPLogo} boxSize='36' mt={height * 0.16} />
                        <Text fontSize='2xl' color='white' textDecorationLine='underline'>Wedding Patrika</Text>
                        <Text fontSize='sm' fontWeight='hairline' color='white' w={width * 0.5} alignSelf='center' textAlign='center'>
                            A Complete Creative Solutions for your Wedding Needs
                        </Text>
                        <HStack mt='8'>
                            <Button borderWidth='2px' borderRadius='lg' borderColor='white' _active={{ bgColor: 'blackAlpha.600' }} style={{ WebkitTapHighlightColor: 'transparent' }} variant='unstyled' color='white' bgColor='blackAlpha.800' px='4' children="SHARE" leftIcon={<ShareNetwork />} />
                            <Button borderWidth='2px' borderRadius='lg' borderColor='white' _active={{ bgColor: 'blackAlpha.600' }} style={{ WebkitTapHighlightColor: 'transparent' }} variant='unstyled' color='white' bgColor='blackAlpha.800' px='4' children="RATE US" leftIcon={<Star />} />
                        </HStack>
                        <Text fontSize='sm' fontWeight='thin' mt='16'>Follow Us On Social Media</Text>
                        <HStack spacing='4'>
                            <InstagramLogo weight='fill' size={36} style={{ backgroundColor: 'black', borderWidth: 2, borderRadius: 24, padding: 4 }} />
                            <FacebookLogo weight='fill' size={36} style={{ backgroundColor: 'black', borderWidth: 2, borderRadius: 24, padding: 4 }} />
                            <YoutubeLogo weight='fill' size={36} style={{ backgroundColor: 'black', borderWidth: 2, borderRadius: 24, padding: 4 }} />
                            <WhatsappLogo weight='fill' size={36} style={{ backgroundColor: 'black', borderWidth: 2, borderRadius: 24, padding: 4 }} />
                        </HStack>
                    </VStack>
                </SwiperSlide>
                <SwiperSlide>
                    <VStack>
                        <ServiceRow img={ServiceImg} title='Wedding Invites' description='Wedding Invites creates an everlasting impression that folks will make about you & your wedding' />
                    </VStack>
                </SwiperSlide>
                <SwiperSlide>
                    <VStack>
                        <ServiceRow img={ServiceImg} title='Wedding Invites' description='Wedding Invites creates an everlasting impression that folks will make about you & your wedding' />
                    </VStack>
                </SwiperSlide>
                <BottomTab />
            </Swiper>
        </>
    )
}

const BottomTab = () => {
    const swiper = useSwiper();
    return (
        <HStack zIndex='tooltip' w='full' bgColor='black' position='absolute' justifyContent='space-between' spacing={0} bottom={0}>
            <Button flexDirection='column' w='full' variant='ghost' borderRadius={0} _hover={{ bgColor: 'transparent' }} style={{ WebkitTapHighlightColor: 'transparent' }} h='14' _active={{ bgColor: 'whiteAlpha.200' }} onClick={() => swiper.slideTo(0)} color='white' >
                <Info size={28} style={{ alignSelf: 'center' }} />
                <Text fontSize='x-small' mt='1'>About</Text>
            </Button>
            <Button flexDirection='column' w='full' variant='ghost' borderRadius={0} _hover={{ bgColor: 'transparent' }} style={{ WebkitTapHighlightColor: 'transparent' }} h='14' _active={{ bgColor: 'whiteAlpha.200' }} onClick={() => swiper.slideTo(1)} color='white' >
                <GooglePlayLogo size={28} />
                <Text fontSize='x-small' mt='1'>More Apps</Text>
            </Button>
            <Button flexDirection='column' w='full' variant='ghost' borderRadius={0} _hover={{ bgColor: 'transparent' }} style={{ WebkitTapHighlightColor: 'transparent' }} h='14' _active={{ bgColor: 'whiteAlpha.200' }} onClick={() => swiper.slideTo(2)} color='white' >
                <User size={28} weight="bold" />
                <Text fontSize='x-small' mt='1'> Services</Text>
            </Button>
        </HStack>
    )
}

const ServiceRow: React.FC<{ title: string, description: string, img: any }> = ({ description, img, title }) => {
    const { height, width } = useWindowDimensions();

    return <VStack w={width * 0.95} bgColor='blackAlpha.600' p='4' mx='4' borderRadius='md'>
        <HStack alignSelf='flex-start'>
            <Image src={img} boxSize='10' />
            <Text fontSize='md' fontWeight='medium'>{title}</Text>
        </HStack>
        <Text fontSize='sm'>{description}</Text>
    </VStack>
}

export default Aboutus