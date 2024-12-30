import express from "express"
import {
  createBooking,
  getBookings,
  checkinTable,
  uncheckinTable
} from "../controllers/eatInController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import checkObjectId from "../middleware/checkObjectId.js"

const router = express.Router()

router.route("/booking").post(createBooking).get(getBookings)
router.route("/tables/:id").put(protect, admin, checkinTable)
router.route("/tables/uncheckin/:id").put(protect, admin, uncheckinTable)

export default router
