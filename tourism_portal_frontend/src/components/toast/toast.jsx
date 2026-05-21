import './toast.css";'

const Toast = ({
  message,
  type
}) => {

  return (

    <div
      className={`toast ${type}`}
    >

      <div className="icon">

        {
          type === "success"
          && "✓"
        }

        {
          type === "error"
          && "✕"
        }

        {
          type === "info"
          && "!"
        }

      </div>

      <p>{message}</p>

    </div>

  );

};

export default Toast;