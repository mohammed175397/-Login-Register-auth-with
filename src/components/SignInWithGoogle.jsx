import google from "../../google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

const SignInWithGoogle = () => {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
        console.log(result);
        const user = result.user;
        if(result.user) {
            await setDoc(doc(db, "users", user.uid), {
              email: user.email,
              firstName: user.displayName,
              photo: user.photoURL,
              lastName: "",
            });
            toast.success("user logged in Successfully", {
                position: "top-center",
            });
            window.location.href = '/Profile';
        }
    })
  }
    return (
    <div>
        <p className="text-sm text-center">--Or continue with--</p>
        <div onClick={googleLogin}>
            <img className="w-50 cursor-pointer" src={google} alt="icon google" />
        </div>
    </div>
  )
}

export default SignInWithGoogle