import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);
  };
  return (
    <div className="px-80 xl:px-44 lg:px-32 md:px-12 sm:px-4 pt-6 pb-12">
      <h2 className="text-center text-2xl mb-6">Login</h2>
      <form
        className="flex flex-col  gap-10  bg-white [&>label]:flex [&>label]:flex-col [&>label>span]:text-sm [&_input]:h-10 [&_input]:p-2 [&_input]:mt-1  [&_input]:bg-sky-50 focus:[&_input]:border-b-2 [&_input]:outline-none [&_input]:border-b-2 [&_input]:border-transparent   focus:[&_input]:border-sky-600  shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <label>
          <span>Email :</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label>
          <span>Password:</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>

        <button className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700 transition duration-200">
          Login
        </button>
      </form>
      <p className="mt-4 ">
        You don't have an account yet?{" "}
        <Link
          className="text-sky-600 hover:underline font-semibold"
          to="/signup"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}
