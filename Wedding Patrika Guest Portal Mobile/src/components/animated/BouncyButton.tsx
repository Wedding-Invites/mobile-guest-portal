import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const ScalingButton = () => {
    const [isScaled, setIsScaled] = useState(false);

    const handleButtonClick = () => {
        setIsScaled(true);

        // Reset the scaling after the animation duration (250ms in this case)
        setTimeout(() => {
            setIsScaled(false);
        }, 250);
    };

    return (
        <Button
            onClick={handleButtonClick}
            borderRadius="full"
            style={{
                transform: isScaled ? 'scale(1.0)' : 'scale(0.9)',
                transformOrigin: '50% 50%',
                transition: 'transform 250ms ease',
                // backgroundColor: , // Holo blue color
                color: '#FFFFFF', // Text color
                cursor: 'pointer', // Add pointer cursor on hover,
                WebkitTapHighlightColor: 'transparent'
            }}
        >
            1
        </Button>
    );
};

export default ScalingButton;

export const useBouncyButton: any = () => {
    const [isScaled, setIsScaled] = useState(false);

    const handleButtonClick = (cb: any) => {
        setIsScaled(true);

        setTimeout(() => {
            setIsScaled(false);
            cb()
        }, 250);
    };
    return [
        {
            transform: isScaled ? 'scale(1.0)' : 'scale(0.9)',
            transformOrigin: '50% 50%',
            transition: 'transform 250ms ease',
            // backgroundColor: , // Holo blue color
            color: '#FFFFFF', // Text color
            cursor: 'pointer', // Add pointer cursor on hover,
            WebkitTapHighlightColor: 'transparent'
        },
        handleButtonClick
    ]
}