import React, { useState, useEffect } from 'react';
import axios from 'axios';


function UserSection() {
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


    const [userId, setUserId] = useState(null);

    useEffect(() => {

        const userId = localStorage.getItem('user_id');
          console.log('id', userId);
        setUserId(userId);
    }, []);
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

        const formData = new FormData();
        formData.append('id', userId);
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
            const response = await axios.post(`/api/update-profile/1`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log(response);
                // Handle success
                console.log('Profile updated successfully:', response.data.message);
                // console.log(profileData.user_id);
                console.log('user-profile-info', response.data.user_id);
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





    return (
        <section className='d-flex justify-content-center' style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 text-center">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <form onSubmit={handleSubmit} method="PUT" encType="multipart/form-data">
                                    {editTrigger == true ?
                                        <>
                                            <label>Profile picture:</label>
                                            <input type="file" name="profile_pic" onChange={handleFileChange} />
                                        </>
                                        :
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle img-fluid"
                                            style={{ width: '150px' }}
                                        />
                                    }
                                    {editTrigger == true ?
                                        <>
                                            <input type="hidden" name="id" value={profileData.id} />
                                            <label>Full name:</label>
                                            <input className='form-control' type="text" name="full_name" id="" defaultValue={profileData.full_name} onChange={handleInputChange} />
                                            <label>Proffesion:</label>
                                            <input className='form-control' type="text" name="profession" id="" defaultValue={profileData.profession} onChange={handleInputChange} /><br />
                                            <label>Address:</label>
                                            <input className='form-control mb-4' type="text" name="address" id="" defaultValue={profileData.address} onChange={handleInputChange} />
                                        </>
                                        :
                                        <>
                                            <h5 className="my-3">Welcome, John Smith</h5>
                                            <p className="text-muted mb-1">Architect</p>
                                            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                        </>
                                    }
                                    <div className="d-flex justify-content-center mb-2">
                                        <button type="button" className="btn btn-primary">
                                            My Earnings
                                        </button>
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
                                            <input  type="text" className='form-control' defaultValue={profileData.website_link} onChange={handleInputChange}  name="website_link" id=''/>
                                            :
                                            <p className="mb-0">https://mdbootstrap.com</p>
                                        }
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                                        {editTrigger == true ?
                                            <input  defaultValue={profileData.twitter_link} onChange={handleInputChange} type="text" className='form-control' name="twitter_link" id="" />
                                            :
                                            <>
                                                <p className="mb-0">@mdbootstrap</p>
                                            </>
                                        }
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                                        {editTrigger == true ?
                                            <input  type="text"defaultValue={profileData.instagram_link} onChange={handleInputChange} className='form-control' name="instagram_link" id="" />
                                            :
                                            <p className="mb-0">mdbootstrap</p>
                                        }
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                                        {editTrigger == true ?
                                            <input  type="text" defaultValue={profileData.facebook_link} onChange={handleInputChange} className='form-control' name="facebook_link" id="" />
                                            :
                                            <p className="mb-0">mdbootstrap</p>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">A new reservation for your apartment from:</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p className="mb-0">Johnatan Smith</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <p className="btn btn-primary btn-sm">Approve</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <p className="btn btn-default btn-sm">Decline</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">A new reservation for your apartment:</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p className="mb-0">Johnatan Smith</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <p className="btn btn-primary btn-sm">Approve</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <p className="btn btn-default btn-sm">Decline</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <p className="mb-0">A new reservation for your apartment from:</p>
                                    </div>
                                    <div className="col-sm-4">
                                        <p className="mb-0">Johnatan Smith</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <p className="btn btn-primary btn-sm">Approve</p>
                                    </div>
                                    <div className="col-sm-2">
                                        <p className="btn btn-default btn-sm">Decline</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8 text-center mt-5">
                                <h2>Add an Apartment</h2>
                                <p>add a location for booking on our platform following the steps below</p>

                                <form action="" method="post" encType="multipart/form-data">
                                    <input className="form-control mb-1" type="text" placeholder="Apartment title" aria-label="default input example" />
                                    <input className="form-control mb-1" type="text" placeholder="Enter Location" aria-label="default input example" />
                                    <p>Price per Night:</p><input type="number" className="form-control mb-1" min="0" placeholder="50.00 $" step=".01" />
                                    <label htmlFor="formFile" className="form-label">Upload image of Apartment below</label>
                                    <input className="form-control mb-5" type="file" id="formFile" placeholder="Upload image" />
                                    <button className="btn btn-primary float-center">Add in Hostelator</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row">
                        <h2 className="mt-5 text-center">View your Apartments</h2>
                        <p className="text-center">list of all your apartments listed in Hostelator</p>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="card m-4" style={{ width: '18rem' }}>
                                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Apartment 1</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary float-end">View Listing</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="card m-4" style={{ width: '18rem' }}>
                                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Apartment 2</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary float-end">View Listing</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="card m-4" style={{ width: '18rem' }}>
                                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Apartment 3</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary float-end">View Listing</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="card m-4" style={{ width: '18rem' }}>
                                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/383834719.jpg?k=a8ed632aeaf2eb621e6753e941d4fb2f858005614b603cdef5bfe644ce1a1906&o=&hp=1" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Apartment 4</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" className="btn btn-primary float-end">View Listing</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserSection;
