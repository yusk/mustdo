import React, { useEffect, useState } from 'react';
import { Todo } from '../../../domain/entities';
import { useInfoModal, useTodo } from '../../../domain/hooks';
import { useTodoHistory } from '../../../domain/hooks/history/HistoryHooks';
import { Modal } from '../../components';
import { useHistory } from 'react-router-dom'
import checkIcon from '../../../common/images/checkIcon.svg'
import { InfoModal } from '../../components/atoms/InfoModal';
import logo from '../../../common/images/logo.svg'

enum TweetType {
  'start',
  'remove',
  'done',
}

export const Top = (): JSX.Element => {
  const { fetchTodo, saveCurrentTodo, doneCurrentTodo, removeCurrentTodo } = useTodo()
  const { addTodoHistory } = useTodoHistory()
  const { checkIsInitialStartup, saveIsInitialStartup } = useInfoModal()

  const history = useHistory()

  const [title, setTitle] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(undefined)
  const [isStartModalOpen, setIsStartModalOpen] = useState<boolean>(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState<boolean>(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const getCurrentTodo = async () => {
      try {
        setLoading(true)
        await initTodo()
        await initInfoModal()
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
        // if (e instanceof Error) reactAlert.show(e.message, { type: types.ERROR })
      }
    }
    getCurrentTodo()
  }, [])

  const onClickHistoryPage = () => history.push("/history")

  const initTodo = async () => {
    const todo = await fetchTodo()
    setCurrentTodo(todo)
  }

  const initInfoModal = async () => {
    const check = await checkIsInitialStartup()
    if (check === undefined) {
      return
    }
    setIsInfoModalOpen(!check)
  }

  const saveTodo = async () => {
    if (title.length === 0) {
      return
    }
    const todo = await saveCurrentTodo(title)
    setCurrentTodo(todo)
    setTitle("");
  }

  const postTwitter = (title: string | undefined, type: TweetType) => {
    if (title === undefined) {
      return
    }
    let text: string = ''
    if (type === TweetType.remove) {
      text = 'を取り消しました。'
    } else if (type === TweetType.done) {
      text = 'を達成しました！'
    }
    var link = `https://twitter.com/intent/tweet?text=『${title}』${text}&hashtags=MustDo&url=https://mustdo.tsurumiii.vercel.app/`
    window.open(link, "_blank");
  }

  const doneTodo = async () => {
    if (currentTodo === undefined) {
      return
    }
    const doneTodo = await doneCurrentTodo(currentTodo)
    await addTodoHistory(doneTodo)
    await initTodo()
  }

  const removeTodo = async () => {
    await removeCurrentTodo()
    await initTodo()
  }

  if (loading) {
    return (
      <div className="h-screen bg-bg-main">
        ...loading
      </div>
    )
  }

  return (
    <div className="h-screen bg-bg-main font-sans">
      <header className="h-16 bg-white shadow flex justify-center items-center">
        <img className="h-6" src={logo} alt="" />
        <img
          className="fixed right-4 h-4 cursor-pointer"
          src={checkIcon}
          onClick={onClickHistoryPage}
        />
      </header>

      <div className="flex flex-col items-center pt-5 container">
        <div className="md:w-1/2 w-full">
          {
            currentTodo === undefined ?
              <>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="タスクを入力"
                  className="focus:border-indigo-500 block h-10 w-full pl-3 pr-12 md:text-sm border-gray-300 rounded-sm"
                />
                <button
                  className="mt-4 py-4 md:py-2 w-full lg:w-auto xl:w-1/2 md:px-20 font-semibold rounded-lg hover:shadow-xl shadow-md placeholder-textGray text-white bg-button1"
                  onClick={() => {
                    if (title.length === 0) return
                    setIsStartModalOpen(true)
                  }}
                >
                  タスクを登録
                </button>
              </> :
              <>
                <div className="bg-white px-4 py-3 shadow-md rounded">
                  <h1 className="text-text font-bold">{currentTodo.title}</h1>
                </div>
                <div className="flex flex-col-reverse md:flex-row justify-between ">
                  <button
                    className="mt-4 mr-4 py-4 md:py-2 w-full md:w-1/2 font-semibold rounded-lg hover:shadow-xl shadow-md placeholder-textGray text-textGray2 bg-button2"
                    onClick={() => setIsRemoveModalOpen(true)}
                  >
                    取り消す
                  </button>
                  <button
                    className="mt-4 py-4 md:py-2 w-full md:w-1/2 font-semibold rounded-lg hover:shadow-xl shadow-md placeholder-textGray text-white bg-button1"
                    onClick={() => setIsCompleteModalOpen(true)}
                  >
                    タスクを完了
                  </button>
                </div>
              </>
          }
        </div>
      </div>
      <div className="fixed right-0 bottom-0 mr-4 md:mr-8 mb-8">
        <button
          className="h-8 w-8 rounded-full bg-bg-gray text-white"
          onClick={() => setIsInfoModalOpen(true)}
        >
          ？
        </button>
      </div>
      <Modal
        title={`タスクを登録しますか？\n登録したタスクはツイートされます`}
        isOpen={isStartModalOpen}
        onCancel={() => {
          setIsStartModalOpen(false)
        }}
        onSubmit={async () => {
          postTwitter(title, TweetType.start)
          await saveIsInitialStartup()
          await saveTodo()
          setIsStartModalOpen(false)
        }}
      />
      <Modal
        title={`タスクを完了しますか？\n完了したタスクはツイートされます`}
        isOpen={isCompleteModalOpen}
        onCancel={() => {
          setIsCompleteModalOpen(false)
        }}
        onSubmit={async () => {
          postTwitter(currentTodo?.title, TweetType.done)
          await doneTodo()
          setIsCompleteModalOpen(false)
        }}
      />
      <Modal
        title={`タスクを取り消しますか？\n 取り消したタスクはツイートされます`}
        isOpen={isRemoveModalOpen}
        onCancel={() => {
          setIsRemoveModalOpen(false)
        }}
        onSubmit={async () => {
          postTwitter(currentTodo?.title, TweetType.remove)
          await removeTodo()
          setIsRemoveModalOpen(false)
        }}
      />

      <InfoModal
        onClose={async () => {
          setIsInfoModalOpen(false)
        }}
        isOpen={isInfoModalOpen}
      />
    </div>
  );
}
