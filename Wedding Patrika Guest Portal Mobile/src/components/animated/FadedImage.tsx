import { Image } from '@chakra-ui/react';
import React from 'react';

const FadedImage: React.FC<{ imageUrl: string, altText: string, width: number, height: number }> = ({ imageUrl, altText, width = '100%', height = 'auto' }) => {
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        alignSelf: 'center',
        // height:height*0.1,
        // overflow:'hidden',
        width: width * 0.95
    };

    const imageStyle = {
        width: width,
        height: height,
        alignSelf: 'center'
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(to bottom,#ffffff00, #ffffff99, #ffffff)`,
        alignSelf: 'center'
    };

    return (
        <div style={containerStyle}>
            <Image transform="auto" rotate={180} src={imageUrl} alt={altText} style={imageStyle} />
            <div style={overlayStyle}></div>
        </div>
    );
};

export default FadedImage;
