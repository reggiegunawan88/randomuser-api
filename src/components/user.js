import * as React from "react";
import axios from "axios";

const { useState, useEffect } = React;

//API: https://randomuser.me/api/

const User = () => {
  const [counter, setCounter] = useState(0);
  const [userData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get(`https://randomuser.me/api?page=${pageNumber}`)
      .then(({ data }) => {
        const newData = [...userData, ...data.results];
        setPageNumber(pageNumber + 1);
        setUserData(newData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <h3>Write Your Code and Let The Magic Works!</h3>
      <p>User: {pageNumber - 1}</p>
      <button onClick={() => getUserData()}>Get Next User</button>
      <button onClick={() => setShowUser(!showUser)}>Show User</button>
      {showUser &&
        userData.map((data, idx) => (
          <div key={idx}>
            <p>
              {data.name.first} {data.name.last}
            </p>
            <img src={data.picture.large} />
          </div>
        ))}
    </div>
  );
};

export default User;
