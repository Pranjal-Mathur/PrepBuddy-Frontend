import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Protected = ({children}) => {
    const {isLoading, user} = useAuth();

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!user){
        return <Navigate to="/login" />
    }

  return (
    <div>{children}</div>
  )
}

export default Protected