import { useState, useEffect } from "react"
import { auth, db } from "./firebase"
import { doc, getDoc } from "firebase/firestore"
import { toast } from "react-toastify"


const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()) {
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log('User is not logged in');  
            }
        });
    };

    useEffect(() => {
        fetchUserData();
    }, [])

    const handleLogout = async () => {
        try {
          await auth.signOut();
          window.location.href = "/login";
          console.log("user logged out successfully");
        } catch (error) {
          console.error(error.message);
        }
    }
        

  return (
    <div className="flex flex-col items-start  gap-4 w-100 shadow-2xl p-5">
      {userDetails ? (
        <>
          <h3>welcom {userDetails.firstName}</h3>
          <div >
            <p>Email : {userDetails.email}</p>
            <p>First Name : {userDetails.firstName}</p>
            <p>Last Name : {userDetails.lastName}</p>
          </div>
          <button className="bg-blue-500 p-1 rounded-sm cursor-pointer" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default Profile