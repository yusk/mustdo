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
      <div className="fixed inset-x-0 z-40 mx-auto px-12 py-10 max-w-3xl bg-bg h-1/2 rounded">
        <div>
          <p>{title}</p>
          <div className="flex flex-row">
            <button
              className="mt-4 mr-4 py-4 md:py-2 w-full md:w-1/2 font-semibold rounded-lg hover:shadow-xl shadow-md placeholder-textGray text-textGray2 bg-button2"
              onClick={onCancel}
            >
              キャンセル
            </button>
            <button
              className="mt-4 py-4 md:py-2 w-full md:w-1/2 font-semibold rounded-lg hover:shadow-xl shadow-md placeholder-textGray text-white bg-button1"
              onClick={onSubmit}
            >
              はい
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}