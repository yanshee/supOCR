import React, { useState,useEffect} from 'react'
import '../../style/SideNav.css'

function SideNav() {

    // function toggleNav() {
    //     var nav = document.getElementById("side-nav");
    //     nav.classList.toggle("expanded");
    // }

    document.addEventListener('DOMContentLoaded', function() {
        console.log("In")
        const toggleBtn = document.getElementById('toggle-btn');
        const toggleBtnExpanded = document.getElementById('toggle-btn-expanded');
        const sidebar = document.querySelector('.sidebar');
        const sidebarIcons = document.querySelector('.sidebar-icons');
        const sidebarExpanded = document.querySelector('.sidebar-expanded');
    
        toggleBtn.addEventListener('click', function() {
            sidebar.style.width ='200px';
            sidebarIcons.style.display = 'none';
            sidebarExpanded.style.display = 'flex';
        });
    
        toggleBtnExpanded.addEventListener('click', function() {
            sidebar.style.width ='60px';
            sidebarIcons.style.display = 'flex';
            sidebarExpanded.style.display = 'none';
        });
    });
    
    
return(
    // <div id="side-nav" class="sidenav">
    //     <div class="nav-toggle" onclick="toggleNav()">&#9776;</div>
    //     <a href="#" class="nav-item">
    //         <span class="icon">✔</span>
    //         <span class="icon-text">Approvals</span>
    //     </a>
    //     <a href="#" class="nav-item">
    //         <span class="icon">👤</span>
    //         <span class="icon-text">Temporary Login</span>
    //     </a>
    // </div>

    <div class="sidebar">
        <div class="sidebar-icons">
            <div class="icon" id="toggle-btn"><i class="fa-solid fa-angle-right" style={{color:'white'}}></i></div>
            <div class="icon"><i class="fa-solid fa-octagon-check"></i></div>
            <div class="icon"><i class="fa-solid fa-user"></i></div>
            
        </div>
        <div class="sidebar-expanded">
            <div class="item" id="toggle-btn-expanded"><i class="fa-solid fa-angle-right"></i></div>
            <div class="item">Home</div>
            <div class="item">Messages</div>
            <div class="item">Settings</div>
        </div>
    </div>


)
}
export default SideNav