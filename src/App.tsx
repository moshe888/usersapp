import { useEffect, useState } from "react";
import UserItem from "./components/UserItem";
import Account from "./types/account.type";
import { db, storage } from './services/firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';
import {
  ref, 
  getDownloadURL,
  uploadBytesResumable
} from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';


const App = () => {

  const [users, setUsers] = useState<Account[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    getAccounts();
  }, []);


  const getAccounts = () => {
    setIsLoading(true)
    getDocs(collection(db, "accounts"))
    .then(query => {
      setUsers(
        query.docs.map((doc) => ({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          isApproved: true,
          avatar: doc.data().avatar
        }))
      )
      setIsLoading(false)
    })
    .catch(error => {
      setIsLoading(false)
      toast.error(error.message)
    })
  }

  const deleteUser = async(account: Account) => { 
    setIsLoading(true)
    deleteDoc(doc(db, "accounts", account.id))
    .then(results => {
      setIsLoading(false)
      toast.success("Account deleted")
      getAccounts()
    })
    .catch(error => {
      toast.error(error.message)
      setIsLoading(false)
    })
  };

  const addUser = () => {
    setIsLoading(true)



    const storageRef = ref(storage, `avatars/${avatar.name}`);
    const uploadTask = uploadBytesResumable(storageRef, avatar);
    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(prog);
    }, (error) => console.log(error), () => {

      getDownloadURL(uploadTask.snapshot.ref)
      .then(async(downloadURL) => {

        addDoc(collection(db, "accounts"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          avatar: downloadURL
        })
        .then(results => {
          toast.success('Account created')
          setIsLoading(false)
          getAccounts()
        })
        .catch(error => {
          toast.error(error.message)
          setIsLoading(false)
        })

      })
      .catch(error => {
        setIsLoading(false)
        toast.error(error.message)
      })

    })


    
  };

  const updateUser = async(account: Account) => {
    const refcollection = doc(db, "accounts", account.id);
    updateDoc(refcollection, {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      isApproved: true
    })
    .then(results => {
      toast.success('Account updated')
      setIsLoading(false)
      getAccounts()
    })
    .catch(error => {
      toast.error(error.message)
      setIsLoading(false)
    })
  }

  return (
    <>
    <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <h3>Add new user</h3>
            <div className="row">
              <div className="col-sm-12">
                <label className="form-label">First name</label>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-sm-12">
                <label className="form-label">Last name</label>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="col-sm-12">
                <label className="form-label">Email</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                />
              </div>


              <div className="col-sm-12">
                <label className="form-label">{progress}</label>
                <input
                  onChange={(e) => {setAvatar(e.target.files[0])}}
                  type="file"
                  className="form-control"
                />

              </div>

              <div className="col-sm-12">
                {
                  isLoading ? <div className="spinner-border text-info"></div> : <button onClick={addUser} className="btn btn-info btn-lg">Add New Account</button>
                }
              </div>


            </div>
          </div>



          <div className="col-lg-9">
            <h3>Get all users</h3>
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
            {isLoading && <div className="spinner-border"></div>}

            <div className="accordion" id="accordionExample">
              {users.map((user) => (
                <UserItem key={user.id} user={user} updateAction={updateUser} deleteAction={deleteUser} />
              ))}
            </div>


          </div>
        </div>
      </div>
    </>
  );
};

export default App;