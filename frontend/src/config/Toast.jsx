import Toastify from 'toastify-js'

export const toast = (message) => {
    Toastify({
        text: message,
        className: "info",
        style: {
            minWidth: '5rem',
            background: "#01000c1f",
            border: '1px solid white',
            backdropFilter: 'blur(22px)'
            // background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}