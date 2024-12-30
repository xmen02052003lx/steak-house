import { Helmet } from "react-helmet-async"
const Meta = ({
  title = "Welcome To My Restaurant",
  description = "We sell the best food for cheap",
  keywords = "steak, buy food, cheap food"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  )
}

export default Meta
