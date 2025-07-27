import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
  return (
    <form className="flex flex-col gap-4 items-center   w-100  p-4 bg-white shadow-xl">
      <h3>Login</h3>
      <div className="flex flex-col">
        <label htmlFor="">Email address</label>
        <input
          type="email"
          className="border p-1 rounded-sm w-3xs opacity-50"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="">Password</label>
        <input
          type="password"
          className="border p-1 rounded-sm w-3xs opacity-50"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="bg-blue-500 w-3xs text-center p-1 rounded-sm cursor-pointer">
        <button type="submit" className="cursor-pointer">
          Submit
        </button>
      </div>
      <p className="flex justify-end w-3xs text-sm">
        New user
        <a
          href="/register"
          className="text-blue-500 ml-1 hover:underline cursor-pointer"
        >
          Register Here
        </a>
      </p>
    </form>
  );
}

export default Login