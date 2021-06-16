import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";
import {EditableSpan} from "./EditTableSpan";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string, todoListID: string) => void
    todoListID: string
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
}

export const Task = React.memo(({task, todoListID, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        removeTask(task.id, todoListID)
    }, [removeTask, task, todoListID])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todoListID), [changeTaskStatus, task, todoListID])
    const onTitleChangeHandler = useCallback((title: string) =>
        changeTaskTitle(task.id, title, todoListID), [changeTaskTitle, task, todoListID])

    return (

        <div key={task.id}>
                 <span className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    checked={task.isDone}
                    onChange={onChangeHandler}
                /><EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
                 </span>
            <IconButton
                onClick={onClickHandler}
            ><Delete/></IconButton>
        </div>)
})