import { Loading } from '@src/components/loading/Loading';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLoginStore } from '@src/state/store/loginStore';
import { PATH } from '@src/constants/path';
import { useNavigate } from 'react-router-dom';
import SomethingWrongErrorPage from '@src/pages/error/SomethingWrongErrorPage';

export default function GoogleLogin() {
  const { login } = useLoginStore();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');
  const GOOGLE_REDIRECT_URL = `${import.meta.env.VITE_BACKEND_URL}/${PATH.OAUTH_GOOGLE_REDIRECT_URL}`;
  const [googleLoginError, setGoogleLoginError] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await axios({
        method: 'POST',
        url: GOOGLE_REDIRECT_URL,
        data: {
          code,
        },
      }).then((res) => {
        login(res.data.data.accessToken, res.data.data.refreshToken);
        navigate(PATH.ROOT);
      });
    } catch (error) {
      setGoogleLoginError(true);
    }
  };

  useEffect(() => {
    if (code) {
      handleGoogleLogin();
    }
  }, [code]);

  if (googleLoginError) {
    return <SomethingWrongErrorPage />;
  }

  return <Loading />;
}
