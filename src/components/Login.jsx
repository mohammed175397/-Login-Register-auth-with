import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInWithGoogle from "./SignInWithGoogle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, email, password);
      console.log('logged successfully');
      window.location.href = "/Profile";
      toast.success("User logged in successfully", {
        position: "top-center",
      })
    } catch(error) {
      console.log(error.message);
      toast.error(error.message, {
        position: 'bottom-center'
      })
      
    }
  }

  return (
    <form  onSubmit={handleSubmit} className="flex flex-col gap-4 items-center   w-100  p-4 bg-white shadow-xl">
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
      <SignInWithGoogle />
    </form>
  );
}

export default Login