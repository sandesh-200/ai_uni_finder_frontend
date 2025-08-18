import { decodeHtmlEntities } from '../utils/htmlDecoder'

const HtmlText = ({ children, className, ...props }) => {
  if (!children) return null
  
  const decodedText = decodeHtmlEntities(children)
  
  return (
    <span className={className} {...props}>
      {decodedText}
    </span>
  )
}

export default HtmlText 