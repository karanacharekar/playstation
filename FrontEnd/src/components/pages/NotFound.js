import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

const NotFound = () => {
return (
			<div className="center">
				<Header id="huge">
					404
				</Header>
				<Header size="huge">
					Page Not Found
				</Header>
				<br/>
			</div>
);
}

export default NotFound;
