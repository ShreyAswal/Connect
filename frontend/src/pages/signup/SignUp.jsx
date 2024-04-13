import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import UseSignup from "../../hooks/UseSignup";

const SignUp = () => {

  const [inputs,setInputs] = useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  })

  const handleGenderChange = (gender) => {
    setInputs({...inputs,gender});
  }

  // Custom hook to handle the signup functionality - destructuring the loading state and the signup function
  // Add loading state afterwords
  const { signup} = UseSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the signup function from the custom hook and pass the input values
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto border- border-pink-400">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span className="text-pink-500"> To Connect :)</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text" >Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Monkey D Luffy"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs,fullName:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Luffy"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => setInputs({...inputs,username:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs,password:e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs,confirmPassword:e.target.value})}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleGenderChange} selectedGender={inputs.gender} />

          <Link
            to='/login'
            className="text-sm hover:underline hover:text-pink-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
