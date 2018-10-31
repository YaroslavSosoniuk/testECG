import React from 'react';
import FaqItem from '../faqitem';
import './style.css';

export default function faqWrapper (props) {


    let faqs = props.faqItems.map((item,index) =>  <FaqItem key = {index} item={item}/>);
    return (
        <div className="faq__wrapper">
            { faqs }
        </div>
    )

}