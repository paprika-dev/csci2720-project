import React from 'react';
import { motion } from "motion/react"
import './PageTransition.css'

const curtainVariants = {
    open:   { scaleY: 0, transition: {duration: 1.2, ease:[0.32,1,0.36,0.82]} },
    closed: { scaleY: 1, transition: {duration: 1.2, ease:[0.32,1,0.36,0.82]} }
}

export const PageTransition = ({ children }) => {
    return (
        <>
        {children}
        <motion.div 
            className="curtain d-flex justify-content-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={curtainVariants}
        >
        </motion.div>
        </>
    )
}

