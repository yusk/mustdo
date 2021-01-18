type Props = {
  onClose?: () => void
  isOpen: boolean
}

export const InfoModal = (props: Props) => {
  const { onClose, isOpen } = props
  if (!isOpen) return <></>
  return (
    <div className="fixed inset-x-0 h-screen px-4 z-30">
      <div
        className="fixed top-0 inset-x-0 h-screen bg-black opacity-50 z-30"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 top-20 sm:top-40 z-40 mx-6 sm:mx-8 md:mx-auto px-6 sm:px-12 py-6 sm:py-10 max-w-3xl bg-bg-main rounded"
      >
        <div>
          <h1 className="font-bold">Must Doについて</h1>
          <p className="text-sm sm:text-base">
            <br />
            やるべきことが多様化してきたこの時代。
            <br />
            <br />
            「色々やるべきことはあるけど、とりあえずこれだけはやりきりたい」と思ったことはありませんか？
            <br />
            <br />
            Must Do はそんなあなたをサポート！ このサービスではタスクを1つだけ設定できて、タスク登録時にそれをツイートします。 そのタスクを完了しない限り、他のタスクは設定できません。 Tweet していることにより、後を戻れなくしてタスクをやる推進力を手に入れられます。
            <br />
            <br />
            Must Do で、あなたの Todo を絶対に Do してあげましょう！
          </p>
        </div>
      </div>
    </div>
  )
}