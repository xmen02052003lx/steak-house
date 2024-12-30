import mongoose from "mongoose"

const reviewSchema = mongoose.Schema(
  // This is what a single review should look like.
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    // image: {
    //   type: String,
    //   required: true
    // },
    image: {
      data: String,
      contentType: String
    },

    category: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    reviews: [reviewSchema], // reviewSchema is what a single review should look like. And This is an Array of reviews and each review looks like reviewSchema
    rating: {
      type: Number,
      required: true,
      default: 0
    }, // the average rating of all the review.rating
    numReviews: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Product", productSchema)

export default Product
