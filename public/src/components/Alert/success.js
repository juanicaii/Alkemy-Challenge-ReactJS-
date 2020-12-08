import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SweetAlert = (icon, title, text) => {
  MySwal.fire({
    icon: icon,
    title: title,
    text: text,
    width: "23rem",
    timer: 1500,
    timerProgressBar: true,
    customClass: {
      icon: "icon-sweet",
      title: "alert-sweet",
    },
    showCloseButton: false,
    showConfirmButton: false,
  });
};

export default SweetAlert;
