import React from 'react'

const Arrows = ({ image, disabled }) => {
    const renderSVG = () => {
        switch (image) {
            case "left":
                return (
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                        <path d="M4.16992 7.79329L0.546468 4.16984L4.16992 0.546387" stroke="#7B777F" strokeWidth="1.09325" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );

            case "double-left":
                return (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M11.3496 10.6234L7.72616 6.99992L11.3496 3.37646" stroke="#7B777F" strokeWidth="1.09325" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.27539 10.6234L2.65194 6.99992L6.27539 3.37646" stroke="#7B777F" strokeWidth="1.09325" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );

            case "right":
                return (
                    <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
                        <path d="M0.546875 7.79329L4.17033 4.16984L0.546875 0.546387" stroke="#7B777F" strokeWidth="1.09325" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );

            case "double-right":
                return (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.65039 10.6234L6.27384 6.99992L2.65039 3.37646" stroke="#7B777F" strokeWidth="1.09325" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.72461 10.6234L11.3481 6.99992L7.72461 3.37646" stroke="#7B777F" strokeWidth="1.09325" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                );

            default:
                return null;
        }
    };

    return <>{renderSVG()}</>;
};

export default Arrows;