export const addDecimals = num => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = state => {
  //   Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  //   Calculate shipping price (if order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10)

  //   Calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number(0.1 * state.itemsPrice))

  //   Calculate total price
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  // Our redux state almost always match up with our local Storage
  localStorage.setItem("cart", JSON.stringify(state))

  return state
}
