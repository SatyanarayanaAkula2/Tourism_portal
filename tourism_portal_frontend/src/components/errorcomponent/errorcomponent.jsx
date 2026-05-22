import { useNavigate } from 'react-router-dom';
import Reveal from '../reveal';
import './errorcomponent.css';

const ErrorComponent=({message,onRetry})=>{
    const navigate=useNavigate();
    return(
        <Reveal>
            <div className='error_container'>
            <div className='error_box'>
                <h2>Oops! Something Went wrong</h2>
                <p>{message}</p>
                <div className='btns'>
                    <button className='retry_btn' onClick={()=>navigate(-1)}>Go Back</button>
                <button className='home_btn' onClick={()=>navigate("/")}>Back To Home</button></div>              
            </div>
        </div>
        </Reveal>
    )
};
export default ErrorComponent;