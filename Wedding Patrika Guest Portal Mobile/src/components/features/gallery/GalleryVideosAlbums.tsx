import { Center, Flex, Image, Link, Text, VStack } from '@chakra-ui/react'
import { EVENT_DATA, useLocalStorage } from '../../../provider/useLocalStorage';
import { endpoints } from '../../../data/constants';
import getParsedData from '../../../data/getParsedData';
import useWindowDimensions from '../../../data/useWindowDimensions';
import { useNavigate } from 'react-router-dom';
import { PlayCircle } from '@phosphor-icons/react';

function GalleryVideosAlbum() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const galleryData = getParsedData(storedEventData.list, "Gallery");
    const videosAlbums = galleryData.docData.photosAlbums;
    console.log(videosAlbums);
    const { height, width } = useWindowDimensions();
    const navigate = useNavigate();

    return (
        <VStack w={width} bgColor='black' minH={height}>
            {
                videosAlbums.map((item: any, i: number) => {
                    return (
                        <Flex key={i} as={Link} mx="2" my="1" h={height * 0.25} w={width * 0.95} onClick={() => navigate(item.albumLink)}>
                            <Image src={base_img_url + item.albumBg} filter='auto' borderRadius='md' />
                            <VStack bgColor='blackAlpha.500' w={width * 0.95} h={height * 0.25} position='absolute' borderRadius='md' >
                                <PlayCircle size={52} weight="bold" color='white' style={{ position: 'absolute', marginTop: height * 0.09 }} />
                                <Text p='1' position='absolute' bottom={0} w={width * 0.95} alignSelf='flex-end' bgColor='whiteAlpha.700' textAlign='center' borderBottomRadius='md'>{item.albumName}</Text>
                            </VStack>
                        </Flex>
                    )
                })
            }
            {videosAlbums.length === 0 && <Center><Text color='white'>No Video Albums are available !</Text></Center>}
        </VStack >
    )
}

export default GalleryVideosAlbum