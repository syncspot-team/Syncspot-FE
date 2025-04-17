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
        title: 'Syncspot | 모두가 편하게 만나는 지름길',
        description: descriptionType,
        imageUrl:
          'https://private-user-images.githubusercontent.com/96279437/420756408-414c6915-f91c-4fe0-8be5-eb4f6c92523c.jpeg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQ4NjcwODQsIm5iZiI6MTc0NDg2Njc4NCwicGF0aCI6Ii85NjI3OTQzNy80MjA3NTY0MDgtNDE0YzY5MTUtZjkxYy00ZmUwLThiZTUtZWI0ZjZjOTI1MjNjLmpwZWc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDE3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQxN1QwNTEzMDRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iNjE5YWRmNjg5NGY4NmMzMmQ2YzM0NzQwNTIwY2I3ZDQ2YjcyOWZmZmNkNGIxZTFkZDMwY2U4Y2I2ZmM0MzA3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.XT7eEj6a7AQYCReh3Rt3dJnhx8cX9eANa2Q09NTL1uc',
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
