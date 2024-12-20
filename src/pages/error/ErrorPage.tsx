import { PATH } from '@src/constants/path';
import { Link } from 'react-router-dom';

interface IErrorPageProps {
  status: string;
  message: string;
  onRetry: () => void;
}

const ErrorPage = ({ status, message, onRetry }: IErrorPageProps) => {
  return (
    <div>
      <h1>{status}</h1>
      <p>{message}</p>
      <Link to={PATH.ROOT}>홈으로 돌아가기</Link>
      <button onClick={onRetry}>다시 시도</button>
    </div>
  );
};

export default ErrorPage;
