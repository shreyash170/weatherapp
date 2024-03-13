import React,{useState} from 'react'
import searchI from './searchicon.png'
const api ={
    key :"132ced9b4a6e14def01caf554adf2f13",
    base : "https://api.openweathermap.org/data/2.5/"
  }
export function WeatherCmp(){
    const[query,setQuery]= useState('');
    const[weather,setWeather]=useState({});

    const search = evt =>{
        if(evt.key==="Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {setWeather(result);
            setQuery('');
        });
        }
    }

    const dateBuilder = (d) =>{
        let months = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];
        let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = days[d.getDay()];
        let date =d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let time = d.getTime();
         return `${day} ${date} ${month} ${year}`

    }
    const autoCompleteData = ["Varanasi","Mumbai","Paris","Delhi","London","Manila","Sydney","Dubai"]


    const handleChange=(e)=>{
        setQuery(e.target.value)

    }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp>18) ? 'App warm' : 'App' ) : 'App'}>
    <main>
        <div className='search-box'>
            <input type='text' className='search-bar' placeholder='Enter the name of the city' onChange={handleChange} value={query}
            onKeyPress={search}/>
            <img src={searchI}></img>

        </div>
        {(typeof weather.main != "undefined") ? (
            <div>
                <div className='location-box'>
            <div className='location'>{weather.name},{weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())} </div>

        </div>
        <div className='weather-box'>
            <div className='temp'>
                {Math.round(weather.main.temp)}°c
            </div>
            <div className='weather'>
                {weather.weather[0].description}

                </div>
                <div className='date'>
                    {weather.date}
                </div>

        </div>
            </div>

        ):('') }
    </main>
    </div>
  )
}
