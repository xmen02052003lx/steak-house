import express from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import checkObjectId from "../middleware/checkObjectId.js"
import multer from "multer"

const router = express.Router()
// Set up multer to store the uploaded files in the 'uploads' directory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const upload = multer({ dest: "uploads/" })

router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("image"), createProduct)
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview)
router.get("/top", getTopProducts)
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, upload.single("image"), updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct)

export default router
