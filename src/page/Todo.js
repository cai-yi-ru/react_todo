/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect,useState } from "react";
import { FaPlusSquare } from "react-icons/fa";

function Todo() {
    const [status,setStatus] = useState('All')
    const [filterTodoList,setFilterTodoList] = useState([])
    const [completedCount ,setCompletedCount] = useState(0)
    // const { token,setToken } = useAuth();
    const [todoList,setTodoList ] = useState([
        {
            id:'1',
            name:'把冰箱發霉的檸檬拿去丟',
            isCompleted :true
        },
        {
            id:'2',
            name:'打電話叫媽媽匯款給我',
            isCompleted :false
        }
    ])
    useEffect(()=>{
        let filterTodos = []
        if(status==='not'){
            filterTodos = todoList.filter(item=> item.isCompleted===false)
        }else if(status==='All'){
            filterTodos = [...todoList]
        }else if(status==='completed'){
            filterTodos = todoList.filter(item=> item.isCompleted===true)
        }
        const filterCompleted = todoList.filter(item=> item.isCompleted===true)
        setCompletedCount(filterCompleted.length)
        setFilterTodoList(filterTodos)
    },[status, todoList])
    /** 切換頁籤 */
    const changeStatus = (status) =>{
        setStatus(status)
    }
    /** 改變選中狀態 */
    const onChange = (id) =>{
        const newTodoList = [...todoList];
        newTodoList.map(item=>{
            if(id === item.id){
                item.isCompleted = !item.isCompleted
            }
            return item
        })
        setTodoList(newTodoList)
    }
    return(
        <div>
            <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
                <li><a href="#loginPage">登出</a></li>
            </ul>
        </nav>
        <div className="container todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入待辦事項"/>
                    
                    <a href="#">
                        <FaPlusSquare />
                    </a>
                </div>
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        
                        <li><a href="#/todo" className={status==='All'?'active':''} onClick={()=>{changeStatus('All')}}>全部</a></li>
                        <li><a href="#/todo" className={status==='not'?'active':''} onClick={()=>{changeStatus('not')}}>待完成</a></li>
                        <li><a href="#/todo" className={status==='completed'?'active':''} onClick={()=>{changeStatus('completed')}}>已完成</a></li>
                        

                    </ul>
                    <div className="todoList_items">
                        <ul className="todoList_item">
                            {
                                filterTodoList.map((todo,index) => 
                                    <li key={index}>
                                        <label className="todoList_label">
                                            <input className="todoList_input" type="checkbox" value={todo.name} checked={todo.isCompleted } onChange={()=>{onChange(todo.id)}}/>
                                            <span>{todo.name}</span>
                                        </label>
                                        <a href="#">
                                            <i className="fa fa-times"></i>
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                        <div className="todoList_statistics">
                            <p> {completedCount} 個已完成項目</p>
                            <a href="#">清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}
export default Todo