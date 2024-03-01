import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [user, setUser] = useState([]);
  const [bgChange, setBgChange] = useState(true);
  const [companyInfo, setCompanyInfo] = useState({});
  const [address, setAddress] = useState({});

  useEffect(() => {
    fetchapi();
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const fetchapi = async () => {
    const response = await axios.get('https://dummyjson.com/users');
    const randomIndex = Math.floor(Math.random() * response.data.users.length);
    const randomUser = response.data.users[randomIndex];
    setUser(randomUser);
    setBgChange(getRandomColor());
    setCompanyInfo({
      title: randomUser.company.title,
      name: randomUser.company.name
    });
    setAddress({
      city: randomUser.address.city,
      state: randomUser.address.state,
      street: randomUser.address.street
    });

  };

  const handleRefresh = async () => {
    await fetchapi();
    setBgChange(getRandomColor());
  };

  return (
    <>
      <h1 className='text-center text-fw-3'>Random User</h1>
      <div className='mt-3  border-rounded' style={{ backgroundColor: bgChange, marginLeft: "200px", padding: 20, width: "1000px" }}>
        <div className='d-flex me-5 justify-content-center'>
          <img src={user.image} alt="User profile" />
          <div className='p-5'>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {address.street}, {address.city}, {address.state}</p>
            <p>Age: {user.age}</p>
            <p>Company Name: {companyInfo.name}</p>
            <p>Job Title : {companyInfo.title}</p>
          
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <button style={{ backgroundColor: "green" }} onClick={handleRefresh}>Refresh</button>
        </div>
      </div>
    </>
  );
}

export default App;
