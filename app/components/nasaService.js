import Photo from "../models/photo.js";

// @ts-ignore
let _nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
})

// @ts-ignore
let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Jamie/heroes'
})

//variable controls for url

let apiKey = '3brEv0bv6oVHZz3CULO5Q1z9vEPHPzh0fQdKKIXW';
let today = new Date()
let year = today.getFullYear();
let mm = today.getMonth() + 1
let dd = today.getDate() - 7

let _state = {
  photos: [],
  selection: {
    rover: 'curiosity',
    photoDate: `${year}-${mm}-${dd}`
  }
};

let _subscribers = {
  photos: [],
  selection: []
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

  changeSelection(newRover, newPhotoDate) {
    //change _state.selection based on form input
    _state.selection.rover = newRover;
    _state.selection.photoDate = newPhotoDate
    this.getNasaData()
  }

  getNasaData() {
    _nasaApi.get(`${_state.selection.rover}/photos?earth_date=${_state.selection.photoDate}&api_key=${apiKey}`)
      .then(res => {
        let data = res.data.photos.map(p => new Photo(p))
        setState('photos', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  printInfo() {
    document.getElementById('show-date').innerHTML = `${_state.selection.rover.toUpperCase()}     ${_state.selection.photoDate.toUpperCase()}`
  }

}