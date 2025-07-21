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
          'https://private-user-images.githubusercontent.com/96279437/420756408-414c6915-f91c-4fe0-8be5-eb4f6c92523c.jpeg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTMwNzYyMjYsIm5iZiI6MTc1MzA3NTkyNiwicGF0aCI6Ii85NjI3OTQzNy80MjA3NTY0MDgtNDE0YzY5MTUtZjkxYy00ZmUwLThiZTUtZWI0ZjZjOTI1MjNjLmpwZWc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcyMVQwNTMyMDZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iNTE2Yzc5ZWNlZWM4Yjg3OTU0N2M3MGIwMjQwMmIxMWMwZThhNDM4ZmI0NTNkZDZkY2U1N2Y5NTRhZjBiM2E2JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.swEgLkb_JUuBO_0ACyZ67Dv7TnXoX_AV1LUXwOuQh50',
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
