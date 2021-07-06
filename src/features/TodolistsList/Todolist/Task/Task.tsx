import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string, todoListID: string) => void
    todoListID: string
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
}

export const Task = React.memo(({task, todoListID, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        removeTask(task.id, todoListID)
    }, [removeTask, task, todoListID])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todoListID), [changeTaskStatus, task, todoListID])

    const onTitleChangeHandler = useCallback((title: string) =>
        changeTaskTitle(task.id, title, todoListID), [changeTaskTitle, task, todoListID])

    return (

        <div key={task.id}>
                 <span className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    checked={task.status===TaskStatuses.Completed}
                    onChange={onChangeHandler}
                /><EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
                 </span>
            <IconButton
                onClick={onClickHandler}
            ><Delete/></IconButton>
        </div>)
})