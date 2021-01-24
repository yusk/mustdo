import createIcon from '../../../common/images/create.svg'
import clearIcon from '../../../common/images/clear.svg'

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
        className="fixed inset-x-0 top-20 sm:top-40 z-40 mx-6 sm:mx-8 md:mx-auto pb-6 sm:pb-10 max-w-3xl bg-bg-main rounded"
      >
        <div className="h-6 sm:h-10 flex justify-end px-4 pt-4">
          <img
            className="h-6 cursor-pointer"
            src={clearIcon} alt=""
            onClick={onClose}
          />
        </div>
        <div className="px-6 sm:px-12">
          <div className="flex">
            <img className="mr-3" src={createIcon} alt="" />
            <h1 className="font-bold text-xl">Must Doについて</h1>
          </div>
          <p className="text-sm sm:text-base">
            <br />
            やるべきことが多様化してきたこの時代。
            <br />
            <br />
            「<strong>色々やるべきことはあるけど、とりあえずこれだけはやりきりたい</strong>」と思ったことはありませんか？
            <br />
            <br />
            Must Do はそんなあなたをサポート！
            <br />
            このサービスでは<strong>タスクを1つだけ設定できて、</strong>タスク登録時にそれを<strong>ツイート</strong>します。
            <br />
            そのタスクを完了しない限り、他のタスクは設定できません。
            <br />
            Tweet していることにより、<strong>後を戻れなくして</strong>タスクをやる推進力を手に入れられます。
            <br />
            <br />
            Must Do で、あなたの Todo を<strong>絶対に Do </strong>してあげましょう！
          </p>
        </div>
      </div>
    </div>
  )
}