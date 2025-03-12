interface IRecreateVoteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function RecreateVoteModal({
  onConfirm,
  onClose,
}: IRecreateVoteModalProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="mb-2 text-subtitle lg:text-title text-tertiary">
        새 투표 생성하기
      </h2>
      <p className="mb-6 text-description lg:text-content text-gray-dark">
        기존의 투표를 삭제하고 새로운 투표를 생성하시겠습니까?
      </p>
      <div className="flex flex-col w-full gap-3 mt-auto lg:flex-row text-description lg:text-content">
        <button
          className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-secondary text-white-default"
          onClick={onConfirm}
        >
          네
        </button>
        <button
          className="flex-1 px-4 py-2 rounded-lg bg-gray-light hover:bg-gray-200 text-gray-dark"
          onClick={onClose}
        >
          아니요
        </button>
      </div>
    </div>
  );
}
