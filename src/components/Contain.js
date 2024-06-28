import React, { useState } from 'react';


export default function Contain(props) {
    const [weather, setWeather] = useState(null);
    const [state, setState] = useState('');

    const handleOnChange = (event) => {
        setState(event.target.value);
    };

    const handleWeather = async (event) => {
        event.preventDefault();
        const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${state}&format=json&u=f`;
        props.setProgress(0)
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '25b905f292msh02b1fbca3beab88p106f1cjsna56016c0756f',
                'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
            }
        };
        props.setProgress(30)
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setWeather(result);
            props.setProgress(50)
        } catch (error) {
            console.error(error);
        }
        props.setProgress(100)
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Weather for {weather && weather.location.city}</h1>
            <form onSubmit={handleWeather} className="text-center">
                <div className="mb-3 d-inline-flex align-items-center">
                    <label htmlFor="exampleInputPassword1" className="form-label me-2">Enter Location Here</label>
                    <input type="text" className="form-control form-control-sm me-2" id="exampleInputPassword1" value={state} onChange={handleOnChange} style={{ width: '200px' }} placeholder='Enter the loaction' />
                    <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                </div>
            </form>

            {weather && (
                <div className="row justify-content-center mt-5">
                    <div className="col">
                        <div className="card text-center mb-3" style={{ width: "20rem", borderRadius: "10%", padding: "1em" }}>
                            <div className="card-body">
                                <h5 className="card-title border-bottom pb-2">Temperature</h5>
                                <h2 className="card-text">{weather.current_observation.condition && weather.current_observation.condition.temperature}°F</h2>
                                <p className="card-text">Temperature is {weather.current_observation.condition && weather.current_observation.condition.temperature}</p>
                                <p className="card-text">Min Temperature is {weather.forecasts[0].high}°F</p>
                                <p className="card-text">Max Temperature is {weather.forecasts[0].low}°F</p>
                                <a href="/" className="btn btn-outline-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-center mb-3" style={{ width: "20rem", borderRadius: "10%", padding: "1em" }}>
                            <div className="card-body">
                                <h5 className="card-title border-bottom pb-2">Humidity Info</h5>
                                <h2 className="card-text">{weather.current_observation.atmosphere.humidity}%</h2>
                                <p className="card-text">Wind Degree is {weather.current_observation.wind.direction}</p>
                                <p className="card-text">Feels like {weather.current_observation.condition.text}</p>
                                <p className="card-text">Humidity is {weather.current_observation.atmosphere.humidity}</p>
                                <a href="/" className="btn btn-primary">Get Started</a>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card text-center mb-3" style={{ width: "20rem", borderRadius: "10%", padding: "1em" }}>
                            <div className="card-body">
                                <h5 className="card-title border-bottom pb-2">Wind Info</h5>
                                <h2 className="card-text">{weather.current_observation.wind && weather.current_observation.wind.speed} mph</h2>
                                <p className="card-text">Wind Speed is {weather.current_observation.wind && weather.current_observation.wind.speed}</p>
                                <p className="card-text">Sunrise Time is {weather.current_observation.astronomy.sunrise}</p>
                                <p className="card-text">Sunset Time is {weather.current_observation.astronomy.sunset}</p>
                                <a href="/" className="btn btn-primary">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row">
                {weather && weather.forecasts && weather.forecasts.slice(4, 11).map((element, index) => {
                    return <div className="card col-6 col-md-4" key={index} style={{ maxWidth: "9rem", margin: "1rem", borderRadius: "10%" }}>
                        <div className="card-body">
                            <p className="card-text text-center">{element.day}</p>
                            <p className="card-text text-center">High={element.high}°F</p>
                            <p className="card-text text-center">Low={element.low}°F</p>
                        </div>
                    </div>
                })}
            </div>

        </div >
    );
}
