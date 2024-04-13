import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-purple-600 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-pink-500"> To Connect :)</span>
        </h1>

        <form>
          <div>
            <lable className="label p-2">
              <span className="text-base label-text">Username</span>
            </lable>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered input-secondary max-w-xs w-full h-10"
            />
          </div>

          <div>
            <lable className="label p-2">
              <span className="text-base label-text">Password</span>
            </lable>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered input-secondary max-w-xs w-full h-10"
            />
          </div>

          <Link
            to='/signup'
            className="text-sm hover:underline hover:text-pink-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
