import Photo from "../models/photo.js";

;

// @ts-ignore
let _nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
})

// @ts-ignore
let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Jamie/heroes'
})

//variable controls for url
let rover = 'opportunity'
let photoDate = '2016-7-4';
let apiKey = '3brEv0bv6oVHZz3CULO5Q1z9vEPHPzh0fQdKKIXW';

let _state = {
  photos: []
};

let _subscribers = {
  photos: []
};

function setState(prop, data) {
  _state[prop] = data;
  _subscribers[prop].forEach(fn => fn());
}

//public
export default class NasaService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  };

  get Photos() {
    return _state.photos.map(p => new Photo(p))
  }


  getNasaData() {
    _nasaApi.get(`${rover}/photos?earth_date=${photoDate}&api_key=${apiKey}`)
      .then(res => {
        let data = res.data.photos.map(p => new Photo(p))
        setState('photos', data)
      })
      .catch(err => {
        console.error(err)
      })

  }

}