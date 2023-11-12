import YouTube, { YouTubeProps } from 'react-youtube';
import useWindowDimensions from '../../../data/useWindowDimensions';
import { useParams } from 'react-router-dom';

function GalleryVideosDrive() {
    const { height, width } = useWindowDimensions();
    const params = useParams();
    console.log(params);
    const opts: YouTubeProps['opts'] = {
        height: height,
        width: width,
        playerVars: {
            autoplay: 1,
        },
    };

    return <YouTube videoId={params.video_gallery} opts={opts} />;
}

export default GalleryVideosDrive