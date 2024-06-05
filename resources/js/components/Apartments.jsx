import React from 'react';
import NavBar from './Navbar';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Reservation from './Reservation';

function Apartments() {
    const [apartments, setApartments] = useState([])
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    const [dataToModal, setDataToModal] = useState([])

    useEffect(() => {
        async function fetchApartments() {
            try {
                const response = await axios.get(`/api/apartments-with-thumbnails`); 
                setApartments(response.data);
            } catch (error) {
                console.error('Error fetching apartments:', error);
            }
        }
        async function fetchUsers() {
            try {
                const response = await axios.get(`/api/user-names`);
                setUsers(response.data.names);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchApartments();
        fetchUsers();
    }, []);
    console.log('users', users)

    function handleOpenModal(data) {
        setModal(true);
        setDataToModal(data)
    }

    return (
        <div>
            {modal == true ?
                <Reservation data={dataToModal} />
                :
                ''
            }

            <NavBar />
            <div className="d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-sm-9">

                        <main>
                            <h2>Explore these recommended locations</h2>
                            <p>some of the recent apartments that were added</p>
                            {users.map((el) => (
                                <div className="card m-2" key={el.id}>
                                    <div className="card-body">
                                        <h5 className="card-title"> <Link to={`/SingleApartment/${el.id}`}>{el?.title}</Link></h5>
                                        <p className="card-text">
                                            {el?.description}<br />
                                            <p><b>Price:</b>{el?.price} €</p>
                                        </p>
                                        {localStorage.getItem("user_id") == null ?
                                            <Link to={`/SingleApartment/${el?.id}`}><button className="btn btn-primary float-end">Book now</button></Link>
                                            :
                                            <button className="btn btn-primary float-end" onClick={() => handleOpenModal(el)}>Book now</button>
                                        }
                                    </div>
                                    <img
                                        src={el.first_image_path} alt={`Thumbnail for ${el.title}`}
                                        className="card-img-bottom"
                                    />

                                    <p class="card-text"><small class="text-muted">
                                        Posted by {el?.user?.name}
                                    </small></p>
                                </div>
                            ))}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Apartments;
