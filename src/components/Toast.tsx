import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { setToastShow } from "../slices/alert";

const Toast = () => {
  const { show, type, message } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!show) return;
    const switchAlert = () => setTimeout(() => dispatch(setToastShow(false)), 1000 * 5);

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
  }, [show, type, message, dispatch]);

  return <ToastContainer />;
};

export default Toast;
