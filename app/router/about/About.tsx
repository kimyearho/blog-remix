import { useParams } from '@remix-run/react';

const About = () => {
  const params = useParams();
  return <div>게시글 ID: {params.id}</div>;
}

export default About