import React from 'react'
import styles from "../../Styles/TaskContHead.module.css"
import {Select,Input,InputGroup,InputLeftElement, border} from "@chakra-ui/react"
import {SearchIcon} from "@chakra-ui/icons"
import NoResult from "./NoResult"
import NewTaskLayout from './NewTaskLayout'
import {useDispatch,useSelector} from "react-redux"
import { createTask, getTasks ,updateTask,deleteTask} from '../../redux/app/action'
import { GET_TASKS_SUCCESS, TASK_CREATE_SUCCESS } from '../../redux/app/actionType'


const TaskContHead = () => {
    const [show,setShow] = React.useState(false);
    const [assignee,setAssignee] = React.useState("Select Assignee")
    const [creater,SetCreater] = React.useState("")
    const [taskName,setTaskName] = React.useState("")
    const [project,setProject] = React.useState("")
    const [tasks,setTasks] = React.useState([])


    const handleShow = () => setShow(true)


    const members = [
        "Rohit",
        "Aaro",
        'Satyendra'
    ];
    const projects = [
        "a",
        "v",
        "c"
    ]
    const clients = [
        "a","b","c"    ]
    const tags = ["No work","Design","Development","Impletation","testing"]
    // const status = ["No tag","No work","Design","Development","Impletation","testing"]
    const creator = ["a","b","c"]
    const sources = ["a","b","c"]
    const status = ["Open","Completed"]
 
    


    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(getTasks({}))
        .then((res)=>{
            if(res.type==GET_TASKS_SUCCESS) {
                console.log(tasks)
                setTasks(res.data)
            }
        })
    },[assignee,creater,taskName,project])
    

    const PostNewTask = ()=>{
        dispatch(createTask({assignee:"",creater:"",taskName:"",project:""}))
        .then((res)=> console.log(res.data))
        .catch((err) =>console.log(err))
    }

    // const updateOne = () => {
    //     dispatch(updateTask({

    //         taskName,
    //         creater,assignee,project
    //     }))
    // }
    // const deleteParticularTask = () => {
    //     dispatch(deleteTask({taskId}))
    // }


  return (
    <div className={styles.TaskHeadContWrapper}>
         <div className={styles.HeadSection} >
            <div className={styles.HeadText}>My Tasks</div>
            <div className={styles.LineBar}></div>
            <div 
               onClick={handleShow}
               className={styles.AssigneeSelect}>{assignee} 
            </div>
            {
                !show ? "" : (
                    <div className={styles.OptionActivator}>
                    <div style={{padding:"10px"}}>
                    <div  
                        className={styles.optionStyling}>
                        <input
                          className={styles.InputOption}
                          type="text"
                          placeholder="Find assignee.." 
                        />
                    </div>
                    <div onClick={()=>{
                        setAssignee("Unassigned")
                        setShow(false)
                    }} className={styles.optionStyling}>
                     <div className={styles.OptionFlex}>
                                    <div><i className="fa-solid fa-user-tie"></i></div>
                                    <div style={{width:'400px'}}>Unassigned</div>
                                </div>
                     </div>
                     <div onClick={()=>{
                        setAssignee("All");
                        setShow(false)
                     }} className={styles.optionStyling}>
                            <div className={styles.OptionFlex}>
                                <div><i className="fa-solid fa-user-tie"></i></div>
                                <div>All</div>
                            </div>
                     </div>
                     <div style={{color:"#777e85"}}>Members</div>
                    {
                        members?.map((elem,index)=>(
                            <div onClick={()=>{
                                    setAssignee(elem)
                                    setShow(false)
                                }} 
                                className={styles.optionStyling} key={index} value={elem.name}>
                                <div className={styles.OptionFlex}>
                                    <div><i className="fa-solid fa-user-tie"></i></div>
                                    <div>{elem}</div>
                                </div> 
                            </div>
                        ))
                    }
                    </div>
                </div>
                ) 
            }
        </div>
   {/*==========================Filter Section============================== */}


        <duv className={styles.FilterWrapper}>
        <div className={styles.filterButton}>
            <Select >
                <option value='Project : All'>
                    Client : All</option>
                {clients?.map((elem)=>(
                    <option value={elem}>{elem}</option>
                ))}
            </Select>
            </div>
            <div className={styles.filterButton}>
            <Select >
                <option value='Project : All'>
                    Project : All</option>
                <option value='No Project'>No Project</option>
                {projects?.map((elem)=>(
                    <option value={elem}>{elem}</option>
                ))}
            </Select>
            </div>
            <div className={styles.filterButton}>
            <Select >
                <option value='Tag : All'>
                    Tag : All</option>
                <option value='No Tag'>No Tag</option>
                {tags?.map((elem)=>(
                    <option value={elem}>{elem}</option>
                ))}
            </Select>
            </div>

            <div className={styles.filterButton}>
            <Select >
            <option value="All">Status : All</option>
                {status?.map((elem)=>(
                    <option value={elem}>{elem}</option>
                ))}
            </Select>
            </div>
            <div className={styles.filterButton}>
            <Select >
                <option value='Any'>
                    Creator : Any</option>
                <option value='me'>Me</option>
                {members?.map((elem)=>(
                    <option value={elem}>{elem}</option>
                ))}
            </Select>
            </div>
            <div className={styles.filterButton}>
            <Select >
                <option value='All'>
                Source : All</option>
                   <option value='No Project'>No Project</option>
                   <option value="Internal">Internal</option>
                   <option value="External">External</option>
            </Select>
            </div>
            <div className={styles.filterButton}>
              <button style={{marginTop:"2px",border:"solid #a1a7b2 1px",padding:"5px",borderRadius:"5px"}}>Clear Filters</button>
            </div>
        </duv>

    {/*==========================New Task button Section============================== */}

        <div style={{display:"flex", border: "solid #a1a7b2 1px", height:"100%" ,flexDirection:"column"}}>
            <div style={{display:"flex",justifyContent:"space-between", margin:"5px 1px",   border: "solid #a1a7b2 1px" }}>
            <div className={styles.NewtaskDivWrapper}>
                <div style={{display:"flex",gap:"20px"}}>
                    <div 
                        className={styles.NewTaskButton}
                        onClick={PostNewTask}
                        >+ New task</div>
                </div>
                <div className={styles.SortDIv}>
                    <Select>
                        <option value="Project">Project</option>
                        <option value="Estimate">Estimate</option>
                        <option value="Due Date">Due Date</option>
                        <option value="Last Updated">Last Updated</option>
                        <option value="Newer First">Newer First</option>
                        <option value="Older First">Older First</option>
                    </Select>
                </div>
            </div>

            <div className={styles.feed}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input type='text' placeholder='Search' />
              </InputGroup>
            </div>
            </div>
            {
                !tasks.length ? <NoResult /> : <NewTaskLayout tasks={tasks} />
            }
        </div>

 </div>

  )
}

export default TaskContHead