import React from 'react';
import './daysweek.css';

export default function DaysWeek() {

    return (
        <ul className="box_ul_week">
            <li className="li_week">Dom</li>
            <li className="li_week">Seg</li>
            <li className="li_week">Ter</li>
            <li className="li_week">Qua</li>
            <li className="li_week">Qui</li>
            <li className="li_week">Sex</li>
            <li className="li_week">Sab</li>
        </ul>
    );
}