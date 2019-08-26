import React from 'react';

import { Tag } from 'antd';

const StatusBadge = ({ status }) => {
    switch (status) {
        case 0:
            return <Tag color="grey">Pending review</Tag>;
        case 1:
            return <Tag color="orange">Half points</Tag>;
        case 2:
            return <Tag color="green">Full points</Tag>;
        case 3:
            return <Tag color="red">Rejected</Tag>;
        default:
            return <Tag color="grey">Unknown</Tag>;
    }
};

export default StatusBadge;
