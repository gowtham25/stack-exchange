import React, { useState, Suspense } from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
const Page1 = React.lazy(() => import('./Components/Page1/Page1'));
const Page2 = React.lazy(() => import('./Components/Page2/Page2'));

function App() {
	const [currentPage, setCurrentPage] = useState('page1');
	return (
		<div className='page-container'>
			<Router>
				<div className='header'>
					<Link to="/page1" onClick={() => {setCurrentPage('page1')}} className={currentPage === 'page1' ? 'active menu' : 'menu'}>Page1</Link>
					<Link to="/page2" onClick={() => {setCurrentPage('page2')}} className={currentPage === 'page2' ? 'active menu' : 'menu'}>Page2</Link>
				</div>
				<div className='body'>
					<Switch>
						<Route path="/page1">
							<Suspense fallback='loading'><Page1/></Suspense>
						</Route>
						<Route path="/page2">
							<Suspense fallback='loading'><Page2/></Suspense>
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
