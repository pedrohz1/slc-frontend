import React from 'react';

function CarFormGroup(props) {
  return (
    <div className='form-group'>
      <label className='m-1 text-white' htmlFor={props.htmlFor}>{props.label}</label>
      {props.children}
    </div>
  );
}

export default CarFormGroup;