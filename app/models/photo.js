export default class Photo {
  constructor(data) {
    this.img = data.img || data.img_src
    this.date = data.date || data.earth_date
    this.name = data.name || data.rover.name
  }
  getPhoto() {
    return `
    <div class="col-6">
      <div class="card">
        <img class="card-img-top" src="${this.img}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${this.date}</h5>
            <p class="card-text">${this.name}</p>
          </div>
        </div>
      </div>`
  }
}