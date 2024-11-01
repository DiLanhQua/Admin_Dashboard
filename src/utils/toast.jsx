/* eslint-disable react/prop-types */
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export const handleToast = (type, message, position) => {
  toast[type](message, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const DeleteConfirmationModal = ({
  title,
  text,
  icon,
  confirmButtonText,
  onConfirm,
}) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.isDismissed) {
      return;
    }
  });
};
