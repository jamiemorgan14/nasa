import NasaController from "./components/nasaController.js"

class App {
  constructor() {
    this.controllers = {
      nasaController: new NasaController()
    }
  }
}

window['app'] = new App()