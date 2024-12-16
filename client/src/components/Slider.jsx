import Form from 'react-bootstrap/Form';
import './Slider.css'
import { useEffect } from 'react';

export const Slider = ({ value, max, min, setValue, tag, stepSize }) => {    

    const bubblePosStyle = {left: Math.round((value-min) / (max-min) * 100)+"%"}

    return(
        <div className='position-relative'>
            <Form.Range value={value} max={max} min={min} step={stepSize} onChange={e => setValue(e.target.value)} style={{width:"150px"}}/>
            <p style={bubblePosStyle} className='value-bubble position-absolute px-2 py-1'>{tag}</p>
        </div>
    )
}
