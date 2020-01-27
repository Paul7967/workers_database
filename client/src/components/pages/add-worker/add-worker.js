import React, {useState} from 'react';
import { useHttp } from './../../../hooks/http.hooks';
import {isInt, isLength} from 'validator';
import './add-worker.sass';
import {useHistory} from 'react-router-dom'

export const AddWorker = () => {
	const history = useHistory()
	const {loading, request, error} = useHttp();
	const [form, setForm] = useState({
		name: "", 
		surname: "",
		age: null,
		gender: "male",
		married: false,
		position: null,
		validation: {
			nameValidationText: '',
			nameIsValid: false,
			surnameValidationText: '',
			surnameIsValid: false,
			ageValidationText: '',
			ageIsValid: false,
			positionValidationText: '',
			positionIsValid: false
		}
	});

	const validateInputValue = (inputName, inputValue, input) => {
		const setInputValidation = (input, isValid) => {
			const feedbackElementName = input.name + "-validation-feedback";
			const feedbackElement = document.getElementsByName(feedbackElementName)[0];
			if (isValid) {
				input.classList.add("is-valid");
				input.classList.remove("is-invalid");
				feedbackElement.classList.add("valid-feedback")
				feedbackElement.classList.remove("invalid-feedback")
			} else {
				input.classList.remove("is-valid");
				input.classList.add("is-invalid");
				feedbackElement.classList.add("invalid-feedback")
				feedbackElement.classList.remove("valid-feedback")
			};

			
		};

		const setValidationToState = (fieldName, isValid, validationText) => {
			const isValidFieldName = fieldName + "IsValid";
			const validationTextFieldName = fieldName + "ValidationText";
			
			setForm({ 
				...form,
				[inputName]: inputValue, 
				validation: {
					...form.validation, 
					[isValidFieldName]:isValid, 
					[validationTextFieldName]:validationText
				}  
			});
		};
	
		switch (inputName) {
			case "name":
			case "surname":
				if (isLength(inputValue, { min: 2, max: 20 })) {
					setValidationToState(inputName, true, "Success! You've done it.");
					setInputValidation(input, true);
				} else {
					setValidationToState(inputName, false, "Field length should be from 2 to 20 characters.")
					setInputValidation(input, false);
				}
				break;
			case "age":
				if (isInt(inputValue, { min: 18, max: 65 })) {
					setValidationToState(inputName, true, "Success! You've done it.");
					setInputValidation(input, true);
				} else {
					setValidationToState(inputName, false, "Age should be between 18 and 65.")
					setInputValidation(input, false);
				}
				break;
			case "position": 
				if (inputValue!="") {
					setValidationToState(inputName, true, "Success! You've done it.");
					setInputValidation(input, true);
				} else {
					setValidationToState(inputName, false, "Field should be filled.")
					setInputValidation(input, false);
				}
				break;
		}
	}

	const changeHandler = event => {
		const input = event.target;
		const {name: inputName, value: inputValue} = input;
		
		validateInputValue(inputName, inputValue, input);
	};
	
	const btnAddHandler = async () => {
		const clearElementsByTag = (tag) => {
			document.getElementsByTagName(tag).forEach(el => {
				el.value = '';
				el.classList.remove("is-valid");
			});	
		}
		
		try {
			const {nameIsValid, surnameIsValid, ageIsValid, positionIsValid} = form.validation;
			if (nameIsValid && surnameIsValid && ageIsValid && positionIsValid) {
				const data = await request('http://localhost:5000/addworker', 'POST', {...form, validation: null})
				if (data) {
					clearElementsByTag('input');
					clearElementsByTag('select');
					history.push(`/workers`)
				}

			} else {
				alert('Not all fields are correctly filled.')
			}
			
		} catch (e) {}	// cath уже обработан в хуке useHttp
	}

	return (
		<div className="container">
			<div className="card mb-3 w-50 p-2 text-white bg-primary" >
				<div className="card-header">Add worker</div>
				<div className="card-body">
				
					<label className="text-success" htmlFor="name">Name</label>
					<input 
						name="name" 
						placeholder="Enter Name"
						className="form-control mb-2" 
						type="text" 
						id="name" 
						onChange = {changeHandler}
					/>
					<div name="name-validation-feedback" className="invalid-feedback">{form.validation.nameValidationText}</div>
				
					<label className="text-success" htmlFor="surname">Surname</label>
					<input 
						name="surname" 
						placeholder="Enter Surname"
						className="form-control mb-2" 
						type="text" 
						id="surname" 
						onChange = {changeHandler}
					/>
					<div name="surname-validation-feedback" className="invalid-feedback">{form.validation.surnameValidationText}</div>

					<label className="text-success" htmlFor="age">Age</label>
					<input 
						name="age" 
						placeholder="Enter Age"
						className="form-control mb-2" 
						type="number" 
						id="age" 
						onChange = {changeHandler}
					/>
					<div name="age-validation-feedback" className="invalid-feedback">{form.validation.ageValidationText}</div>

					<fieldset className="form-group">
						<label className="text-success" htmlFor="gender">Gender</label>
						<div className="form-check">
							<label className="form-check-label">
							<input 
								name="gender" onChange = {changeHandler} type="radio" className="form-check-input" id="optionsRadios1" value="male" checked />
								Male
							</label>
						</div>
						<div className="form-check">
							<label className="form-check-label">
							<input name="gender" onChange = {changeHandler} type="radio" className="form-check-input" id="optionsRadios2" value="female"/>
								Female
							</label>
						</div>
					</fieldset>

					<fieldset className="form-group">
						<label className="text-success">Marital status</label>
						<div className="form-check">
							<label className="form-check-label">
								<input name="married" onChange = {changeHandler} className="form-check-input" type="checkbox" value="true" />
								Married
							</label>
						</div>
					</fieldset>

					<div className="form-group">
						<label className="text-success" htmlFor="cbPosition">Position</label>
						<select name="position" onChange = {changeHandler} className="form-control" id="cbPosition" >
							<option></option>
							<option>HR</option>
							<option>Frontend Developer</option>
							<option>Backend Developer</option>
							<option>Lawyer</option>
							<option>Manager of somthing</option>
						</select>
						<div name="position-validation-feedback" className="invalid-feedback">{form.validation.positionValidationText}</div>
					</div>

				</div>
				<div className="card-body" id="card-btn-add-worker">
					<button 
						className="btn btn-secondary" 
						onClick = { btnAddHandler }
						disabled = { loading }
						id="btn-add-worker" 
					>
						Add worker
					</button>
				</div>	
			</div>
		</div>
	)
};