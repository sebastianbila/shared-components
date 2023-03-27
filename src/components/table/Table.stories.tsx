import React from 'react';

import TableComponent from './Table';

export default {
    title: 'Components/Table',
    component: TableComponent,
};

const Template = (args) => <TableComponent {...args} />;

export const Table = Template.bind({});
