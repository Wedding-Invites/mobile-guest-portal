import { Box, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const RippleButton = ({ children, onClick }) => {
    const [ripple, setRipple] = useState(false);

    const handleClick = (e) => {
        setRipple(true);
        onClick(e);
        setTimeout(() => {
            setRipple(false);
        }, 500);
    };

    return (
        <Box position="relative" overflow="hidden">
            {ripple && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 2 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'absolute',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        transformOrigin: 'center',
                        pointerEvents: 'none', // Ensure that the ripple doesn't interfere with button clicks
                    }}
                />
            )}
            <Button onClick={handleClick}>{children}</Button>
        </Box>
    );
};

export default RippleButton