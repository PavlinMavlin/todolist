import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Todolist/Task',
    component: Task,

} as Meta


const changeTaskStatusCallback = action("Status changed inside Task")
const changeTaskTitleCallback = action("Title changed inside Task")
const removeTaskCallback = action("Remove Button inside Task clicked")


const
    baseArg = {
        changeTaskStatus: changeTaskStatusCallback,
        changeTaskTitle: changeTaskTitleCallback,
        removeTask: removeTaskCallback,
    }
const Template: Story<TaskPropsType> = (args) => <Task {...args} />;


export const TaskIsDoneExample = Template.bind({});

TaskIsDoneExample.args = {
    task: {
        id: "1", title: "js", status: TaskStatuses.Completed, todoListId: "todolistId1", startDate: "", addedDate: "",
        deadline: "", order: 0, priority: TaskPriorities.Low, description: "",
    },
    todoListID: "todolistId1",
    ...baseArg,
}


export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArg,
    task: {
        id: "1", title: "html", status: TaskStatuses.New, todoListId: "todolistId1", startDate: "", addedDate: "",
        deadline: "", order: 0, priority: TaskPriorities.Low, description: "",
    },
    todoListID: "todolistId1",

}