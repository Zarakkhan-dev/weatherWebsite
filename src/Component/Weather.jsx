import React, { useState } from 'react'
import axios from 'axios';
import Image from 'next/image';
import clear from "../../public/images/clear.png"
import clouds from "../../public/images/clouds.png"
import drizzle from "../../public/images/drizzle.png"
import mist from "../../public/images/mist.png"
import rain from "../../public/images/rain.png"
import snow from "../../public/images/snow.png"
import wind from "../../public/images/wind.png"
import humidity from "../../public/images/humidity.png"
import weather_logo from "../../public/images/Weather_logo.png"
const Weather = () => {

  const [city_name,setCity_name] = useState("");

  const [weather_condition,setWeatherCondition] = useState({
    name:"",
    temp:"",
    humidity:"",
    wind_speed:"",
    Condition:"",
  })
  const submision= async (e)=>{

    try {
      setCity_name("")
    e.preventDefault();
      const weatherapi = "df4e6c66681bffa7a54f135251492d48";
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${weatherapi}&units=metric`
    const response  = await axios.get(url);

    if(response){
      const {name,main, wind,weather} = response.data;

      let condition = weather[0].main;
      setWeatherCondition({  name:name,
      temp:Math.round(main.temp),
      humidity:main.humidity,
      wind_speed:wind.speed,
      Condition:condition})
    }
    } catch (error) {
      alert("Correct the City or Country Name");
    }
    
 }
  return (
    <>
    <div className="Weather-app flex justify-center items-center  h-[100vh]">
      <div className="Box  p-12">
      <div className=" grid items-center gap-4 w-full max-w-sm mx-auto">
        <form onSubmit={submision}>
      <div className="flex items-center gap-3 search-box">
        <input placeholder="Search for a city" type="search" name="search" value={city_name} onChange={(e)=>setCity_name(e.target.value)}  />
        <button type='submit' className='Button' ><i className="fa-solid fa-magnifying-glass fa-xl" ></i></button>
      </div>
      </form>

      <div className="Image flex justify-center">
    {weather_condition.Condition ==="Clear"?   <Image  src={clear} width={130} height={100} className='w-auto h-auto' alt='no image'/>
    :weather_condition.Condition ==="Clouds"?   <Image  src={clouds} width={130} height={100} className='w-auto h-auto' alt='no image'/>:weather_condition==="Drizzle"?   <Image  src={drizzle} width={130} height={100} className='w-auto h-auto' alt='no image'/>
  :weather_condition.Condition==="Mist"?   <Image  src={mist} width={130} height={100} className='w-auto h-auto' alt='no image'/>:weather_condition==="Rain"?   <Image  src={rain} width={130} height={100} className='w-auto h-auto' alt='no image'/>
 :weather_condition==="Snow"?   <Image  src={snow} width={130} height={100} className='w-auto h-auto' alt='no image' /> :   <Image  src={weather_logo} width={130} height={100} className='w-auto h-auto' alt='no image' priority/> }
      </div>
      <div className="grid items-center gap-2 text-center text-[#1F2544]">
        
        <div className="flex gap-2 text-2xl font-semibold justify-center">
          <h1>{weather_condition.temp ==="" ? "0":weather_condition.temp}</h1> &#176;C
        </div>
        <div className="flex items-center gap-2 text-lg font-bold justify-center">

          <h1 className=''>{weather_condition.name ===""?"City Name":weather_condition.name}</h1>
        </div>
        <div className="grid grid-cols-2 items-center gap-5 text-xs mt-5 font-semibold">
          <div className=" flex gap-3">
            <div className="humidity-logo">
              <Image src={humidity} width={20} height={50} className='w-auto h-auto' alt='no image' />
            </div>
            <div className="Humidity-section">
          <h1 className='text-lg'> {weather_condition.humidity ===""?"0":weather_condition.humidity} %</h1>
             <h1>Humidity</h1>   
          </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="Wind-speed-logo ">
              <Image src={wind} width={30} height={50} className='w-auto  h-auto' alt='no image'/>
            </div>
            <div className="Wind-speed-section">
          <h1 className='text-lg'>{weather_condition.wind_speed===""?"0":weather_condition.wind_speed} km/h</h1>
         <h1>  Wind speed </h1> 
         </div>
          </div>

        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Weather
