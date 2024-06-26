import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Reservation from "./Reservation";
import { Rating } from 'react-simple-star-rating'


function SingleApartment() {
  const { id } = useParams()
  const [apartments, setApartments] = useState([])
  const [imagePaths, setImagePaths] = useState([]);
  const [position, setPosition] = useState([42.6629, 21.1655]); 
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const [dataToModal, setDataToModal] = useState([])
  const [rating, setRating] = useState(0)
  const [averageRating, setAverageRating] = useState(0);


  const handleRating = rate => {
    setRating(rate);
    axios.post(`/api/apartments/ratings`, { rating: rate, apartment_id: id })
      .then(response => {
        console.log('Rating submitted successfully');
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
  };

  const getRatings = () => {
    axios.get(`/api/apartments/${id}/ratings`)
      .then(response => {
        setAverageRating(response.data.average_rating);
      })
      .catch(error => {
        console.error('Error fetching ratings:', error);
      });
      
     
  };

  const getApartments = () => {
    axios.get(`/api/user-apartments/${id}`).then(
      data => {
        setApartments(data?.data?.apartment);
      }
    );
  };

  const getApartmentImages = () => {
    axios.get(`/api/apartment_images/${id}`).then(
      (response) => {
        setImagePaths(response?.data?.images);
        console.log("response 1", response?.data.images)
      }
    );
  }

  const getApartmentLocation = () => {
    axios.get(`/api/user-apartments/${id}`)
      .then((response) => {
        setPosition([response.data?.apartment?.latitude, response.data?.apartment?.longitude]);
        
       
      })
      .catch((error) => {
        console.error('Error fetching location:', error);
      });
  }

  async function fetchUsers() {
    try {
        const response = await axios.get(`/api/user-names`);
        setUsers(response.data.names);
    } catch (error) {
        console.error('Error:', error);
    }
}
  
  useEffect(() => {
    getApartments();
    getApartmentImages();
    getApartmentLocation();
    fetchUsers();
    getRatings();
  }, [])
  function handleOpenModal(data) {
    setModal(true);
    setDataToModal(data)
  }
  console.log("aparamentet", apartments)
  console.log("Rating", averageRating)

  return (

    <>
    {modal == true ?
                <Reservation data={dataToModal} />
                :
                ''
            }
    <NavBar />
      <section style={{ backgroundColor: '#eee' }}>
        <center>

          <div className="container py-5">
            <div className="card mb-3">
              <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                  {imagePaths.map((path, index) => (
                    <div className="carousel-item active">
                      <img src={path?.imagePath} className="d-block w-100" alt={`Image ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h3 className="card-title">{apartments?.title}</h3>
                <p className="card-text">
                  {apartments?.description}
                </p>
              </div>
              <div id="map-container">

                <MapContainer
                  center={position}
                  zoom={13}
                  style={{ height: '400px', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} />
                </MapContainer>
              </div>
                
              <ul className="list-group">
                <li className="list-group-item">Price : {apartments?.price} €</li>
                <li className="list-group-item">Parking : {apartments?.parking == 1 ? "Yes" : "No"}</li>
                <li className="list-group-item">Wi-Fi : {apartments?.wi_fi == 1 ? "Yes" : "No"}</li>
                <li className="list-group-item">Breakfast : {apartments?.breakfast_included == 1 ? "Yes" : "No"}</li>
                <li className="list-group-item">
                  <div className="d-flex gap-2">
                    <div className="col-md-12 col-lg-6">
                    <div id="rating">
                        {averageRating.length > 0 ? (
                          <>
                            Average Rating: {averageRating}
                            <Rating
                              initialValue={averageRating}
                              size={20}
                              label
                            />
                          </>
                        ) : (
                          <>
                            Rate this Apartment:
                            <Rating
                              onClick={handleRating}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary float-end" onClick={() => handleOpenModal(apartments)}>Book now</button>
                  </li>
              </ul>
            </div>
          </div>
        </center>
      </section>
      <Footer />
    </>
  )
}
export default SingleApartment;
