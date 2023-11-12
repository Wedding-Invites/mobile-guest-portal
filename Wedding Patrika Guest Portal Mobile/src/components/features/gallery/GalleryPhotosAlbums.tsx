import { Center, Flex, Image, Link, Text, VStack } from '@chakra-ui/react'
import { EVENT_DATA, useLocalStorage } from '../../../provider/useLocalStorage';
import { endpoints } from '../../../data/constants';
import getParsedData from '../../../data/getParsedData';
import useWindowDimensions from '../../../data/useWindowDimensions';
import { useNavigate } from 'react-router-dom';

function GalleryPhotosAlbum() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    // console.log(storedEventData);
    const galleryData = getParsedData(storedEventData.list, "Gallery");
    const photosAlbums = galleryData.docData.photosAlbums;
    const { height, width } = useWindowDimensions();
    const navigate = useNavigate();

    return (
        <VStack w={width} bgColor='black' minH={height}>
            {
                photosAlbums.map((item: any, i: number) => {
                    return (
                        <Flex as={Link} m="2" h={height * 0.25} w={width * 0.95} onClick={() => navigate('123')}>
                            <Image src={base_img_url + item.albumBg} filter='auto' />
                            <Center bgColor='blackAlpha.400' w={width * 0.95} h={height * 0.25} position='absolute' >
                                <Text color='white' fontWeight='medium' borderColor='white' borderWidth='2px' px='24' py='4'>{item.albumName}</Text>
                            </Center>
                        </Flex>
                    )
                })
            }
            {photosAlbums.length === 0 && <Center><Text color='white'>No Photos Albums are available !</Text></Center>}
        </VStack >
    )
}

export default GalleryPhotosAlbum