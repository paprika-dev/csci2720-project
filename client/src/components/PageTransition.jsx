// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import React from 'react';
import { motion } from "motion/react"
import './PageTransition.css'

const transitionVariants = {
    fadein: { 
        opacity: 0, 
    },
    inview: { 
        opacity: 1, 
        transition: {duration: 0.8, ease: [0.2, 0.24, 0.3, 1] } 
    },
    fadeout: { 
        opacity: 0, 
        transition: {duration: 0.2, ease: [0.39, 0.24, 0.3, 1] } 
    },
}

export const PageTransition = ({ children }) => {
    return (
        <>
        <motion.div
        initial="fadein"
        animate="inview"
        exit="fadeout"
        variants={transitionVariants}
        className='page-wrapper'
        >
            {children}
        </motion.div>
        </>
    )
}

