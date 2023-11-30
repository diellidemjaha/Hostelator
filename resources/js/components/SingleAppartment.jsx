import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import NavBar from "./Navbar";
import Footer from "./Footer";
import Reservation from "./Reservation";


function SingleApartment() {
  const { id } = useParams()
  const [apartments, setApartments] = useState([])
  const [imagePaths, setImagePaths] = useState([]);
  const [position, setPosition] = useState([42.6629, 21.1655]); 
  const [modal, setModal] = useState(false)
  const [users, setUsers] = useState([])
  const [dataToModal, setDataToModal] = useState([])

  const getApartments = () => {
    axios.get(`/api/user-apartments/${localStorage.getItem('user_id')}/${id}`).then(
      data => {
        setApartments(data?.data?.apartment)
      }
      )
    }

  const getApartmentImages = () => {
    // Use the correct parameter names: id and user_id
    axios.get(`/api/apartment_images/${id}`).then(
      (response) => {
        setImagePaths(response?.data?.images);
        console.log("response 1", response?.data.images)
      }
    );
  }

  const getApartmentLocation = () => {
    axios.get(`/api/user-apartments/${localStorage.getItem('user_id')}/${id}`)
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
  }, [])
  function handleOpenModal(data) {
    setModal(true);
    setDataToModal(data) }
  // console.log("aparamentet", apartments)
  // console.log("id", id)

  // console.log("dion",position)
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
                <p className="card-text">
                  <small className="text-muted">from {apartments?.user_id}</small>
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

                {/* <iframe
              style={{ width: '100%', height: '300px' }}
              src="https://maps.google.com/maps?q=prishtina&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              allowFullScreen
              ></iframe> */}
              </div>
              <ul className="list-group">
                {/* <li className="list-group-item">Address : {apartments?.address}</li> */}
                <li className="list-group-item">Price : {apartments?.price} €</li>
                <li className="list-group-item">Parking : {apartments?.parking == 1 ? "Yes" : "No"}</li>
                <li className="list-group-item">Wi-Fi : {apartments?.wi_fi == 1 ? "Yes" : "No"}</li>
                <li className="list-group-item">Breakfast : {apartments?.breakfast_included == 1 ? "Yes" : "No"}</li>
                <li className="list-group-item">
                  <div className="d-flex gap-2">
                    <div className="col-md-12 col-lg-6">
                      <div id="calendar"></div>
                    </div>
                  </div>
                  {/* <button className="btn btn-md btn-primary float-end">Book Now !</button> */}
                  {/* {users.map((el) => ( */}
                  {/* <button className="btn btn-primary float-end" onClick={() => handleOpenModal(el)}>Book now</button> */}
                  <button className="btn btn-primary float-end" onClick={() => handleOpenModal(users[0])}>Book now</button>
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