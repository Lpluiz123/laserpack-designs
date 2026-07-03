import deskLamp from './assets/luminaria.png'
import map3d from './assets/Mapa3D.png'
import vikingLongship from './assets/viking-longship.png'
import beerCaddy from './assets/beercaddy.png'
import butterflyClock from './assets/butterfly-clock.png'
import dollHouse from './assets/Dollhouse.png'

export const products = [
  { id: crypto.randomUUID(), title: "Modern Lamp V1", imageUrl: deskLamp},
  { id: crypto.randomUUID(), title: "3D Map", imageUrl: map3d},
  { id: crypto.randomUUID(), title: "Viking Longship Model", imageUrl: vikingLongship},
  { id: crypto.randomUUID(), title: "Butterfly Clock", imageUrl: butterflyClock},
  { id: crypto.randomUUID(), title: "Doll House", imageUrl: dollHouse},
  { id: crypto.randomUUID(), title: "Beer Canddy", imageUrl: beerCaddy},
];