import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UsersContext } from '../Context/UsersContext'
export default function Users() {
  const { LoadDataUsers, Users, dateRegistration } = useContext(UsersContext)


  useEffect(() => {
    LoadDataUsers()
  }, [])
  {
    console.log(Users);
  }
  return (
    <>
      <h1>All users</h1>
      {
        Users.length > 0
          ?
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Time Creation</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((u, index) => (
                <tr key={u._id}>
                  <th>{u.name}</th>
                  <th>{u.mail}</th>
                  <th>{u.date}</th>
                </tr>
              ))}

            </tbody>
          </table>
          :
          <h1>Empty</h1>
      }

    </>
  )
}
