import { useLoginStore } from '@src/state/store/loginStore';
import { useRoomIdStore } from '@src/state/store/roomIdStore';

export default function LandingPage() {
  const { login, logout } = useLoginStore();
  const { setRoomId } = useRoomIdStore();
  return (
    <div className="border-2 border-blue-500">
      <h1>Landing Page</h1> <br />
      <button onClick={() => login('accessToken')}>Login</button> <br />
      <button onClick={logout}>Logout</button> <br />
      <button onClick={() => setRoomId('')}>roomId 없애기</button>
    </div>
  );
}
