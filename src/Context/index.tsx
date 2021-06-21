import React, { useState } from 'react'
import { createContext } from 'react'
import { View, Text } from 'react-native'

export const NavbarContext = createContext()

const Context = (props) => {

    const [sildeNav, setSildeNav] = useState(false);
    const [cart, setCart] = useState([])
    const [data, setdata] = useState([{loading: true}]);
    const [Auth, setAuth] = useState([]);
    return (
         <NavbarContext.Provider value={{sildeNav, setSildeNav,data, setdata, cart, setCart,Auth, setAuth}} >
          {props.children}
         </NavbarContext.Provider>
    )
}

export default Context
