import React from "react"
import { ReactNode, useContext } from "react"
import {Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"



interface RouteProps {
    children: ReactNode
   // redictTo:string
}

export function PrivateRoute({ children}: RouteProps) {
    const { isAutenticated } = useContext(AuthContext)


    return (
        <>
            {isAutenticated?children :<Navigate to="/"/>}
        </>
    )

}