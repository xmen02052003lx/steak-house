import asyncHandler from "../middleware/asyncHandler.js"
import Booking from "../models/bookingModel.js"
import Table from "../models/tableModel.js"

// @desc    Fetch all bookings
// @route   GET /api/eatin/booking
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
  res.json(bookings)
})

// @desc    Create new booking
// @route   POST /api/eatin/booking
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const { name, phone, email, date, time, numberOfGuests } = req.body

  const newBooking = new Booking({
    name,
    phone,
    email,
    date,
    time,
    numberOfGuests
  })

  await newBooking.save()
  res.status(201).json({
    message: `Bạn đã đặt bàn thành công! 
      Chúng tôi sẽ liên hệ với bạn trong giây lát`
  })
})

// @desc    checkin table
// @route   PUT /api/eatin/tables/:id
// @access  Private/Admin
const checkinTable = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Find the table by ID
  const table = await Table.findById(id)

  if (table) {
    // Update the table status and occupation state
    table.status = "unavailable"
    table.isOccupied = "true"

    await table.save() // Save the updated table document

    res.json({
      message: "Table checked in successfully",
      table
    })
  } else {
    res.status(404)
    throw new Error("Table not found")
  }
})

// @desc    uncheckin table
// @route   PUT /api/eatin/tables/:id
// @access  Private/Admin
const uncheckinTable = asyncHandler(async (req, res) => {
  const { id } = req.params

  // Find the table by ID
  const table = await Table.findById(id)

  if (table) {
    // Update the table status and occupation state
    table.status = "available"
    table.isOccupied = "false"

    await table.save() // Save the updated table document

    res.json({
      message: "Unchecked table successfully",
      table
    })
  } else {
    res.status(404)
    throw new Error("Table not found")
  }
})

export { createBooking, getBookings, checkinTable, uncheckinTable }
