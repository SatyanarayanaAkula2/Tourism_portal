import './errorcomponent.css';

const ErrorComponent=({message,onRetry})=>{
    return(
        <div className='error_container'>
            <div className='error_box'>
                <h2>Something went wrong</h2>
                <p>{message}</p>
                {onRetry && <button onClick={onRetry} className='retry_btn'>
                    Retry</button>}
            </div>
        </div>
    )
};
export default ErrorComponent;