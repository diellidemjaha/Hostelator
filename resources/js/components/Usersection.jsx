import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import { useMapEvents } from 'react-leaflet';
// import History from './History';


function UserSection() {
    // Fetch user_id into local storage
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [position, setPosition] = useState([0, 0]);
    function SetMarker({ position, setPosition }) {
        const map = useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
            },
        });

        return position[0] !== 0 && position[1] !== 0 ? (
            <Marker position={position}>
                <Popup>Apartment Location</Popup>
            </Marker>
        ) : null;
    }

    // useEffect(() => {
    //     // Use a callback to set userId after retrieving it from local storage
    //     const userId = localStorage.getItem('user_id');
    //     console.log('user_id', userId);
    //     setUserId(userId);
    // }, []); // Empty dependency array ensures this runs only once

    //display user profile
    const fetchUserProfile = async () => {
        try {
            // const response = await axios.get(`/api/profile/${ localStorage.getItem('user_id')}`); // Replace with the correct API endpoint
            const response = await axios.get(`/api/profile`); // Replace with the correct API endpoint

            if (response.status === 200) {
                // const userData = response.data.user;

                setUserProfile(response.data.user);
                console.log(response.data.user)
                // setProfileData({
                //     profile_pic: userData?.profile_pic_path,
                //     full_name: userData?.full_name,
                //     profession: userData?.profession,
                //     website_link: userData?.website_link,
                //     twitter_link: userData?.twitter_link,
                //     instagram_link: userData?.instagram_link,
                //     facebook_link: userData?.facebook_link,
                // });

                //         }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            console.error('An error occurred while fetching the profile.');
        }
    };

    // Call the fetchUserProfile function when the component mounts
    useEffect(() => {
        fetchUserProfile();
    }, [])// Empty dependency array ensures the effect runs only once after mounting


    //Update profile code below
    const [editTrigger, setEditTrigger] = useState(false);
    const [profileData, setProfileData] = useState({
        full_name: '',
        profession: '',
        address: '',
        website_link: '',
        twitter_link: '',
        instagram_link: '',
        facebook_link: '',
        profile_pic: null,
    });


    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevProfileData) => ({
            ...prevProfileData,
            [name]: value,
        }));
    };

    // Function to handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileData({ ...profileData, profile_pic: file });
    };
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!userProfile) {
        //     // Handle the case when userProfile is null
        //     console.error('User profile is null.');

        //     return;
        // }


        const formData = new FormData();
        formData.append('id', userProfile?.profile?.id);
        // formData.append('user_id', 1);
        formData.append('full_name', profileData.full_name);
        formData.append('profession', profileData.profession);
        formData.append('address', profileData.address);
        formData.append('website_link', profileData?.website_link);
        formData.append('twitter_link', profileData.twitter_link);
        formData.append('instagram_link', profileData.instagram_link);
        formData.append('facebook_link', profileData.facebook_link);
        formData.append('profile_pic', profileData.profile_pic);


        try {
            const response = await axios.post(`/api/update-profile/${userProfile?.profile?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log(response);
                // Handle success
                // console.log('Profile updated successfully:', response.data.message);
                // // console.log(profileData.user_id);
                // console.log('user-profile-info', response.data.user_id);
                console.log('res', response);

                // Call fetchUserProfile to update the user profile data on the page
                fetchUserProfile();

            } else {
                // Handle other HTTP status codes
                console.error('Error updating profile:', response.status);
                console.error('Profile update failed. Please try again later.');
            }

            // Toggle the edit mode off
            setEditTrigger(false);

            // Handle other success actions as needed
        } catch (error) {
            // Handle network or other errors
            console.error('Error updating profile:', error);
            console.error('An error occurred while updating the profile.');
        }
    };
    const [apartments, setApartments] = useState([])
    const [reservations, setReservations] = useState([])
    const [booking, setBooking] = useState([])
    // const getApartments = () => {
    //     axios.get(`api/user-apartments/${localStorage.getItem('user_id')}`).then(
    //         data => {
    //             setApartments(data?.data?.apartments)
    //         }
    //     )
    // }
    // useEffect(() => {
    //     getApartments();
    // }, [])

    useEffect(() => {
        async function fetchApartments() {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await axios.get(`/api/apartments/${userId}`); // Replace with your API endpoint
                setApartments(response.data);
            } catch (error) {
                console.error('Error fetching apartments:', error);
            }
        }
        async function fetchOwnerReservations() {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await axios.get(`/api/reservations/owner/${userId}`); // Replace with your API endpoint
                setReservations(response?.data?.ownerReservations);
            } catch (error) {
                console.error('Error fetching apartments:', error);
            }
        }
        async function fetchUserReservations() {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await axios.get(`/api/reservations/user/${userId}`); // Replace with your API endpoint
                setBooking(response.data.reservations)
            } catch (error) {
                console.error('Error fetching apartments:', error);
            }
        }
        fetchUserReservations()
        fetchOwnerReservations()
        fetchApartments();
    }, []);

    // console.log("aparamentet", apartments)

    // const map = useMapEvents({
    //     click: (e) => {
    //       const { lat, lng } = e.latlng;
    //       setLatitude(lat);
    //       setLongitude(lng);
    //     },
    //   });

    console.log('reservations', booking)
    const handleAddApartment = async (e) => {
        e.preventDefault();
        const NewApartmentformData = new FormData();

        // Append data to formData
        NewApartmentformData.append('user_id', localStorage.getItem('user_id'));
        NewApartmentformData.append('latitude', position[0]);
        NewApartmentformData.append('longitude', position[1]);
        NewApartmentformData.append('title', e.target.title.value);
        NewApartmentformData.append('description', e.target.description.value);
        NewApartmentformData.append('price', e.target.price.value);
        NewApartmentformData.append('address', 'coming soon');
        NewApartmentformData.append('parking', e.target.parking.checked ? 1 : 0);
        NewApartmentformData.append('wi_fi', e.target.wi_fi.checked ? 1 : 0);
        NewApartmentformData.append('breakfast_included', e.target.breakfast.checked ? 1 : 0);

        // Append image files to formData
        NewApartmentformData.append('image1', e.target.image1.files[0]);
        NewApartmentformData.append('image2', e.target.image2.files[0]);
        NewApartmentformData.append('image3', e.target.image3.files[0]);
        NewApartmentformData.append('image4', e.target.image4.files[0]);

        try {
            const response = await axios.post('/api/apartments', NewApartmentformData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Apartment and Images uploaded successfully');
            } else {
                console.error('Error creating apartment:', response.status);
            }
        } catch (error) {
            console.error('Error creating apartment:', error);
        }
    };


    const handleReservation = (data,id) => {
        console.log(data,id)
        axios.put(`/api/reservations/${id}`,{status:data}).then(
            data => {
                console.log("data", data.data)
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    }


    return (
        <section className='d-flex justify-content-center' style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 text-center">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                                    {editTrigger == true ?
                                        <>
                                            <label>Profile picture:</label>
                                            <input type="file" name="profile_pic" onChange={handleFileChange} />
                                        </>
                                        :

                                        <img
                                            alt="avatar"
                                            src={`storage/${userProfile?.profile?.profile_pic_path}`}
                                            className="rounded-circle img-fluid"
                                            style={{ width: '150px' }}
                                        />
                                    }
                                    {editTrigger == true ?
                                        <>
                                            <label>Full name:</label>
                                            <input className='form-control' type="text" name="full_name" id="" defaultValue={profileData.full_name} onChange={handleInputChange} />
                                            <label>Profession:</label>
                                            <input className='form-control' type="text" name="profession" id="" defaultValue={profileData.profession} onChange={handleInputChange} /><br />
                                            <label>Address:</label>
                                            <input className='form-control mb-4' type="text" name="address" id="" defaultValue={profileData.address} onChange={handleInputChange} />
                                        </>
                                        :
                                        <>
                                            <h5 className="my-3">Welcome, {userProfile?.profile.full_name}</h5>
                                            <p className="text-muted mb-1">{userProfile?.profile?.profession}</p>
                                            <p className="text-muted mb-4">{userProfile?.profile?.address}</p>
                                        </>
                                    }
                                    <div className="d-flex justify-content-center mb-2">
                                       <Link to="/History">
                                        <button type="button" className="btn btn-primary">
                                            My Earnings
                                        </button>
                                        </Link> 
                                        {editTrigger == false ?

                                            <button onClick={() => setEditTrigger(!editTrigger)} type="button" className="btn btn-outline-primary ms-1">
                                                Edit Profile
                                            </button>
                                            :
                                            <>
                                                <button type="submit" className="btn btn-outline-success ms-1">
                                                    Save
                                                </button>
                                                <button onClick={() => setEditTrigger(!editTrigger)} type="button" className="btn btn-outline-danger ms-1">
                                                    Cancel
                                                </button>
                                            </>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa fa-globe fa-lg text-warning"></i>
                                        {editTrigger == true ?
                                            <input type="url" className='form-control' defaultValue={profileData.website_link} onChange={handleInputChange} name="website_link" id='' />
                                            :
                                            <p className="mb-0">{userProfile?.profile?.website_link}</p>
                                        }
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                                        {editTrigger == true ?
                                            <input defaultValue={profileData.twitter_link} onChange={handleInputChange} type="url" className='form-control' name="twitter_link" id="" />
                                            :
                                            <>
                                                <p className="mb-0">{userProfile?.profile?.twitter_link}</p>
                                            </>
                                        }
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                                        {editTrigger == true ?
                                            <input type="url" defaultValue={profileData.instagram_link} onChange={handleInputChange} className='form-control' name="instagram_link" id="" />
                                            :
                                            <p className="mb-0">{userProfile?.profile?.instagram_link}</p>
                                        }
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                                        {editTrigger == true ?
                                            <input type="url" defaultValue={profileData.facebook_link} onChange={handleInputChange} className='form-control' name="facebook_link" id="" />
                                            :
                                            <p className="mb-0">{userProfile?.profile?.facebook_link}</p>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <h2 className="mt-5 text-center">View your Apartments Reservations</h2>
                            <p className="text-center">list of new reservations in Hostelator</p>
                            <div className="card-body">
                                {reservations?.map(el => {
                                    return (
                                        <>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <p className="mb-0">A new reservation</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <p className="mb-0">{el?.name}</p>
                                                </div>
                                                <div className="col-sm-2">
                                                    <p className="btn btn-success btn-sm" onClick={()=> handleReservation(2 , el?.apartment_id)}>Approve</p>
                                                </div>
                                                <div className="col-sm-2">
                                                    <p className="btn btn-danger btn-sm" onClick={()=> handleReservation(3 , el?.apartment_id)}>Decline</p>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="card mb-4">
                            <h2 className="mt-5 text-center">View your Bookings</h2>
                            <p className="text-center">list of your bookings in Hostelator</p>
                            <div className="card-body">
                                {booking?.map(el => {
                                    return (
                                        <>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <p className="mb-0">A new reservation</p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <p className="mb-0">{el?.name}</p>
                                                </div>
                                                <div className="col-sm-3">
                                                    {el.status == 1 ? <p className='text-muted'>Pending</p> : el.status == 2 ? <p className='text-success'>Approved</p> : <p className='text-danger'>Canceled</p>}
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="col-sm-9 text-center mt-8">
                            <h2>Add an Apartment</h2>
                            <p>add a location for booking on our platform following the steps below</p>

                            <form onSubmit={handleAddApartment} encType="multipart/form-data">
                                <div className="col">
                                    <MapContainer
                                        center={[42.6629, 21.1655]}
                                        zoom={13}
                                        style={{ height: '400px', width: '100%' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <SetMarker position={position} setPosition={setPosition} />
                                    </MapContainer>

                                </div>

                                <input className="form-control mb-1" name='title' id='title' type="text" placeholder="Apartment title" aria-label="default input example" required />
                                <textarea required className="form-control mb-1" name='description' id='description' type="text" placeholder="Type the description" aria-label="default input example" />
                                <p>Price per Night:</p>
                                <input required type="number" name='price' id='price' className="form-control mb-1" min="0" placeholder="50.00" step="0.01" />

                                <label htmlFor="formFile" className="form-label">Upload image of Apartment below</label>
                                <div class="container">
                                    <div className="card">
                                        <div class="row gap-2">
                                            <div class="col">
                                                <input required className="form-control mb-1" type="file" name="image1" id="image1" placeholder="Upload image" />
                                            </div>
                                            <div class="col">
                                                <input className="form-control mb-1" type="file" name='image2' id="image2" placeholder="Upload image" />
                                            </div>
                                            <div class="w-100"></div>
                                            <div class="col">
                                                <input className="form-control mb-1" type="file" name='image3' id="image3" placeholder="Upload image" />
                                            </div>
                                            <div class="col">
                                                <input className="form-control mb-1" type="file" name='image4' id="image4" placeholder="Upload image" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" name='parking' id='parking'></input>
                                    <label className="form-check-label" htmlFor="flexCheckParking">
                                        Parking available
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" name='wi_fi' id='wi_fi'></input>
                                    <label className="form-check-label" htmlFor="flexCheckWiFi">
                                        Wi-Fi included
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" name='breakfast' id='breakfast'></input>
                                    <label className="form-check-label" htmlFor="flexCheckBreakfast">
                                        Breakfast included
                                    </label>
                                </div>

                                <button className="btn btn-primary float-center" type="submit">
                                    Add in Hostelator
                                </button>
                            </form>

                        </div>
                    </div>


                    <div className="container">
                        <div className="row">
                            <h2 className="mt-5 text-center">View your Apartments</h2>
                            <p className="text-center">list of all your apartments listed in Hostelator</p>
                            {apartments.map((el) => (
                                <div className="col-12 col-md-6 col-lg-4" key={el.id}>
                                    <div className="card m-4" style={{ width: '18rem' }}>
                                        <img src={el.first_image_path} alt={`Thumbnail for ${el.title}`} className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{el.title}</h5>
                                            <p className="card-text">{el.price} €</p>
                                            <Link to={`/UpdateApartment/${el?.id}`} className="btn btn-primary float-end">View Listing</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default UserSection;
