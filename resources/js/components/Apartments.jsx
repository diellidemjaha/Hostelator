import React from 'react';
import NavBar from './Navbar';
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Reservation from './Reservation';

function Apartments() {
    const [apartments, setApartments] = useState([])
    const [users, setUsers] = useState([])
    // const [error, setError] = useState(null);
    const [modal, setModal] = useState(false)
    const [dataToModal, setDataToModal] = useState([])

    useEffect(() => {
        async function fetchApartments() {
            try {
                // const userId = localStorage.getItem('user_id');
                const response = await axios.get(`/api/apartments-with-thumbnails`); // Replace with your API endpoint
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
            <div className="container justify-content-center align-items-center">
                {/* <div className="row">
                    <div className="col-sm-12">
                        <form className="d-flex justify-content-between align-items-center">
                            <div className="form-group">
                                <label className="sr-only" htmlFor="inlineFormInput">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    id="inlineFormInput"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Check in</label>
                                <input id="startDate" className="form-control" type="date" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Check out</label>
                                <input id="endDate" className="form-control" type="date" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mb-2">
                                    Find it!
                                </button>
                            </div>
                        </form>
                    </div>
                </div> */}

                {/* <div className="col-sm-4">
                    <aside>
                    <h2 className="text-center">Navigate to:</h2>
                    <ul>
                    <li>Apartments</li>
                    <li>Sign in</li>
                    <li>Register</li>
                    </ul>
                </aside> */}
            </div>

            <div className="d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-sm-9">

                        <main>
                            <h2>Explore these recommended locations</h2>
                            <p>some of the recent apartments that were added</p>
                            {users.map((el) => (
                                <div className="card m-2" key={el.id}>
                                    {/* <div className="card m-4"> */}
                                    <div className="card-body">
                                        <h5 className="card-title"> <Link to={`/SingleApartment/${el.id}`}>{el?.title}</Link></h5>
                                        <p className="card-text">
                                            {el?.description}<br />
                                            <p><b>Price:</b>{el?.price} €</p>
                                        </p>
                                        {localStorage.getItem("user_id") == null ?
                                            <Link to={`/SingleApartment/${el.id}`}><button className="btn btn-primary float-end">Book now</button></Link>
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
                            {/* <div className="card m-4">
                            <div className="card-body">
                            <h5 className="card-title">Apartment 2</h5>
                            <p className="card-text">
                            This is a wider card with supporting text below as a natural
                            lead-in to additional content. This content is a little bit
                            longer.
                            </p>
                            <button className="btn btn-primary float-end">Book now</button>
                            </div>
                            <img
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1"
                            className="card-img-bottom"
                            alt="..."
                            />
                        </div> */}
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Apartments;
