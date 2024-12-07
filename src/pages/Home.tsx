import { toast } from 'react-toastify';

export default function Home() {
  const handleClick = () => {
    toast('wow');
  };
  return (
    <>
      <h1>Home</h1>
      <button onClick={handleClick}>click me</button>
    </>
  );
}
