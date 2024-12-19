import { toast } from 'react-toastify';

export default function LandingPage() {
  const handleClick = () => {
    toast('wow');
  };
  return (
    <>
      <h1>Home 마이그레이션 version 4.5.1</h1>
      <button onClick={handleClick}>click me</button>
    </>
  );
}
