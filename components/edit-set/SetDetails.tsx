import React, { useState, useRef, useEffect } from "react";
interface Props {
    name : string;
    nameRef: any;
  }
  
  const SetDetails: React.FC<Props> = (props) => {
    return (<div>
    <label htmlFor="set-name" className="label">
      Set Name:
    </label>
    <input
      id="set-name"
      type="text"
      className="input input-bordered input-primary "
      defaultValue={props.name}
      ref={props.nameRef}
      required
    />

<div className=" container">
<label htmlFor="set-name" className="label">
      tags:
    </label>
  <div className="badge badge-primary badge-outline">primary</div>
</div>
  </div>)
  }

  export default SetDetails;