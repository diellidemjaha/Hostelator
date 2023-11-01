import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

function SingleApartment(){
    const {id} = useParams() 
    const [apartments, setApartments] = useState([])
    const getApartments = () => {
        axios.get(`/user-apartments/${localStorage.getItem('user_id')}/${id}`).then(
            data => {
                setApartments(data?.data?.apartment)
            }
        )
    }
    useEffect(() => {
        getApartments();
    }, [])
    console.log("aparamentet", apartments)
    console.log("id", id)
return(
    <>
    
      <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="card mb-3">
          <div id="carouselExampleFade" className="carousel slide carousel-fade">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://avalonbay-avalon-communities-prod.cdn.arcpublishing.com/resizer/aX_7AaYdc6ONIwICoHPy9U-z48g=/715x486/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/4W4DB7GWMJC5XAIZD6GGARELBE.jpg"
                  className="d-block w-100"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://avalonbay-avalon-communities-prod/cdn.arcpublishing.com/resizer/BelFRzC0K9G-ycJI_0r22m9VPGk=/715x486/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/AUGCFBLR7JBQNB3WFCDE2QVURU.jpg"
                  className="d-block w-100"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://avalonbay-avalon-communities-prod.cdn.arcpublishing.com/resizer/_7ZGVNUBpQWZ8_IOTMXd-FctV3w=/715x486/filters:quality(85)/cloudfront-us-east-1.images.arcpublishing.com/avalonbay/LW57GMIJEVGGTBXGKYWWS6TGHI.jpg"
                  className="d-block w-100"
                />
              </div>
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
          <div id="map-container-google-1">
            <iframe
              style={{ width: '100%', height: '300px' }}
              src="https://maps.google.com/maps?q=prishtina&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          <ul className="list-group">
            <li className="list-group-item">Address : {apartments?.address}</li>
            <li className="list-group-item">Price : {apartments?.price}$</li>
            <li className="list-group-item">Parking : {apartments?.parking ==1 ? "Yes" : "No"}</li>
            <li className="list-group-item">Wi-Fi : {apartments?.wi_fi == 1 ? "Yes" : "No"}</li>
            <li className="list-group-item">Breakfast : {apartments?.breakfast_included == 1 ? "Yes" : "No"}</li>
            <li className="list-group-item">
              <div className="d-flex gap-2">
                <div className="col-md-12 col-lg-6">
                  <div id="calendar"></div>
                </div>
              </div>
              <button className="btn btn-md btn-primary float-end">Book Now !</button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </>
)
}
export default SingleApartment;