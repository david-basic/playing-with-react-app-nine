import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length() === 5;

const Checkout = (props) => {
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		city: true,
		postalCode: true,
	});

	const nameRef = useRef();
	const streetRef = useRef();
	const postalRef = useRef();
	const cityRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const name = nameRef.current.value;
		const street = streetRef.current.value;
		const postalCode = postalRef.current.value;
		const city = cityRef.current.value;

		const nameIsValid = !isEmpty(name);
		const streetIsValid = !isEmpty(street);
		const cityIsValid = !isEmpty(city);
		const postalIsValid = isFiveChars(postalCode);

		setFormInputsValidity({
			name: nameIsValid,
			street: streetIsValid,
			city: cityIsValid,
			postalCode: postalIsValid,
		});

		const formValid =
			nameIsValid && streetIsValid && cityIsValid && postalIsValid;

		if (!formValid) {
			return;
		}

		props.onConfirm({
			name: name,
			street: street,
			city: city,
			postalCode: postalCode,
		});
	};

	const nameControlClasses = `${classes.control} ${
		formInputsValidity.name ? "" : classes.invalid
	}`;

	const streetControlClasses = `${classes.control} ${
		formInputsValidity.street ? "" : classes.invalid
	}`;
	const cityControlClasses = `${classes.control} ${
		formInputsValidity.city ? "" : classes.invalid
	}`;
	const postalControlClasses = `${classes.control} ${
		formInputsValidity.postalCode ? "" : classes.invalid
	}`;

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input type="text" id="name" ref={nameRef} />
				{!formInputsValidity.name && <p>Please enter a valid name!</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" ref={streetRef} />
				{!formInputsValidity.street && (
					<p>Please enter a valid street!</p>
				)}
			</div>
			<div className={postalControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input type="text" id="postal" ref={postalRef} />
				{!formInputsValidity.postalCode && (
					<p>Please enter a valid psotal code (5 chars long)!</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input type="text" id="city" ref={cityRef} />ž
				{!formInputsValidity.city && <p>Please enter a valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
