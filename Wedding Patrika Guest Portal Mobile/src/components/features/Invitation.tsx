import Coverflow from 'react-coverflow'
import { EVENT_DATA, useLocalStorage } from '../../provider/useLocalStorage';
import { Image, Text } from '@chakra-ui/react';
import { endpoints } from '../../data/constants';
import useWindowDimensions from '../../data/useWindowDimensions';

var fn = function () {
    /* do you want */
}

const getData = (data: any, category: string) => {
    if (data && data.length > 0) {
        const featureData = data.find((item: any) => item.category === category);
        return featureData;
    }
    return null
}

function Invitation() {
    const [storedEventData, setStoredEventData] = useLocalStorage(EVENT_DATA, null);
    const base_img_url = endpoints.SERVER + '/' + storedEventData.eventId + '/';
    const invitationData = getData(storedEventData.list, "Invitation");
    const invitationImgs = invitationData.docData.invitationImgs
    console.log(invitationData, invitationImgs);

    return (
        (invitationImgs && invitationImgs.length > 0)
            ?
            <Coverflow
                displayQuantityOfSide={1}
                navigation={false}
                enableHeading={false}
                currentFigureScale={2}
                otherFigureScale={1}
                infiniteScroll
            >
                {
                    invitationImgs.map((item: string) => {
                        console.log(base_img_url + item);
                        return (
                            <Image src={base_img_url + item} />
                        )
                    })
                }
            </Coverflow>
            :
            <Text>Invitation Data is not available</Text>
    )
}

export default Invitation