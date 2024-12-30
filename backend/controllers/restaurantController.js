import asyncHandler from "../middleware/asyncHandler.js"
import Restaurant from "../models/restaurantModel.js"
import Table from "../models/tableModel.js"

// @desc update restaurant info
// @route PUT /api/restaurant
// @access Private/Admin
const updateRestaurantInfo = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    openTime,
    closeTime,
    description,
    tableCount,
    phone,
    email
  } = req.body

  // Extract the image from req.file if it exists
  let image = req.file
    ? {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype
      }
    : undefined

  const restaurant = await Restaurant.findOne({})

  if (restaurant) {
    restaurant.name = name
    restaurant.description = description
    restaurant.image = image || restaurant.image
    restaurant.address = address
    restaurant.openTime = openTime
    restaurant.closeTime = closeTime
    restaurant.tableCount = tableCount
    restaurant.phone = phone
    restaurant.email = email

    const updatedRestaurant = await restaurant.save()

    // Handle tables based on tableCount
    const existingTables = await Table.find({}) // Fetch all existing tables

    // If there are no existing tables, create all tables up to tableCount
    if (existingTables.length === 0) {
      const newTables = []
      for (let i = 0; i < tableCount; i++) {
        newTables.push({
          tableNumber: `Table ${i + 1}`,
          status: "available", // Default status
          isOccupied: "false" // Default is not occupied
        })
      }
      await Table.insertMany(newTables) // Bulk create new tables
    } else {
      // If tableCount increased, create more tables
      if (tableCount > existingTables.length) {
        const tablesToCreate = tableCount - existingTables.length
        const newTables = []
        for (let i = 0; i < tablesToCreate; i++) {
          newTables.push({
            tableNumber: `Table ${existingTables.length + i + 1}`,
            status: "available", // Default status, adjust as needed
            isOccupied: "false" // Default is not occupied
          })
        }
        await Table.insertMany(newTables) // Bulk create new tables
      }

      // If tableCount decreased, remove extra tables
      if (tableCount < existingTables.length) {
        const tablesToRemove = existingTables.length - tableCount
        const tablesToRemoveIds = existingTables
          .slice(-tablesToRemove)
          .map(t => t._id)
        await Table.deleteMany({ _id: { $in: tablesToRemoveIds } })
      }
    }

    res.json(updatedRestaurant)
  } else {
    res.status(404)
    throw new Error("Restaurant not found")
  }
})

// @desc get restaurant info
// @route GET /api/restaurant
// @access Private/Admin
const getRestaurantInfo = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findOne({})

  if (restaurant) {
    return res.json(restaurant)
  }

  res.status(404)
  throw new Error("Restaurant not found")
})

// @desc get all tables
// @route GET /api/restaurant/tables
// @access Private/Admin
const getTables = asyncHandler(async (req, res) => {
  const tables = await Table.find()

  if (tables) {
    return res.json(tables)
  }

  res.status(404)
  throw new Error("Tables not found")
})

// @desc    Get single table
// @route   GET /api/eatin/table/:id
// @access  Private/Admin
const getTableById = asyncHandler(async (req, res) => {
  const { id } = req.params

  const table = await Table.findById({ id })

  if (table) return res.json(table)
  res.status(404)
  throw new Error("Table not found")
})

export { getRestaurantInfo, getTableById, updateRestaurantInfo, getTables }
