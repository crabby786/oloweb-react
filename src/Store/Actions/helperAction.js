import {
  RestListApi,
  MerchantApi,
  BaseApi,
  RestDetailApi,
} from "../../Constants/DishCoApi";
import * as dishcoApi from "../../Constants/DishCoApi";
import { androidHeader } from "../../Constants/DishCoApi";
import axios from "axios";

export function getLocationAction() {
  var location = {
    latitude: null,
    longitude: null,
    error: null,
  };
  // let p = new Promise(function (resolve, reject) {
  function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    location = {
      latitude,
      longitude,
      error: null,
    };
    console.log("Latitude : " + latitude + " Longitude: " + longitude);
  }

  function errorHandler(err) {
    if (err.code == 1) {
      location = {
        ...location,
        error: "Access is denied!",
      };
    } else if (err.code == 2) {
      location = {
        ...location,
        error: "Position is unavailable!",
      };
    }
  }
  
  return new Promise( (resolve, reject)=> {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    } else {
      reject({
        message: "Sorry, browser does not support geolocation!",
      })
    }
  })
}
