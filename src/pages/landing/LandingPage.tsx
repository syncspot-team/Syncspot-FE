import IconRightHalfArrow from '@src/assets/icons/IconRightHalfArrow.svg?react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@src/constants/path';
import { motion } from 'motion/react';

export default function LandingPage() {
  const navigate = useNavigate();
  const handleClickButton = () => {
    navigate(PATH.ONBOARDING);
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 0.3,
      },
    },
  };

  const messageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 w-full h-full object-cover -z-10 bg-cover bg-center bg-no-repeat bg-[url('/src/assets/images/LandingBackGroundImage.svg')]" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:flex lg:flex-col gap-20 absolute right-[6.25rem] mt-[150px] w-[37.5rem] text-menu"
      >
        <motion.div
          variants={messageVariants}
          className="self-start w-max p-5 bg-gray-light rounded-[3.125rem] -ml-5 -mt-5"
        >
          <h3 className="text-gray-dark">
            우리 다음 주 모임 장소 아직 안 정했잖아! 다들 여기는 어때?
          </h3>
        </motion.div>
        <motion.div
          variants={messageVariants}
          className="self-end w-max p-5 bg-primary rounded-[3.125rem] mr-10 -mb-5"
        >
          <p className="text-white-default">딱 중간이네! 어떻게 찾았어?</p>
        </motion.div>
      </motion.div>
      <div className="fixed bottom-10 right-8 lg:right-28">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
          onClick={handleClickButton}
          className="flex items-center gap-2 px-6 py-4 bg-white rounded-full shadow-md text-primary bg-white-default hover:shadow-lg animate-customBounce hover:animate-none"
        >
          <h3 className="text-content lg:text-menu text-blue-dark02">
            모임 장소 찾으러 가기
          </h3>
          <IconRightHalfArrow className="size-4 text-blue-dark02" />
        </motion.button>
      </div>
    </div>
  );
}
