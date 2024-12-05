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