import React, { useEffect, useState } from 'react';
import { Todo } from '../../../domain/entities';
import { useTodo } from '../../../domain/hooks';

export const Top = (): JSX.Element => {
  const { fetchTodo, saveCurrentTodo, doneCurrentTodo } = useTodo()

  const [title, setTitle] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [currentTodo, setCurrentTodo] = useState<Todo | undefined>(undefined)

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

  const initTodo = async () => {
    const todo = await fetchTodo()
    setCurrentTodo(todo)
  }

  const saveTodo = async () => {
    console.log(title);
    const todo = await saveCurrentTodo(title)
    setCurrentTodo(todo)
    setTitle("");
  }

  const doneTodo = async () => {
    if (currentTodo === undefined) {
      return
    }
    const doneTodo = await doneCurrentTodo(currentTodo)
    /// TODO履歴へ追加@tsurumiii
    await initTodo()
  }

  if (loading) {
    return (
      <div className="h-screen bg-gray-900">
        ...loading
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-900">
      <header className="h-16 bg-gray-800 shadow flex justify-center items-center">
        <p className="text-center text-gray-400 text-3xl">mustDo</p>
      </header>

      {
        currentTodo === undefined ?
          <div className="flex flex-row justify-center items-center justify-items-center pt-5">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block h-8 w-1/3 pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
            />
            <button
              className="ml-5 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
              onClick={saveTodo}
            >
              保存
            </button>
          </div>
          :
          <div className="w-full text-center">
            <h1 className="text-white text-5xl">{currentTodo.title}</h1>
            <div className="mt-10">
              <button
                className="ml-5 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700"
                onClick={doneTodo}
              >
                終了
              </button>
            </div>
          </div>
      }
    </div>
  );
}