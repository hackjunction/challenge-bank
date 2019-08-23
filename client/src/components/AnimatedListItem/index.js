import React from 'react';
import { motion } from 'framer-motion';

const AnimatedListItem = props => {
    let variants;
    switch (props.animation) {
        case 'scale-random': {
            variants = {
                visible: {
                    opacity: 1,
                    scale: 1
                },
                hidden: {
                    opacity: 0,
                    scale: 0.7
                }
            };
            break;
        }
        default: {
            variants = {
                visible: {
                    opacity: 1,
                    y: 0
                },
                hidden: {
                    opacity: 0,
                    y: 50
                }
            };
        }
    }

    return <motion.div {...props} initial="hidden" exit="hidden" animate="visible" variants={variants} transition={{ type: 'spring', duration: 0.2 }} />;
};

export default AnimatedListItem;
