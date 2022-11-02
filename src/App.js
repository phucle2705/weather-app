import React, { useEffect, useState } from 'react'

const api = {
    key: "63f206ee92f4cdfb725838ca7facd52c",
    base: "https://api.openweathermap.org/data/2.5/",
}

function App() {
    const [searchInput, setSearchInput] = useState("")
    const [searchCity, setSearchCity] = useState("")
    const [weatherInfo, setWeatherInfo] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (!searchCity) return;
            setLoading(true);
            // Process
            try {
                const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setWeatherInfo(
                        `Today at ${data.name}: ${data.weather[0].description}, ${data.main.temp}`
                    );
                    setErrorMessage("")
                } else {
                    setErrorMessage(data.message)
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
            setLoading(false);
        }
        fetchWeatherData();
    }, [searchCity])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    placeholder='City' 
                    value={searchInput} 
                    onChange={(e) => setSearchInput(e.target.value)} 
                />
                <button type='submit'>Search</button>
            </form>
            {loading ? (
                <div>Loading</div>
            ) : (
                <>
                    {errorMessage ? (
                        <div style={{color: "red"}}>{errorMessage}</div>
                    ) : (
                        <div>{weatherInfo}</div>
                    )}
                </>
            )}
        </div>
    )
}

export default App