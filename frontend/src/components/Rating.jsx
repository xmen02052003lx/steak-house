import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const Rating = ({ value, text, color = "#f8e825" }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <FaStar color={color} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>{" "}
      <span>
        {value >= 2 ? (
          <FaStar color={color} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>{" "}
      <span>
        {value >= 3 ? (
          <FaStar color={color} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>{" "}
      <span>
        {value >= 4 ? (
          <FaStar color={color} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>{" "}
      <span>
        {value >= 5 ? (
          <FaStar color={color} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>
      {/* text ? text : null === text && text */}
      <span className="rating-text">{text && text}</span>
    </div>
  )
}
export default Rating
