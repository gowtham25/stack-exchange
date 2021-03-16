import '../../App.css';
import { useEffect, useState, useCallback } from 'react';
import TagLists from './TagLists';

function Page1() {
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [pageSize, setPageSize] = useState('');
	const [page, setPage] = useState('');
	const [listItem, setListItem] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getData();
	}, []);
	
	const getData = useCallback(() => {
		setLoading(true);
		const fetchPage = page ? page : 1;
		const fetchPageSize = pageSize ? pageSize : 30;
		const fetchfromDate = fromDate ? fromDate : Math.round(new Date(2020, 3, 1).getTime() / 1000);
		fetch(`https://api.stackexchange.com/2.2/tags?page=${fetchPage}&pagesize=${fetchPageSize}&fromdate=${fetchfromDate}&todate=${toDate}&order=desc&sort=popular&site=stackoverflow`)
			.then(data => data.json())
			.then(({items, error_message = ''}) => {
				if(items){
					setListItem(items);
					error && setError('');
				} else {
					setError(`Problem With ${error_message}. Please Try with different ${error_message}.`)
				}
				setLoading(false);
		})
	}, [error, fromDate, page, pageSize, toDate]);

	const handleInputChange = (key, value) => {
		switch(key){
			case 'fromDate': {
				const dateArr = value.split('-');
				setFromDate(Math.round((new Date(dateArr[0], dateArr[1], dateArr[2])).getTime() / 1000));
				break;
			}
			case 'toDate': {
				const dateArr = value.split('-');
				setToDate(Math.round((new Date(dateArr[0], dateArr[1], dateArr[2])).getTime() / 1000));
				break;
			}
			case 'pageSize': 
				if(!isNaN(value)){
					setPageSize(Number(value));
				}
			break;
			case 'page': 
				if(!isNaN(value)){
					setPage(Number(value));
				}
			break;
			default:
				return;
		}
	}
	return (
		<div className="App">
			<div className='stackexchange-container'>
				<h2>3rd Party API & Visualization</h2>
				<div className='input-container'>
					<div className='input-container-top'>
						<div className='input-row-container'>
							<label>From Date:</label><input type='date' onChange={(e) => {handleInputChange('fromDate', e.target.value)}}/>
						</div>
						<div className='input-row-container'>
							<label>To Date:</label><input type='date' onChange={(e) => {handleInputChange('toDate', e.target.value)}}/>
						</div>
						<div className='input-row-container'>
							<label>PageSize:</label><input type='text' value={pageSize} onChange={(e) => {handleInputChange('pageSize', e.target.value)}}/>
						</div>
						<div className='input-row-container'>
							<label>Page:</label><input type='text' value={page} onChange={(e) => {handleInputChange('page', e.target.value)}}/>
						</div>
					</div>
					<div className='button-container'>
						<button onClick={() => getData()}>Run Query</button>
					</div>
				</div>
				{!error && !loading ? (
					<div className='listing-container'>
						{listItem && listItem.length ? listItem.map((item, index) => {
							return <TagLists item={item} key={index}/>
						}) : <p className='loading-text'>No Results Found</p>}
					</div>
				):(
					!error && <p className='loading-text'>Loading, Please Wait...</p>
				)}
				{error && <p className='error-text'>{error}</p>}
			</div>
		</div>
	);
}

export default Page1;
