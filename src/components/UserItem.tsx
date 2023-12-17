import { useEffect, useState } from "react";
import Account from "../types/account.type";

interface Props {
  user: Account;
  deleteAction: (user:Account) => void;
  updateAction: (user:Account) => void;
}


const UserItem = (props: Props) => {

  const [id, setId] = useState(props.user.id);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [avatar, setAvatar] = useState(props.user.avatar);
  const [isApproved, setIsApproved] = useState(props.user.isApproved);

  useEffect(() => {

  },[props.user])


  return (
    <div className="accordion-item">
      
      <h2
        className="accordion-header"
        id={`heading${props.user.id.toString()}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${props.user.id.toString()}`}
          aria-expanded="false"
          aria-controls={`collapse${props.user.id.toString()}`}>
            {props.user.firstName} {props.user.lastName}
          </button>
      </h2>
      
      <div
        id={`collapse${props.user.id.toString()}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${props.user.id.toString()}`}
        data-bs-parent="#accordionExample">
    
        
        <div className="accordion-body">
          <div className="row">
            <div className="col-sm-3">
              <img src={avatar} style={{width:120, height:120}} />
            </div>
          </div>
        <div className="row">
            <div className="col-sm-6">
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
          </div>
          <div className="col-sm-6">
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
          <div className="row">
            <div className="col-sm-6">
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
          </div>
          <div className="row">
            <div className="col-sm-12">
              <br />
              <button onClick={() => { props.updateAction({ id, firstName, lastName, email, isApproved }) }} className="btn btn-warning">Update User</button>{ " " }
              <button onClick={() => {props.deleteAction(props.user)}} className="btn btn-danger">Delete User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;