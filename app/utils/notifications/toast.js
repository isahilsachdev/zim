import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let lastMessage = '';
let lastMessageTime = 0;

const showToast = (type, message = 'Something went wrong!') => {
  const now = Date.now();

  if (message === lastMessage && now - lastMessageTime < 2000) {
    return;
  }

  lastMessage = message;
  lastMessageTime = now;

  const options = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  };

  switch (type) {
  case 'success':
    toast.success(message, options);
    break;
  case 'error':
    toast.error(message, options);
    break;
  default:
    toast.info(message, options);
    break;
  }
};

export default showToast;
