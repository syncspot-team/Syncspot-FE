import { useState, useEffect } from 'react';
import { useMenuItems } from '@src/hooks/header/useMenuItems';
import { IMenuItem } from '@src/types/header/menuItemType';
import MobileSubMenu from './MobileSubMenu';
import IconDropdown from '@src/assets/icons/IconDropdown.svg?react';
import IconMenuAccount from '@src/assets/icons/IconMenuAccount.svg?react';
import IconMenuMidpoint from '@src/assets/icons/IconMenuMidpoint.svg?react';
import IconMenuPlace from '@src/assets/icons/IconMenuPlace.svg?react';
import IconMenuTime from '@src/assets/icons/IconMenuTime.svg?react';
import IconService from '@src/assets/icons/IconMenuService.svg?react';
import { sideMenuItems } from '@src/components/users/constants/sideMenuItems';
import { useLoginStore } from '@src/state/store/loginStore';
import IconRightHalfArrow from '@src/assets/icons/IconRightHalfArrow.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { useModal } from '@src/hooks/useModal';
import Modal from '@src/components/common/modal/Modal';
import { MODAL_TYPE } from '@src/types/modalType';
import RecreateVoteModal from '@src/components/common/modal/RecreateVoteModal';
import { useGetUserInfoQuery } from '@src/state/queries/users/useGetUserInfoQuery';

interface IMobileMenuListProps {
  onCloseMenu: () => void;
  isMenuOpen: boolean;
}

export default function MobileMenuList({
  onCloseMenu,
  isMenuOpen,
}: IMobileMenuListProps) {
  const navigate = useNavigate();
  const { modalType, openModal, closeModal } = useModal();
  const { isLogin } = useLoginStore();
  const [clickedMenu, setClickedMenu] = useState<string | null>(null);
  const menuItems = useMenuItems(openModal);
  const { data: userInfo } = useGetUserInfoQuery();

  useEffect(() => {
    if (!isMenuOpen) {
      setClickedMenu(null);
    }
  }, [isMenuOpen]);

  const handleMenuClick = (
    e: React.MouseEvent<HTMLDivElement>,
    item: IMenuItem,
  ) => {
    e.stopPropagation();
    if (item.subMenus) {
      setClickedMenu(clickedMenu === item.label ? null : item.label);
    } else {
      onCloseMenu();
      item.onClick();
    }
  };

  const handleSubMenuClick = (
    e: React.MouseEvent<HTMLLIElement>,
    item: IMenuItem,
  ) => {
    e.stopPropagation();
    setClickedMenu(null);
    onCloseMenu();
    item.onClick();
  };

  const getMenuIcon = (label: string) => {
    switch (label) {
      case '중간 지점 찾기':
        return <IconMenuMidpoint className="size-5" />;
      case '장소 투표':
        return <IconMenuPlace className="size-5" />;
      case '시간 투표':
        return <IconMenuTime className="size-5" />;
      case '서비스 소개':
        return <IconService className="size-5" />;
      case '계정 설정':
        return <IconMenuAccount className="size-5" />;
      default:
        return null;
    }
  };

  return (
    <>
      <ul className="flex flex-col w-full cursor-pointer text-gray-dark whitespace-nowrap text-content">
        {menuItems.map((item) => (
          <li key={item.label}>
            <div
              className="flex items-center justify-between p-4 pr-[1.125rem] hover:bg-gray-light"
              onClick={(e) => handleMenuClick(e, item)}
            >
              <div className="flex items-center gap-[0.625rem]">
                <span className="-mt-[0.125rem]">
                  {getMenuIcon(item.label)}
                </span>
                <span>{item.label}</span>
              </div>
              {item.subMenus && (
                <IconDropdown
                  className={`size-5 transition-transform ${
                    clickedMenu === item.label ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>
            {item.subMenus && clickedMenu === item.label && (
              <div className="bg-white-default">
                <MobileSubMenu
                  subMenus={item.subMenus}
                  onSubMenuClick={handleSubMenuClick}
                />
              </div>
            )}
          </li>
        ))}
        {isLogin ? (
          <li>
            <div
              className="flex items-center justify-between p-4 hover:bg-gray-light"
              onClick={(e) =>
                handleMenuClick(e, {
                  label: '계정 설정',
                  onClick: () => {},
                  subMenus: [],
                })
              }
            >
              <div className="flex items-center gap-[0.625rem]">
                <IconMenuAccount className="size-5" />
                <span>계정 설정</span>
              </div>
              <IconDropdown
                className={`size-5 transition-transform ${
                  clickedMenu === '계정 설정' ? 'rotate-180' : ''
                }`}
              />
            </div>
          )}
        </li>
      ))}
      {isLogin ? (
        <li>
          <div
            className="flex items-center justify-between p-4 hover:bg-gray-light"
            onClick={(e) =>
              handleMenuClick(e, {
                label: '계정 설정',
                onClick: () => {},
                subMenus: [],
              })
            }
          >
            <div className="flex items-center gap-[0.625rem]">
              <IconMenuAccount className="size-5" />
              <span>계정 설정</span>
            </div>
            <IconDropdown
              className={`size-5 transition-transform ${
                clickedMenu === '계정 설정' ? 'rotate-180' : ''
              }`}
            />
          </div>
          {clickedMenu === '계정 설정' && (
            <div className="bg-white-default">
              {sideMenuItems.map((sideItem) => (
                <div key={sideItem.text}>
                  <div className="flex items-center gap-3 py-3 pl-6 font-semibold text-description text-gray-dark">
                    <span>{sideItem.text}</span>
                  </div>
                  <div>
                    {sideItem.subItems
                      .filter(
                        (subItem) =>
                          !(
                            userInfo?.data.isOauth &&
                            subItem.text === '비밀번호 변경'
                          ),
                      )
                      .map((subItem) => (
                        <div
                          key={subItem.path}
                          className="flex items-center gap-[0.625rem] px-8 py-4 hover:bg-gray-light text-description"
                          onClick={() => {
                            onCloseMenu();
                            window.location.href = subItem.path;
                          }}
                        >
                          <subItem.icon className="-mt-1 size-5" />
                          <span>{subItem.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </li>
        ) : (
          <li>
            <div
              onClick={() => {
                onCloseMenu();
                navigate(PATH.SIGN_IN);
              }}
              className="flex items-center gap-2 p-4 pl-5 hover:bg-gray-light"
            >
              <span>로그인 하러 가기</span>
              <IconRightHalfArrow className="size-5" />
            </div>
          </li>
        )}
      </ul>
      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalType === MODAL_TYPE.RECREATE_VOTE_MODAL && (
          <RecreateVoteModal onConfirm={() => {}} onClose={closeModal} />
        )}
      </Modal>
    </>
  );
}
