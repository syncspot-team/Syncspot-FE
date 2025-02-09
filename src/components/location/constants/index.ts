import IconStudy from '@src/assets/icons/IconStudy.svg?react';
import IconCafe from '@src/assets/icons/IconCafe.svg?react';
import IconRestaurant from '@src/assets/icons/IconRestaurant.svg?react';
import { PLACE_STANDARDS } from '../PlaceTypeFilter';

export const SEQUENCE = ['첫', '두', '세', '네', '다섯'] as const;

export const FILTER_ITEMS = [
  { type: PLACE_STANDARDS.ALL, label: '전체' },
  { type: PLACE_STANDARDS.STUDY, label: '스터디', Icon: IconStudy },
  { type: PLACE_STANDARDS.CAFE, label: '카페', Icon: IconCafe },
  { type: PLACE_STANDARDS.RESTAURANT, label: '식당', Icon: IconRestaurant },
];
