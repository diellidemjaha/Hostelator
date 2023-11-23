import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useMapEvents } from 'react-leaflet';

function UpdateApartment() {
    const { apartmentId } = useParams();
    const navigate = useNavigate();
    const [showButtonsIndex, setShowButtonsIndex] = useState(null);
    const [images, setImages] = useState(Array(4).fill(null));
    const [position, setPosition] = useState([42.6629, 21.1655]);
    const [apartment, setApartment] = useState({
        title: '',
        description: '',
        price: '',
        parking: '',
        wi_fi: '',
        breakfast_included: '',
    });

    console.log('images', images)

    const handleCheckboxChange = (e) => {
        const checkboxName = e.target.name;
        const checkboxValue = e.target.checked;

        setApartment((prevApartment) => ({
            ...prevApartment,
            [checkboxName]: checkboxValue ? 1 : 0,
        }));
    };

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

    useEffect(() => {
        async function fetchApartment() {
            try {
                const response = await axios.get(`/api/single-apartment/${apartmentId}`);
                console.log('Fetched Apartment Data:', response.data);
                setApartment(response.data);
                setPosition([response.data.latitude, response.data.longitude]);
            } catch (error) {
                console.error('Error fetching apartment:', error);
            }
        }
        async function fetchApartmentImages() {
            try {
                const response = await axios.get(`/api/apartment_images/${apartmentId}/`);
                setImages(response?.data?.images);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchApartment();
        fetchApartmentImages();
    }, [apartmentId]);

    const handleUpdateApartment = async (e) => {
        e.preventDefault();

        const updatedApartmentData = new FormData();

        let payload = {
            user_id: localStorage.getItem('user_id'),
            latitude: position[0],
            longitude: position[1],
            title: e.target.elements.title.value,
            description: e.target.elements.description.value,
            price: e.target.elements.price.value,
            parking: e.target.elements.parking.checked ? 1 : 0,
            wi_fi: e.target.elements.wi_fi.checked ? 1 : 0,
            breakfast_included: e.target.elements.breakfast.checked ? 1 : 0
        }

        for (let i = 1; i <= 4; i++) {
            const fileInput = document.querySelector(`#image${i}`);
        
            if (fileInput && fileInput.files.length > 0) {
                updatedApartmentData.append(`image${i}`, fileInput.files[0]);
            }
        }

        console.log('Updated Apartment Data:', updatedApartmentData);

        try {
            const response = await axios.put(`/api/update/apartments/${apartmentId}`, payload);
            if (response.status === 200) {
                axios.post(`/api/update/apartment-image/${apartmentId}`, updatedApartmentData).then(
                    data => {
                        alert('Apartment and Images updated successfully');
                        navigate('/');
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
            } else {
                console.error('Error updating apartment:', response.status);
            }
        } catch (error) {
            console.error('Error updating apartment:', error);
        }
    };



    const handleDeleteApartment = async () => {
        try {
            const response = await axios.delete(`/api/delete/apartments/${apartmentId}`);

            if (response.status === 200) {
                alert('Apartment deleted successfully');
                navigate('/');
            } else {
                console.error('Error deleting apartment:', response.status);
            }
        } catch (error) {
            console.error('Error deleting apartment:', error);
        }
    };

    const handleDeleteImage = (id) => {
        axios.delete(`/api/delete/apartment-image/${id}`).then(
            data => {
                window.location.href = `/UpdateApartment/${apartmentId}`
            }
        ).catch(
            err => {
                console.log(err)
            }
        )
    };

    const handleCancelDelete = () => {
        setShowButtonsIndex(null);
    };



    return (
        <div className="col-sm-9 text-center mt-8">
            <h2>Update Apartment</h2>
            <p>Update the location for booking on our platform following the steps below</p>
            <form onSubmit={handleUpdateApartment} encType="multipart/form-data">
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
                {/* <input type="hidden" name="user_id" value={localStorage.getItem('user_id')} /> */}
                <input
                    className="form-control mb-1"
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Apartment title"
                    defaultValue={apartment?.title}
                    required
                />
                <textarea
                    required
                    className="form-control mb-1"
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Type the description"
                    defaultValue={apartment?.description}
                />
                <p>Price per Night:</p>
                <input
                    required
                    type="number"
                    name="price"
                    id="price"
                    className="form-control mb-1"
                    placeholder="50.00"
                    defaultValue={apartment?.price}
                />
                <label htmlFor="formFile" className="form-label">Update images of Apartment below</label>
                <div className="container">
                    <div className="card">
                        <div className="row gap-2">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="col">
                                    {index < images.length && images[index] ? (
                                        <div className="image-container">
                                            <img
                                                className="w-25"
                                                src={images[index].imagePath}
                                                alt={`Image ${index + 1}`}
                                                onClick={() => setShowButtonsIndex(index)}
                                            />
                                            {showButtonsIndex === index && (
                                                <div className="buttons-container">
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteImage(images[index].id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={handleCancelDelete}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <input
                                            className="form-control mb-1"
                                            type="file"
                                            name={`image${index + 1}`}
                                            id={`image${index + 1}`}
                                            placeholder="Upload image"
                                        />
                                    )}
                                </div>
                            ))}
                            {/* <div className="col">

                                <input className="form-control mb-1" type="file" name="image1" id="image1" placeholder="Upload image" />
                            </div>
                            <div className="col">
                                <input className="form-control mb-1" type="file" name='image2' id="image2" placeholder="Upload image" />
                            </div>
                            <div className="w-100"></div>
                            <div className="col">
                                <input className="form-control mb-1" type="file" name='image3' id="image3" placeholder="Upload image" />
                            </div>
                            <div className="col">
                                <input className="form-control mb-1" type="file" name='image4' id="image4" placeholder="Upload image" />
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="parking"
                        id="parking"
                        checked={apartment?.parking == 1 ? true : false}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="flexCheckParking">
                        Parking available
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="wi_fi"
                        id="wi_fi"
                        checked={apartment?.wi_fi == 1 ? true : false}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="flexCheckWiFi">
                        Wi-Fi included
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="breakfast_included"
                        id="breakfast"
                        checked={apartment?.breakfast_included == 1 ? true : false}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="flexCheckBreakfast">
                        Breakfast included
                    </label>
                </div>

                <button className="btn btn-primary float-center m-2" type="submit">
                    Update Apartment
                </button>
                <button className="btn btn-danger m-2" onClick={handleDeleteApartment}>
                    Delete Apartment
                </button>
            </form>
        </div>
    );
}

export default UpdateApartment;
