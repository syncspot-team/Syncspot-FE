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
          'https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png',
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
