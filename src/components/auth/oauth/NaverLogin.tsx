import { Loading } from '@src/components/loading/Loading';
import { PATH } from '@src/constants/path';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@src/state/store/loginStore';

export default function NaverLogin() {
  const { login } = useLoginStore();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');
  const [naverLoginError, setNaverLoginError] = useState(false);

  const handleNaverLogin = async () => {
    try {
      await axios
        .get(
          `${import.meta.env.VITE_NAVER_REDIRECT_URL}/?code=${code}&state=${state}`,
        )
        .then((res) => {
          console.log('네이버 로그인 후 받은 데이터 값', res.data.data);
          login(res.data.data.accessToken, res.data.data.refreshToken);
          navigate(PATH.ROOT);
        });
    } catch (error) {
      setNaverLoginError(true);
    }
  };
  useEffect(() => {
    if (code && state) {
      handleNaverLogin();
    }
  }, [code, state]);

  if (naverLoginError) {
    return <SomethingWrongErrorPage />;
  }

  return <Loading />;
}
