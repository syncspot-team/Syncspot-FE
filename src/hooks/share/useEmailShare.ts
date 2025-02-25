import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';

interface ISendEmail {
  toEmail: string;
  message: string;
}

export function useEmailShare() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  //공유하는 유저 이름 호출
  const { data: userInfo } = useGetUserInfoQuery();

  const sendEmail = ({ toEmail, message }: ISendEmail) => {
    setLoading(true);
    const templateParams = {
      to_email: toEmail,
      from_name: userInfo.data.name,
      message: message,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setSuccess(true);
        setError(null);
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch(() => {
        setError('이메일 전송에 실패했습니다. 다시 시도해주세요.');
        setSuccess(false);
        setTimeout(() => setError(null), 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sendEmail, loading, error, success };
}
