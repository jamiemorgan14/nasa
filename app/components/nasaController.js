import NasaService from "./nasaService.js"

let _ns = new NasaService()

function drawApiPhotos() {
  let template = ''
  let photos = _ns.Photos
  photos.forEach(p => {
    template += p.getPhoto()
  })
  document.getElementById('show-photos').innerHTML = template
  document.getElementById('form').innerHTML = `
    <form onsubmit = "app.controllers.nasaController.changeSelection(event)" >
      <select name="rover">
        <option value="">Select A Rover</option>
        <option value="curiosity">Curiosity</option>
        <option value="opportunity">Opportunity</option>
        <option value="spirit">Spirit</option>
      </select>
  Date: <input type="date" name="date">
    <button type="submit">Go!</button>
        </form>`
}

//public
export default class NasaController {
  constructor() {
    _ns.addSubscriber('photos', drawApiPhotos);
    _ns.addSubscriber('selection', drawApiPhotos)

    //initialize data
    _ns.getNasaData()
    console.log(this.changeSelection)
  }
  changeSelection(event) {
    //change _state.selection based on form input
    event.preventDefault()
    let form = event.target
    let newRover = form.rover.value
    let newPhotoDate = form.date.value
    _ns.changeSelection(newRover, newPhotoDate)
  }
}