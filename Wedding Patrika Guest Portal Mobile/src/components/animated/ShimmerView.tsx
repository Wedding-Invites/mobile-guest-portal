import React, { useState, useEffect } from 'react';

const ShimmerButton = ({ label, onClick, width, height, duration }) => {
    const [shimmer, setShimmer] = useState({
        translateY: 0,
        gradientStop: 0,
    });

    useEffect(() => {
        const animateShimmer = () => {
            setShimmer((prevShimmer) => ({
                translateY: prevShimmer.translateY > 100 ? -100 : prevShimmer.translateY + 1,
                gradientStop: prevShimmer.gradientStop > 100 ? -100 : prevShimmer.gradientStop + 1,
            }));
        };

        const interval = setInterval(animateShimmer, duration);

        return () => clearInterval(interval);
    }, [duration]);

    return (
        <button
            onClick={onClick}
            style={{
                // position: 'relative',
                width: `${width}px`,
                height: `${height}px`,
                overflow: 'hidden',
                borderRadius: '4px', // Optional: Add rounded corners
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
            }}
        >
            <span
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7) ${shimmer.gradientStop}%, rgba(255, 255, 255, 0))`,
                    transform: `translateY(${shimmer.translateY}%)`,
                }}
            >
                {label}
            </span>
        </button>
    );
};

export default ShimmerButton;
