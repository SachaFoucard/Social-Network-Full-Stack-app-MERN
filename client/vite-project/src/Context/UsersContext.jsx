import React, { createContext, useEffect, useState } from 'react'

export const UsersContext = createContext();

export default function UsersContextProvider({ children }) {
  // Define state variables for the user data and registration fields
  const [Users, setUsers] = useState([])
  const [mail, setmailReg] = useState()
  const [name, setnameReg] = useState()
  const [password, setpasswordReg] = useState()
  const [img, setImg] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState()
  const [letterProfil, setLetterprofil] = useState("")

  // Define state variables for the login fields
  const [mailLog, setmailLog] = useState()
  const [userNameLog, setnameLog] = useState()
  const [passwordLog, setpasswordLog] = useState()

  // Load the user data from the server when the component mounts
  const LoadDataUsers = async () => {
    let data = await fetch(`http://localhost:7000/api/users`)
    let res = await data.json()
    setUsers(res);
  }
  const catchTheFirstLetter = (name) => {
    if (typeof name === "string" && name.length > 0) {
      return name.charAt(0);
    } else {
      return null; // Return null for invalid inputs or empty strings
    }
  }
  function isValidEmail(mailLog) {
    // Regular expression pattern to validate email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(mailLog);
  }


  const dateRegistration = () => {
    const time = new Date()
    const date = time.getUTCDate()
    const month = time.getMonth() + 1
    const hours = time.getHours()
    const minutes = time.getMinutes()

    const dateNow = `${date}/${month} at ${hours}:${minutes}`;
    return dateNow.toString();
  }

  const isValidPassword = (password) => {
    // Check if the first letter is uppercase
    const firstLetterUppercase = /^[A-Z]/.test(password);

    // Check if the password has more than 8 characters
    const moreThan8Characters = password.length > 8;

    // Return true if both conditions are met, otherwise false
    return firstLetterUppercase && moreThan8Characters;
  }

  // Register a new user with the server
  const NewUser = (event) => {
    event.preventDefault();
    const date = dateRegistration()
    console.log(date);
    const user = {
      name,
      mail,
      password,
      img,
      description,
      date
    }
    if (!isValidEmail(mail)) { alert('your mail is not correct'); return false; }
    if (!isValidPassword(password)) { alert('your password need to has 8 characters min and one bigger letter as first') }
    else {
      // Send the registration data to the server and update the local state with the response
      fetch(`http://localhost:7000/api/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then((res) => res.json())
        .then(data => {
          // If the user does not already exist, add them to the local state
          if (SearchIfExist(user)) {
            setUsers((prev) => [...prev, user])
            setLetterprofil(catchTheFirstLetter(name));
          }
        })
    };
  }


  // Check if a user with the given email already exists
  const SearchIfExist = async (user) => {
    const existingUser = Users.find(u => u.mail === user.mail);
    if (existingUser) {
      alert('email already exists');
      return true;
    }
    else {
      alert('user registered successfuly !')
    }
    return false;
  }

  // Define the context value with all the state variables and functions
  const value = {
    dateRegistration,
    date,
    setDate,
    NewUser,
    img,
    setImg,
    Users,
    setUsers,
    password,
    setpasswordReg,
    setnameReg,
    name,
    mail,
    setmailReg,
    LoadDataUsers,
    SearchIfExist,
    mailLog,
    setmailLog,
    userNameLog,
    setnameLog,
    passwordLog,
    setpasswordLog,
    letterProfil
  }

  // Provide the context value to child components
  return (
    <UsersContext.Provider value={value}>
      {children}
    </UsersContext.Provider>
  )
}
