import React from 'react';
import {Meta, Story} from '@storybook/react';
import App from "../app/App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = (args) => < App/>;
export const AppWithReduxExample = Template.bind({})

AppWithReduxExample.args = {

}

