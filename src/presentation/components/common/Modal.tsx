import clearIcon from '../../../common/images/clear.svg'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
  isOpen: boolean
  title: string
  taskTitle: string
}

export const Modal = (props: Props) => {
  const { onClose, onSubmit, isOpen, title, taskTitle } = props
  if (!isOpen) return <></>
  return (
    <div className="fixed content-center inset-x-0 h-screen px-4 z-30">
      <div
        className="fixed top-0 inset-x-0 h-screen bg-black opacity-50 z-30"
      />
      <div
        className="fixed inset-x-0 z-40 mx-6 sm:mx-8 md:mx-auto pb-10 max-w-3xl bg-bg-main rounded"
      >
        <div className="h-10 flex justify-end px-4 pt-4">
          <img
            className="h-6 cursor-pointer"
            src={clearIcon} alt=""
            onClick={onClose}
          />
        </div>
        <div className="px-6 sm:px-12">
          <p className="font-bold text-center break-words">『{taskTitle}』</p>
          <p className="whitespace-pre-line">{title}</p>
          <div className="flex flex-row justify-end">
            <button
              className="mt-4 mr-4 py-2 w-1/2 md:w-1/4 font-semibold rounded hover:shadow-xl shadow-md placeholder-textGray text-textGray2 bg-button2"
              onClick={onClose}
            >
              キャンセル
            </button>
            <button
              className="mt-4 py-2 w-1/2 md:w-1/4 font-semibold rounded hover:shadow-xl shadow-md placeholder-textGray text-white bg-button1"
              onClick={onSubmit}
            >
              決定
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
