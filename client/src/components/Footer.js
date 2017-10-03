// Footer.js
import React, { Component } from 'react';

const Footer = () => (
    <div>
        <p>This app is built for FreeCodeCamp.</p>
        <p>User Stories:</p>
        <ul>
            <li>As an unauthenticated user, I can view all bars in my area.</li>
            <li>As an authenticated user, I can add myself to a bar to indicate I am going there tonight.</li>
            <li>As an authenticated user, I can remove myself from a bar if I no longer want to go there.</li>
            <li>As an unauthenticated user, when I login I should not have to search again.</li>
        </ul>
    </div>
);

export default Footer;
