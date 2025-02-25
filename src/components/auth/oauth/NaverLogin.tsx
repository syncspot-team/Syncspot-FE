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
  const NAVER_REDIRECT_URL = `${import.meta.env.VITE_BACKEND_URL}/${PATH.OAUTH_NAVER_REDIRECT_URL}`;
  const [naverLoginError, setNaverLoginError] = useState(false);

  const handleNaverLogin = async () => {
    try {
      await axios({
        method: 'POST',
        url: NAVER_REDIRECT_URL,
        data: {
          code,
        },
      }).then((res) => {
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
