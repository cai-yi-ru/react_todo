/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect,useState } from "react";
import { FaPlusSquare,FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";
import { useLoading } from "../components/LoadingContext";
import axios from "axios";
import Cookies from 'universal-cookie'
import Toast  from "../lib/Toast";
import Loading from "../components/Loading";



function Todo() {
    const cookies = new Cookies();
    const [todolength,setTodoLength] = useState(0)
    const [status,setStatus] = useState('All')
    const [filterTodoList,setFilterTodoList] = useState([])
    const [completedCount ,setCompletedCount] = useState(0)
    const [newTodo, setNewTodo] = useState('')
    const { isLoading, setIsLoading } = useLoading()
    const { token,setToken } = useAuth();
    const [todoList,setTodoList ] = useState([])
    const nickName = sessionStorage.getItem('nickName');
    /** 預設token */
    axios.defaults.headers.common['Authorization'] = `${token}`;
    useEffect(() => {
        setIsLoading(true)
        if(token){
            console.log('執行');
            getTodoList();
            setIsLoading(false)
        }
        
    }, [token]);
    useEffect(()=>{
        let filterTodos = []
        if(status==='not'){
            filterTodos = todoList.filter(item=> item.completed_at===null)
        }else if(status==='All'){
            filterTodos = [...todoList]
        }else if(status==='completed'){
            filterTodos = todoList.filter(item=> item.completed_at!==null)
        }
        const filterCompleted = todoList.filter(item=> item.completed_at===null)
        setCompletedCount(filterCompleted.length)
        setFilterTodoList(filterTodos)
    },[status, todoList])
    
    /** 取得TODO 列表 */
    const getTodoList = async() =>{
        if(token){
            await axios.get('https://todoo.5xcamp.us/todos').then(res => {
                setTodoList(res.data.todos)
                setTodoLength(res.data.todos.length)
            }).catch(err=>{
                Toast(err.response.data.message,'error')
            })
        }
    }
    /** 登出 */
    const signOut = async() =>{
        
        if(token){
            await axios.delete('https://todoo.5xcamp.us/users/sign_out').then(res => {
                if(res.data.message==="已登出"){
                    setToken(null)
                    cookies.remove('token')
                    sessionStorage.clear()
                    delete axios.defaults.headers.common['Authorization']
                    Toast(res.data.message,'success')
                }
            }).catch(err=>{
                Toast(err.response.data.message,'error')
            })
        }
    }

    /** 新增Todo */
    const addTodo = async() => {
        if(newTodo.trim()==='') {
            return Toast('不能輸入空白','error')
        }
        const body = {
            todo: {
              content: newTodo.trim(),
            }
        }
        if(token){
            await axios.post('https://todoo.5xcamp.us/todos',body).then(res => {
                Toast('新增成功','success')
                getTodoList()
                setNewTodo('') 
            }).catch(err=>{
                Toast(err.response.data.message,'error')
            })
        }
    }
    /** 清除全部已完成 */
    const deleteAllCompletedTodo = async() =>{
        const tempTodo = JSON.parse(JSON.stringify(todoList)) 
        const filterCompletedTodo = tempTodo.filter(item=>item.completed_at !==null )
        if(filterCompletedTodo.length===0) return Toast('目前無已完成的項目','error')
        const newtempTodo = tempTodo.map(async item=>{
            if(item.completed_at !==null){
                await axios.delete(`https://todoo.5xcamp.us/todos/${item.id}`)
            }
        })
        await Promise.all(newtempTodo).then(res=>{
            Toast('刪除成功','success')
            getTodoList()
        })
    }

    /** 刪除TODO */
    const deleteTodo = async(id) =>{
        if(token){
            await axios.delete(`https://todoo.5xcamp.us/todos/${id}`).then(res => {
                Toast(res.data.message,'success')
                getTodoList()
            }).catch(err=>{
                Toast(err.response.data.message,'error')
            })
        }
    }

    /** 切換頁籤 */
    const changeStatus = (status) =>{
        setStatus(status)
    }
    /** 改變TODO狀態 */
    const onChange = async(id) =>{
        if(token){
            setIsLoading(true)
            await axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`).then(res => {
                Toast('代辦項目的狀態已改變','success')
                getTodoList()
                setIsLoading(false)
            }).catch(err=>{
                Toast(err.response.data.message,'error')
                setIsLoading(false)
            })
        }
    }


    return(
        <div>
            {isLoading?(<Loading/>):(
            <div>
            <div id="todoListPage" className="bg-half">
                <nav>
                    <h1><a href="#">ONLINE TODO LIST</a></h1>
                    <ul>
                        <li className="todo_sm"><a href="#"><span>{nickName}的代辦</span></a></li>
                        <li><a onClick={signOut}>登出</a></li>
                    </ul>
                </nav>
                <div className="container todoListPage vhContainer">
                    <div className="todoList_Content">
                        <div className="inputBox">
                            <input type="text" placeholder="請輸入待辦事項" value={newTodo} onChange={(e) => {setNewTodo(e.target.value)}}/>
                            
                            <a href="#">
                                <FaPlusSquare onClick={addTodo}/>
                            </a>
                        </div>
                        <div className="todoList_list">
                            <ul className="todoList_tab">
                                
                                <li><a href="#/" className={status==='All'?'active':''} onClick={()=>{changeStatus('All')}}>全部</a></li>
                                <li><a href="#/" className={status==='not'?'active':''} onClick={()=>{changeStatus('not')}}>待完成</a></li>
                                <li><a href="#/" className={status==='completed'?'active':''} onClick={()=>{changeStatus('completed')}}>已完成</a></li>
                                
    
                            </ul>
                            <div className="todoList_items">
                                <ul className="todoList_item">
                                    
                                    {
                                        todolength>0?filterTodoList.map((todo,index) => 
                                            <li key={index}>
                                                <label className="todoList_label">
                                                    <input className="todoList_input" type="checkbox" value={todo.content} checked={todo.completed_at!==null? true:false } onChange={()=>{onChange(todo.id)}}/>
                                                    <span>{todo.content}</span>
                                                </label>
                                                <a href="#">
                                                    <FaTimesCircle onClick={()=>{deleteTodo(todo.id)}}/>
                                                </a>
                                            </li>
                                        ):'目前尚無代辦事項'
                                    }
    
                                </ul>
                                <div className="todoList_statistics">
                                    <p> {completedCount} 個待完成的項目</p>
                                    <a href="#" onClick={deleteAllCompletedTodo}>清除已完成項目</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </div>
    )
}
export default Todo