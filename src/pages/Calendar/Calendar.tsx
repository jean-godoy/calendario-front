import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import api from '../../services/api';
import './calendar.css';

//components
import DaysWeek from '../../components/DaysWeek/DaysWeek';
import monthOfYear from '../../utils/Months';

//interrfaces
import { Appointment } from '../../interface/Interfaces';


export default function Calendar(props: any) {

    const date = new Date();

    const [month, setMonth] = useState<number>(Number(date.getMonth()));
    const [year, setYear] = useState<number>(date.getFullYear());
    const [numberDays, setNumberDays] = useState<number>(0);
    const [firstDay, setFirstDay] = useState<number>(date.getDate());

    const [appointment, setAppointment] = useState<Appointment>();

    useEffect(() => {
        numberOfDays();

        (async () => {
            await getAppointmens();
        })();
    }, []);

    /**
     * Função que busca todos eventos referente ao mes apresentado
     */
    function getAppointmens(): void {

        api.get(`/get-appointment/${(month + 1)}/${year}`).then((data) => {
            setAppointment(data.data);
        }).catch(e => {
            console.log(e);
        });
    }

    /**
     * Acrescenta um mes
     */
    const setUp = () => {
        numberOfDays();
        let current = month;
        let newMonth = (current + 1);
        setMonth(newMonth);
        numberOfDays();
        getAppointmens();
    }

    /**
     * Decrescenta um mes
     */
    const setDown = () => {
        let current = month;
        let newMonth = (current - 1);
        setMonth(newMonth);
        numberOfDays();
        getAppointmens();
    }

    /**
     * Retorna a quantidade de dias do mes selecionado
     */
    const numberOfDays = (): void => {
        const numDias = new Date(year, (month + 1), 0).getDate();
        setNumberDays(numDias);
    }

    /**
     * Reenderiza os dias do mes selecionado
     * @returns []
     */
    const List = () => {
        //array para armazenar os dias do mes
        let daysOfMonth = [];

        //instancia um novo objeto date para recupera a posição da semana do primeiro dia do me
        const day = new Date(`${year}-${(month + 1)}`)
        const dayWeek = day.getDay();

        for (let i = 0; i < dayWeek; i++) {
            daysOfMonth.push(<li className="calendar_li red">0</li>);
        }

        //insere os dias do mes selecionado no array
        for (var i = 1; i <= numberDays; i++) {
            daysOfMonth.push(
                <li className="calendar_li">
                    <Link className="link_day" to={`/agenda/${i}/${(month + 1)}/${year}`}>{i}</Link>
                </li>
            )
        }

        return (
            <ul className="calendar_ul">{daysOfMonth}</ul>
        )
    }
    console.log(appointment)
    return (
        <>
            <header className="box_header">
                <div className="month_of_years">

                    <h3>{monthOfYear[Number(month)]} de {year}</h3>

                    <div className="change_date">
                        <div className="change_group" onClick={setDown}>
                            <FiChevronLeft size={24} />
                        </div>
                        <div className="change_group" onClick={setUp}>
                            <FiChevronRight size={24} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="main_calendar">
                <DaysWeek />
                <List />

            </main>
        </>
    );
}