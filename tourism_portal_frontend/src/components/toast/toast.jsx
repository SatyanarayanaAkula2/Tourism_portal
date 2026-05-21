import './toast.css'

const Toast = ({
  message,
  type
}) => {

  return (

    <div
      className={`
        ${styles.toast}
        ${styles[type]}
      `}
    >

      <div className={styles.icon}>

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