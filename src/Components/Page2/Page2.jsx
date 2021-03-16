import '../../App.css';
import { useEffect, useState } from 'react';

function Page2() {
	const [copiedVal, setCopiedVal] = useState('');
	useEffect(() => {
		const queryStringDetails = new URLSearchParams(window.location.search);
		const selectedQueryString  = queryStringDetails.get('q');
		setCopiedVal(selectedQueryString)
		navigator.clipboard.writeText(selectedQueryString)
	}, []);
	return (
		<div className="App">
			<h2>Copy To Clipboard</h2>
			<input type='text' value={copiedVal} className='clipboard-input'/>
		</div>
	);
}

export default Page2;
