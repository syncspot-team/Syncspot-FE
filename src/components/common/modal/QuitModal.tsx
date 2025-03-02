interface IQuitModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function QuitModal({ onConfirm, onClose }: IQuitModalProps) {
  return (
    <div className="flex flex-col items-center w-full min-w-[calc(100dvw-10rem)] lg:min-w-[350px]">
      <h2 className="mb-2 text-subtitle lg:text-title text-tertiary">
        회원 탈퇴
      </h2>
      <p className="mb-6 text-description lg:text-content text-gray-dark">
        정말 탈퇴하시겠어요?
      </p>
      <div className="flex flex-col w-full gap-3 mt-auto lg:flex-row text-description lg:text-content">
        <button
          className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-white-default"
          onClick={onConfirm}
        >
          네
        </button>
        <button
          className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-dark"
          onClick={onClose}
        >
          아니요
        </button>
      </div>
    </div>
  );
}
