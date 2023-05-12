import React from 'react';
import './TrendCard.scss';

import { TrendData } from '../../Data/TrendsData';

const TrendCard = () => {
    return (
        <div className="TrendCard">
            <h3>Trends for you</h3>
            {TrendData.map((trend, i) => {
                return (
                    <div className="trend" key={i}>
                        <span>#{trend.name}</span>
                        <span>{trend.shares}k shares</span>
                    </div>
                );
            })}
        </div>
    );
};

export default TrendCard;
