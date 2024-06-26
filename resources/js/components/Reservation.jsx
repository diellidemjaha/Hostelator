import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, differenceInDays, startOfDay } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Reservation = (props) => {
    const navigate = useNavigate();
    const [allBooking, setAllBooking] = useState([]);
    const [numberOfDays, setNumberOfDays] = useState(0);
    const [minSelectableDate, setMinSelectableDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });

    const getReservations = () => {
        axios.get(`/api/reservations/owner/${props?.data?.user_id}`)
            .then(data => {
                console.log(data.data);
                setAllBooking(data.data.ownerReservations.filter(el => el?.apartment_id === props.data.id));
                const earliestDate = data.data.ownerReservations
                    .map(booking => new Date(booking.date_out))
                    .reduce((earliest, date) => (date < earliest ? date : earliest), new Date());

                setMinSelectableDate(startOfDay(earliestDate));
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getReservations();
    }, [props?.data?.id, props?.data?.id]);
    useEffect(() => {
        const days = differenceInDays(selectedDate.endDate, selectedDate.startDate);
        setNumberOfDays(days > 0 ? days : 0);


    }, [selectedDate, props.data.price]);


    console.log("props.data", props?.data)
    const handleReservation = (e) => {
        e.preventDefault();

        const startDate = format(selectedDate.startDate, 'yyyy-MM-dd');
        const endDate = format(selectedDate.endDate, 'yyyy-MM-dd');
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          };

        let payload = {
            user_id: localStorage.getItem('user_id'),
            apartment_id: props.data.id,
            owner_id: props?.data?.user?.id,
            status: 1,
            price: props.data.price,
            name: e.target.name.value,
            number: e.target.number.value,
            date_in: startDate,
            date_out: endDate
        };

        axios.post(`/api/reservations`, payload, {headers})
            .then(data => {
                // alert('Reservation success');
                Swal.fire("Apartment reservation sent!");
                getReservations();
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    };

    const reservedDates = allBooking.map(booking => {
        const start = new Date(booking.date_in);
        const end = new Date(booking.date_out);
        const dates = [];
        let current = start;

        while (current <= end) {
            dates.push(current);
            current = addDays(current, 1);
        }

        return dates;
    }).flat();

    return (
        <>
            <div className="darkbg"></div>
            <div className="modals">
                <div className="modal-header">
                    <h4 className="d-flex mx-auto">
                        Reservation for: {props?.data?.title}
                    </h4>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleReservation}>
                        <div className="col-12 mt-3">
                            <div className="row">
                                <div className="d-flex justify-content-center gap-2">
                                    <div className="col-5">
                                        <input className='form-control' type="text" name="name" placeholder="name" id="name" />
                                    </div>
                                    <div className="col-5">
                                        <input className='form-control' type="number" name="number" id="number" placeholder="phone number" />
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <DatePicker
                                    selected={selectedDate.startDate}
                                    onChange={(date) => setSelectedDate({ ...selectedDate, startDate: date })}
                                    selectsStart
                                    startDate={selectedDate.startDate}
                                    inline
                                    dateFormat="yyyy-MM-dd"
                                    minDate={minSelectableDate}
                                    excludeDates={reservedDates}
                                />
                                <DatePicker
                                    selected={selectedDate.endDate}
                                    onChange={(date) => setSelectedDate({ ...selectedDate, endDate: date })}
                                    selectsEnd
                                    endDate={selectedDate.endDate}
                                    inline
                                    dateFormat="yyyy-MM-dd"
                                    minDate={selectedDate.startDate}  
                                    excludeDates={reservedDates}
                                />
                            </div>
                            <div className="d-flex justify-content-center mt-2">
                                Total Price: <b>{numberOfDays * props.data.price} €</b>
                            </div>
                            <div className="d-flex justify-content-center mt-2">

                                Price per day:<b> {props.data.price} €</b>
                            </div>
                            <div className="d-flex justify-content-center mt-2">
                                <button className="btn btn-primary mt-2" type="submit">Book the Apartment</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Reservation;
