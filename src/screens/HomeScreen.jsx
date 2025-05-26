import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <div>
      <h1>Welcome to Velura</h1>
      <Link to="/stylists">View Stylists</Link>
    </div>
  );
}
