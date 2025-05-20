export interface TeamMember {
  role: string;
  name: string;
  school: string;
}

export interface SocialLink {
  url: string;
  icon: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { role: 'PM, DE', name: '이솔', school: '이화여대' },
  { role: 'PM', name: '김기림', school: '이화여대' },
  { role: 'FE-LEAD', name: '김태윤', school: '동국대' },
  { role: 'FE', name: '채다희', school: '가톨릭대' },
  { role: 'BE-LEAD', name: '윤찬호', school: '홍익대' },
  { role: 'BE', name: '신예진', school: '숙명여대' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    url: 'https://www.instagram.com/syncspot_official?igsh=MWp5MjdzaHNtc2xsMg%3D%3D&utm_source=qr',
    icon: 'IconAboutInstagram',
  },
  {
    url: 'https://github.com/syncspot-team',
    icon: 'IconGithub',
  },
];
