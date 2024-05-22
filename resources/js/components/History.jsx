import React, { useState, useEffect } from 'react';
import axios from "axios";


function History() {
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        const HandleReservationDisplay = () => {
            try {
                axios.get(`/api/reservations/owner/${localStorage.getItem('user_id')}`).then(
                    data => {
                        setReservations(data.data.ownerReservations);
                    }
                ).catch(err => {
                    console.log(err)
                })
            } catch (error) {
                console.error('Error fetching apartment:', error);
            }
        }
        HandleReservationDisplay()
    }, []);

    return (
        <div className="container py-5 d-flex justify-content-center">
            <table class="table table-striped">
            <thead>
        <tr>
            <td>Name</td>
            <td>Dates</td>
            <td>Price</td>
            <td>Total</td>
            <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {reservations?.map((el) => {
                    const dateIn = new Date(el.date_in);
                    const dateOut = new Date(el.date_out);
                    const durationInDays = Math.floor((dateOut - dateIn) / (24 * 60 * 60 * 1000));

                    const totalPrice = el.price * durationInDays;

                    const statusText = {
                        1: 'Pending',
                        2: 'Approved',
                        3: 'Disapproved',
                    }[el.status];

                    return (
                        <tr key={el.id}>
                            <td><b>{el.name}</b></td>
                            <td>{el.date_in} / {el.date_out}</td>
                            <td>{el.price} €</td>
                            <td>{totalPrice} €</td>
                            <td><b>{statusText}</b></td>
                        </tr>
                    );
                })}                
                </tbody>
            </table>
        </div>
    )
}

export default History;