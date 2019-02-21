export default class Photo {
  constructor(data) {
    this.img = data.img || data.img_src
    this.date = data.date || data.earth_date
    this.name = data.name || data.rover.name
  }
  getPhoto() {
    return `
    <div class="col-12 col-md-2">
      <div class="card text-center my-card">
        <a target="_blank" href=${this.img}><img class="card-img-top my-img" src="${this.img}" alt="Card image cap"><a>
          <div class="card-body">
            <h5 class="card-title">${this.date}</h5>
            <p class="card-text">${this.name}</p>
          </div>
        </div>
      </div>`
  }
}