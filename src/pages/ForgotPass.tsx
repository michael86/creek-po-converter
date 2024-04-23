import { useRef } from "react";

const ForgotPass = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="" id="" ref={ref} required />
      <p>Rest pass</p>
      <button>Submit</button>
    </form>
  );
};

export default ForgotPass;
