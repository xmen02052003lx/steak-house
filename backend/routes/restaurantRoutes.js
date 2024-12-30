import express from "express"
import {
  getRestaurantInfo,
  updateRestaurantInfo,
  getTables,
  getTableById
} from "../controllers/restaurantController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import checkObjectId from "../middleware/checkObjectId.js"
import multer from "multer"

const router = express.Router()
// Set up multer to store the uploaded files in the 'uploads' directory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router
  .route("/")
  .get(getRestaurantInfo)
  .put(protect, admin, updateRestaurantInfo)

router.route("/tables").get(protect, admin, getTables)
router.route("/tables/:id").get(protect, admin, getTableById)

export default router
