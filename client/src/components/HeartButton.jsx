// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import heartFilledSVG from '../assets/heart-filled.svg'
import heartEmptySVG from '../assets/heart-empty.svg'
import { useState } from 'react'
import './Heartbutton.css'

export const HeartButton = ({ filled, clickFunc }) => {
    const [heart, setHeart] = useState("")

    return(
        <button 
            className={heart}
            onClick={()=>{
                filled ? setHeart("") : setHeart("beat");
                clickFunc();
            }}
        >
            <img src={filled ? heartFilledSVG : heartEmptySVG}  />
        </button>
    )
}