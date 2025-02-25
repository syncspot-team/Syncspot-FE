import { Loading } from '@src/components/loading/Loading';
import { PATH } from '@src/constants/path';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '@src/state/store/loginStore';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';

export default function KakaoLogin() {
  const { login } = useLoginStore();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const KAKAO_REDIRECT_URL = `${import.meta.env.VITE_BACKEND_URL}/${PATH.OAUTH_KAKAO_REDIRECT_URL}`;
  const [kakaoLoginError, setKakaoLoginError] = useState(false);

  const handleKakaoLogin = async () => {
    try {
      await axios({
        method: 'POST',
        url: KAKAO_REDIRECT_URL,
        data: {
          code,
        },
      }).then((res) => {
        login(res.data.data.accessToken, res.data.data.refreshToken);
        navigate(PATH.ROOT);
      });
    } catch (error) {
      setKakaoLoginError(true);
    }
  };

  useEffect(() => {
    if (code) {
      handleKakaoLogin();
    }
  }, [code]);

  if (kakaoLoginError) {
    return <SomethingWrongErrorPage />;
  }

  return <Loading />;
}
