import { ShareType } from '@src/types/shareType';

interface IShareKakao {
  descriptionType: ShareType;
  url: string;
}

export function useShareKakao({ descriptionType, url }: IShareKakao) {
  if (window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'SyncSpot 중간지점찾기',
        description: descriptionType,
        imageUrl:
          'https://private-user-images.githubusercontent.com/96279437/420756408-414c6915-f91c-4fe0-8be5-eb4f6c92523c.jpeg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI0NTEwOTAsIm5iZiI6MTc0MjQ1MDc5MCwicGF0aCI6Ii85NjI3OTQzNy80MjA3NTY0MDgtNDE0YzY5MTUtZjkxYy00ZmUwLThiZTUtZWI0ZjZjOTI1MjNjLmpwZWc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzIwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyMFQwNjA2MzBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00NDJmZTlhOTk4NTRhNDAzYmFmMjQwNDAzMDIyZGI5MDBjNDY0OTFkOTkyZmM0ZTBiN2I4ZmIzNjVjNGI0YTJjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.3f8QgzEL9svVa3AmndA8bmOag76XeW7ayIhy8Qhm0UU',
        link: {
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '자세히 보러 가기',
          link: {
            webUrl: url,
          },
        },
      ],
    });
  } else {
    console.error('Kakao SDK is not loaded.');
  }
}
