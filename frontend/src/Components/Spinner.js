import React, { useEffect, useState } from 'react'
import { ThreeCircles } from  'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom'
function Spinner({path='login'}) {
  const navigate=useNavigate()
    const location=useLocation()
  const [count, setCount] = useState(1)
  useEffect(() => {
    const interval=setInterval(()=>{
      setCount((prevalue)=>--prevalue)
    },1000)
    count ===0 && navigate(`/${path}`,{
      state:location.pathname
    })
    return()=>clearInterval(interval)
  }, [count,navigate,location,path])
  
  return (
    <div>
     <ThreeCircles
  height="100"
  width="100"
  color="#656565"
  wrapperStyle={{}}
  wrapperClass="justify-content-center align-items-center h-100"
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
    </div>
  )
}

export default Spinner
