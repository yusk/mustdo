import React, { useEffect, useState } from 'react';
import { Todo } from '../../../domain/entities';
import { useTodo } from '../../../domain/hooks';
import { useTodoHistory } from '../../../domain/hooks/history/HistoryHooks';
import { Modal } from '../../components';
import { useHistory } from 'react-router-dom'
import checkIcon from '../../../common/images/checkIcon.svg'

export const Top = (): JSX.Element => {
  const { fetchTodo, saveCurrentTodo, doneCurrentTodo, removeCurrentTodo } = useTodo()
  const { addTodoHistory } = useTodoHistory()

  const history = useHistory()

  const [title, setTitle] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(undefined)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    const getCurrentTodo = async () => {
      try {
        setLoading(true)
        await initTodo()
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

  const saveTodo = async () => {
    if (title.length === 0) {
      return
    }
    const todo = await saveCurrentTodo(title)
    setCurrentTodo(todo)
    setTitle("");
    setIsModalOpen(true)
  }

  const postTwitter = (title: string | undefined) => {
    if (title === undefined) {
      return
    }
    var link = `https://twitter.com/intent/tweet?text=${title}&hashtags=MustDo`
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
      <div className="h-screen bg-bg">
        ...loading
      </div>
    )
  }

  return (
    <div className="h-screen bg-bg">
      <header className="h-16 bg-white shadow flex justify-center items-center">
        <p className="text-center text-title text-3xl font-bold">Must Do</p>
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
                  className="mt-4 py-4 md:py-2 w-full md:w-auto md:px-20 font-semibold rounded-lg hover:shadow-xl shadow-md placeholder-textGray text-white bg-button1"
                  onClick={saveTodo}
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
                    onClick={removeTodo}
                  >
                    取り消す
                  </button>
                  <button
                    className="mt-4 py-4 md:py-2 w-full md:w-1/2 font-semibold rounded-lg hover:shadow-xl shadow-md placeholder-textGray text-white bg-button1"
                    onClick={doneTodo}
                  >
                    タスクを完了
                  </button>
                </div>
              </>
          }
        </div>
      </div>
      <Modal
        title="twitterにタスクを投稿しますか？"
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={() => postTwitter(currentTodo?.title)}
      />
    </div>
  );
}