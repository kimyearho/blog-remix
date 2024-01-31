import { Link } from '@remix-run/react';

const MovieList = () => {
  return <><ul>
    <li>
      <Link to="/movie/detail/1">게시글 1</Link>
    </li>
    <li>
      <Link to="/movie/detail/2">게시글 2</Link>
    </li>
    <li>
      <Link to="/movie/detail/3">게시글 3</Link>
    </li>
  </ul></>
}

export default MovieList
