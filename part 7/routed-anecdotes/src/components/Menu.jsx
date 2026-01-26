import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {
  const navigate = useNavigate()

  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="create" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
    </div>
  )
}

export default Menu
