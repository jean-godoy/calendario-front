import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import API from '../../services/api';
import './schedule.css';

//components
import Header from '../../components/Header/Header';

//interfaces
import { Appointment } from '../../interface/Interfaces'

export default function Schedule(props: any) {

    const history = useHistory();

    //pega os parametros passado pela url
    const [day, setDay] = useState(props.match.params.day);
    const [month, setMonth] = useState(props.match.params.month);
    const [year, setYear] = useState(props.match.params.year);

    function handleSubmit(e: any) {
        e.preventDefault();

        //recupera o horario selecionado
        const hour = e.target.querySelector('#hour').value;
        //recupera a descricao
        const description = e.target.querySelector('#description').value;

        const data: Appointment = {
            description: description,
            hour: hour,
            day: day,
            month: month,
            year: year
        }
        //verifica se o evento ja existe
        const checked = checkedEvent(data);

        if(checked === true) {
            alert('Evento já registrado, por favor selecione outro horário!');
        }
       
        try {
            API.post<Appointment>('/create-appointment', data).then((response) => {
                if(response.status === 200) {
                    alert('Compromisso cadastrado com sucesso!');
                    history.push('/');
                }
            }).catch(e => {
                alert('Ops, ocorreu algum erro.. :(')
                console.log('error: ', e);
            });
        } catch (e) {
            console.log('error: ', e);
        }
    }

    /**
     * metodo que verifica aexistencia de um evento
     * antes da inserção para evitar duplicata
     * @param data 
     * @returns boolean
     */
    function checkedEvent(data: Appointment): any {

        try {
            API.get<Appointment>(`/checked-appointment/${data.hour}/${data.day}/${data.month}/${data.year}`).then((response) => {
                if(response.data) {
                    return true;
                }
                if(response.data === false) {
                    return false;
                }
            }).catch(e => {
                alert('Ops, ocorreu algum erro.. :(')
                console.log('error: ', e);
            });
        } catch (e) {
            console.log('error: ', e);
        }
    }

    /**
     * Cria uma lista para seleção de horario e descrição
     * @returns {}
     */
    const List = () => {
        let formList = [];

        //se o valor for inferior a 10, acrescenta um 0 na frento do numero para apresentação das horas tipo 09:00
        let hour = null;
        for (let i = 1; i < 24; i++) {

            if (i < 10) {
                hour = (`0${i}`);
            } else {
                hour = i;
            }
            //insere o HTML dentro do aray
            formList.push(
                <form onSubmit={handleSubmit} className="form-add">
                    <label htmlFor="description" className="label-form-add" >{`${hour}:00`}</label>
                    <input type="hidden" id="hour" name="hour" value={i} />
                    <input className="input-form-add" type="text" name="description" id="description" placeholder="Descrição..." required />
                    <button className="bt-add" type="submit">ADD</button>
                </form>
            );
        }

        return <div>{formList}</div>
    }

    return (
        <div className="schedule_box">
            <Header />
            <div className="box-list">
                <List />
            </div>
        </div>
    );
}