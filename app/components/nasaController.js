import NasaService from "./nasaService.js"

let _ns = new NasaService()

function drawApiPhotos() {
  let template = ''
  let photos = _ns.Photos
  photos.forEach(p => {
    template += p.getPhoto()
  })
  document.getElementById('show-photos').innerHTML = template
}

//public
export default class NasaController {
  constructor() {
    _ns.addSubscriber('photos', drawApiPhotos);
    _ns.addSubscriber('selection', drawApiPhotos)

    //initialize data
    _ns.getNasaData()
  }

}