import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { setToastShow } from "../slices/alert";

const Toast = () => {
  const { show, type, message } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  const switchAlert = () => setTimeout(() => dispatch(setToastShow(false)), 1000 * 5);

  useEffect(() => {
    if (!show) return;

    switch (type) {
      case "success":
        toast.success(message);
        switchAlert();
        break;
      case "error":
        toast.error(message);
        switchAlert();
        break;

      default:
        break;
    }
  }, [show, type, message]);

  return <ToastContainer />;
};

export default Toast;
