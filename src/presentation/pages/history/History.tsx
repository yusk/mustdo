import { useEffect, useState } from "react"
import { Todo } from "../../../domain/entities"
import { useTodoHistory } from "../../../domain/hooks/history/HistoryHooks"
import watchIcon from "../../../common/images/watch.svg"
import { DateHelper } from "../../../common/helper"
import navigateIcon from "../../../common/images/navigate.svg"
import { useHistory } from 'react-router-dom'

export const History = (): JSX.Element => {
  const { fetchTodoHistory, removeTodoHistory } = useTodoHistory()
  const [todoHistory, setTodoHistory] = useState<Todo[]>([])

  const history = useHistory()

  const onClickBack = () => history.goBack()

  useEffect(() => {
    const getTodoHistory = async () => {
      const todoHistoryList = await fetchTodoHistory()
      console.log(todoHistoryList)
      if (todoHistoryList === undefined) {
        return
      }
      setTodoHistory(todoHistoryList)
    }
    getTodoHistory()
  }, [])

  const getDate = (todo: Todo): string => {
    if (todo.is_done == null) {
      return ''
    }
    return DateHelper.toString(todo.is_done)
  }

  return (
    <div className=" min-h-screen bg-bg">
      <header className="fixed w-full h-16 bg-white shadow flex justify-center items-center">
        <p className="text-center text-title font-bold">完了したタスク</p>
        <img onClick={onClickBack} className="fixed left-4 h-8 cursor-pointer" src={navigateIcon} alt="" />
        {/* <p className="fixed right-4 h-4" onClick={removeTodoHistory}>削除</p> */}
      </header>
      <main className="flex flex-col items-center pt-24 container">
        {
          todoHistory.length === 0 ?
            <p>まだ完了したタスクはありません。</p>
            :
            <>
              {
                todoHistory.map((todo, index) => {
                  return (
                    <div key={index} className=" w-full lg:w-3/5 xl:w-2/5 bg-white mb-3 py-3 px-4 rounded shadow-md">
                      <p className="text-text">{todo.title}</p>
                      <div className="flex mt-2">
                        <img className="" src={watchIcon} alt="" />
                        <p className="text-orange-50 mx-1">{getDate(todo)}</p>
                      </div>
                    </div>
                  )
                })
              }
            </>
        }
      </main>
    </div>
  )
}