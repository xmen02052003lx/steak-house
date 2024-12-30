import mongoose from "mongoose"

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: String
  },
  status: {
    type: String
  },
  checkinUrl: {
    type: String
  },
  qrCode: {
    type: String
  },
  isOccupied: {
    type: String
  }
})

const Table = mongoose.model("Table", tableSchema)

export default Table
