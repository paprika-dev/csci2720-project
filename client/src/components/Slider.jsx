import Form from 'react-bootstrap/Form';
import './Slider.css'

export const Slider = ({ value, setValue, tag, stepSize }) => {    

    const bubblePosStyle = {left: value+"%"}

    return(
        <div className='position-relative'>
            <Form.Range value={value} step={stepSize} onChange={e => setValue(e.target.value)} style={{width:"150px"}}/>
            <p style={bubblePosStyle} className='value-bubble position-absolute px-2 py-1'>{tag}</p>
        </div>
    )
}
