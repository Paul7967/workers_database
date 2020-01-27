import React from 'react';

export const Search = ({onCangeHandler}) => {
	const onCangeHandlerIn = () => {

	}

	return (
		<div className="form-group mb-4">
			<input 
				name="search-input"
				type="text"
				className="form-control"
				placeholder="Enter worker's surname for search"
				onChange={onCangeHandler}
			/>
		</div>
	)
};