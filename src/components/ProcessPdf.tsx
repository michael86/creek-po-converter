import { FormEvent, useRef, useState } from "react";
import axios from "axios";

const ProcessPdf = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState<null | "uploaded" | "failed">(null);

  const onClick = async (e: FormEvent) => {
    e.preventDefault();

    if (!ref.current || !ref.current.files) return;
    const file = ref.current.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        console.log("begin upload");

        const result = await axios.post("http://192.168.1.62:6005/pdf/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (result.data.status === 1) {
          setSuccess("uploaded");
          setTimeout(() => setSuccess(null), 1000 * 5);
        } else {
          setSuccess("failed");
          setTimeout(() => setSuccess(null), 1000 * 5);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form>
        <input type="file" name="pdf" id="pdf" ref={ref} />
        <button onClick={onClick}>Upload</button>
        {typeof success === "string" && <p>File {success}</p>}
      </form>
    </>
  );
};

export default ProcessPdf;
