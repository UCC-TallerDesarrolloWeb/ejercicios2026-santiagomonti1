// Imágenes en src/assets: se IMPORTAN y Vite las procesa al compilar
// (les agrega un hash al nombre y las incluye en el build)
import zumba from '@assets/home/zumba.jpg'
import funcional from '@assets/home/funcional.jpg'

// Imágenes en public: NO se importan, se usan con una ruta absoluta desde la raíz ("/")
export const actividadesHome = [
  { titulo: 'Taekwondo', imagen: '/home/taekwondo.jpg' }, // public/home
  { titulo: 'Yoga', imagen: '/home/yoga.webp' },          // public/home
  { titulo: 'Zumba', imagen: zumba },                     // src/assets/home
  { titulo: 'Funcional', imagen: funcional },             // src/assets/home
]
