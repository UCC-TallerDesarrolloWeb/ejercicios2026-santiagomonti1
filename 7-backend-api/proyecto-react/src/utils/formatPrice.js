// Formatea un número como precio en pesos argentinos: 35000 -> "$ 35.000"
const formatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export const formatPrice = (precio) => formatter.format(precio)
