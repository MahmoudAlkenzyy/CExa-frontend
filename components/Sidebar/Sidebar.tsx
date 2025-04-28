"use client"
import React, { useState } from 'react'
import {FaPhone } from 'react-icons/fa';
import {  FaRegStar, FaUsers } from 'react-icons/fa6';
import { IoIosHome } from 'react-icons/io';
import { MdOutlineMessage } from "react-icons/md";
import { FiAlignJustify } from "react-icons/fi";
import { Sidebar as SidebarPro, Menu, MenuItem } from 'react-pro-sidebar';

const Sidebar = () => {
        const [collapsed,setCollapsed] = useState(true)
    
    return (
<>
    <SidebarPro  collapsed={collapsed}  className={`h-full absolute top-0 bottom-0 left-0 z-50 `} >
      <Menu className='bg-[#1B3E90] h-full text-white  ' >
      
              <MenuItem className=' hover:siblings x hover:text-[#1B3E90]' icon={<FiAlignJustify  className={`transition-all ${!collapsed? "rotate-90":""}`} size={21} />}  onClick={()=>setCollapsed(v=>!v)}>  </MenuItem>
          <MenuItem className=' hover:siblings x hover:text-[#1B3E90]' icon={<IoIosHome size={21}/>}> Home </MenuItem>
          <MenuItem className=' hover:siblings x hover:text-[#1B3E90]' icon={<FaPhone size={21} className='rotate-90'/>}> Calls </MenuItem>
  
        <MenuItem className=' hover:siblings x hover:text-[#1B3E90]' icon={<FaUsers size={21} />}> Contacts </MenuItem>
              <MenuItem className=' hover:siblings x hover:text-[#1B3E90]' icon={<MdOutlineMessage  size={21}/>}> Message </MenuItem>
              <MenuItem className=' hover:siblings x hover:text-[#1B3E90]' icon={<FaRegStar  size={21}/>}> Rate calls </MenuItem>
      </Menu>
            </SidebarPro>
           {!collapsed&& <div className=' transition-all duration-200 md:!static absolute top-0 left-0 bottom-0 z-40 w-full md:bg-opacity-0 bg-black md: bg-opacity-20'>
            </div>}
</>
  )
}

export default Sidebar