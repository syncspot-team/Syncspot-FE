import { useLoginStore } from '@src/state/store/loginStore';

export default function LandingPage() {
  const { login, logout } = useLoginStore();
  return (
    <div className="border-2 border-blue-500">
      <h1>Landing Page</h1> <br />
      <button onClick={() => login('accessToken')}>Login</button> <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}
