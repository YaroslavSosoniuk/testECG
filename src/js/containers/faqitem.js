import React from 'react';

export default function faqItem (props) {


    let tags = props.item.tags.map ( (tag,index) => <span key={index} className='faq__item-tag'>  { tag }  </span> );
    return (

        <div className='faq__item'>
            <h2 className='faq__item-caption'>{props.item.title}</h2>
            <p className='faq__item-text'>{props.item.text}</p>
            {tags}
        </div>

    )

}