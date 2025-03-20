import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
	name : Yup.string().min(3, "Names must be at least 2 characters.").required("Full name is required."),
	username : Yup.string().required("Username is required."),
	email : Yup.string().email("Invalid e-mail address.").required("E-mail address is required."),
	password : Yup.string().min(6, "Password must be at least 6 characters.").required("Password is required."),
	confirmPassword : Yup.string().matches(password).required("Passoerd is required."),
	age : Yup.number().min(18).max(100)
});

const Register = () => {
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = (data) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			// name
			<div>
				<label>Username:</label>
				<input {...register("name")} />
				{errors.name && <p>{errors.username.message}</p>}
			</div>

			// username
			<div>
				<label>Username:</label>
				<input {...register("username")} />
				{errors.username && <p>{errors.username.message}</p>}
			</div>

			// e-mail
			<div>
				<label>Email:</label>
				<input {...register("email")} />
				{errors.email && <p>{errors.email.message}</p>}
			</div>

			// password
			<div>
				<label>Password</label>
				<input type="password" {...register("password")} />
				{errors.password && <p>{errors.password.message}</p>}
			</div>

			// confirm password
			<div>
				<label>Confirm password:</label>
				<input type="password" {...register("confirmPassword")} />
				{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
			</div>

			// age
			<div>
				<label>Age:</label>
				<input type="number" {...register("age")} />
				{errors.age && <p>{errors.age.message}</p>}
			</div>

			// submission page
			<button type="submit">Register</button>
		</form>
	);
};

export default Register;
