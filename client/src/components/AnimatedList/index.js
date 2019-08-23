import React from 'react';
import { motion } from 'framer-motion';

const AnimatedList = props => {
    const variants = {
        visible: {
            opacity: 1,
            transition: {
                delay: props.enterDelay || 0,
                when: 'beforeChildren',
                staggerChildren: props.isStaggered ? 0.1 : 0
            }
        },
        hidden: {
            opacity: 0,
            transition: {
                when: 'afterChildren',
                staggerChildren: props.isStaggered ? 0.05 : 0
            }
        },
        collapsed: {
            opacity: 0,
            height: 0,
            overflow: 'hidden',
            transition: {
                when: 'afterChildren',
                staggerChildren: props.isStaggered ? 0.05 : 0
            }
        }
    };
    return (
        <motion.div
            {...props}
            animate={props.animate || 'visible'}
            initial="hidden"
            exit="hidden"
            variants={variants}
        />
    );
};

export default AnimatedList;
