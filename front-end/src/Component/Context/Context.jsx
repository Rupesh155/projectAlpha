

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


const Context = createContext();

function ContextProvider({ children }) {
    const [courseData, setCourseData] = useState([]);
    const [activeTab, setActiveTab] = useState("Data Science");
    const [cart, setCart] = useState([]);
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]); 
    };

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/get-course');
                console.log(response,"resssssss");
                
                setCourseData(response.data); // Fetched data store karna
          
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovies();
    }, []);
    return (
        <Context.Provider value={{ courseData,activeTab,setActiveTab,cart,setCart,addToCart}}>
            {children}
         
        
        </Context.Provider>
    );
}

export { ContextProvider };
export default Context;
