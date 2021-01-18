type Props = {
  onCancel?: () => void
  onSubmit?: () => void
  isOpen: boolean
  title: string
}

export const Modal = (props: Props) => {
  const { onCancel, onSubmit, isOpen, title } = props
  if (!isOpen) return <></>
  return (
    <div className="fixed content-center inset-x-0 h-screen px-4 z-30">
      <div
        className="fixed top-0 inset-x-0 h-screen bg-black opacity-50 z-30"
      />
      <div
        className="fixed inset-x-0 z-40 mx-6 sm:mx-8 md:mx-auto px-6 sm:px-12 py-10 max-w-3xl bg-bg-main rounded"
      >
        <div>
          <p className="whitespace-pre-line">{title}</p>
          <div className="flex flex-row justify-end">
            <button
              className="mt-4 mr-4 py-2 w-1/2 md:w-1/4 font-semibold rounded hover:shadow-xl shadow-md placeholder-textGray text-textGray2 bg-button2"
              onClick={onCancel}
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