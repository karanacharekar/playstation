import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';


let Common = ({Component}) => {
  return (
        <div>
          <div style={{align:"left"}}>
    				 <Image style={{marginLeft: "25px", marginTop:"25px"}} src='./Playstation_logo.png' size='small' />
    			</div>
          <div>
            {Component}
          </div>
        </div>
  );
}

export default Common;
