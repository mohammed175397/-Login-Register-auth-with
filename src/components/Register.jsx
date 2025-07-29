import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

   const handleRegister = async (e) => {
     e.preventDefault();
     try {
       await createUserWithEmailAndPassword(auth, email, password);
       const user = auth.currentUser;
       console.log(user);
       if (user) {
         await setDoc(doc(db, "users", user.uid), {
           email: user.email,
           firstName: fname,
           lastName: lname,
           photo: "",
         });
       }
       console.log("User Registered Successfully!!");
       toast.success("User Registered Successfully!!", {
         position: "top-center",
       });
     } catch (error) {
       console.log(error.message);
       toast.error(error.message, {
         position: "bottom-center",
       });
     }
   };
  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col gap-4 items-center   w-100  p-4 bg-white shadow-xl"
    >
      <h3>Sign Up</h3>

      <div className="flex flex-col">
        <label>First name</label>
        <input
          type="text"
          className="border rounded-sm w-3xs p-1"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Last name</label>
        <input
          type="text"
          className="border rounded-sm w-3xs p-1"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Email address</label>
        <input
          type="email"
          className="border rounded-sm w-3xs p-1"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col">
        <label>password</label>
        <input
          type="password"
          className="border rounded-sm w-3xs p-1"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="bg-blue-500 w-3xs text-center p-1 rounded-sm ">
        <button type="submit" className="cursor-pointer">
          sign up
        </button>
      </div>

      <p className="flex justify-end w-3xs text-sm">
        Alredy register
        <a
          href="/login"
          className="text-blue-500 ml-1 hover:underline cursor-pointer"
        >
          login Here
        </a>
      </p>
    </form>
  );
}

export default Register