import * as React from "react";
import axios from "axios";

const { useState, useEffect } = React;

//API: https://randomuser.me/api/

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [userDatas, setUserDatas] = useState([]);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    getNextUserData();
  }, []);

  const getNextUserData = () => {
    axios
      .get(`https://randomuser.me/api?page=${pageNumber}`)
      .then(({ data }) => {
        const newData = [...userDatas, ...data.results];
        setUserDatas(newData);
        setPageNumber(data.info.page + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <p>Page: {pageNumber - 1}</p>
      <div>
        <button onClick={() => getNextUserData()}>Get Next User</button>
        <br />
        <button onClick={() => setShowUser(!showUser)}>Show User List</button>
      </div>

      {showUser &&
        userDatas.map((data, idx) => {
          return (
            <div key={idx}>
              <p>
                {data.name.title} {data.name.first} {data.name.last}
              </p>
              <img src={data.picture.large} />
            </div>
          );
        })}
    </div>
  );
};

export default Home;
