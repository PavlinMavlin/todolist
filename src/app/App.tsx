import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistList";
import LinearProgress from '@material-ui/core/LinearProgress';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

export type TaskStateType = {
    [key: string]: Array<TaskType>

}

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button variant={"outlined"}
                            color={"inherit"}>Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>)
}


export default App;
