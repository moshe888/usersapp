import { useEffect, useState } from "react";
import { User } from "../services/user-service";

interface Props {
  user: User;
  deleteAction: (user:User) => void;
  updateAction: (user:User) => void;
}


const UserItem = (props: Props) => {

  const [id, setId] = useState(props.user.id); 
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [username, setUsername] = useState(props.user.username);

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
            {props.user.name}
          </button>
      </h2>
      
      <div
        id={`collapse${props.user.id.toString()}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${props.user.id.toString()}`}
        data-bs-parent="#accordionExample">
    
        
        <div className="accordion-body">
        <div className="row">
            <div className="col-sm-6">
              <label className="form-label">ID</label>
              <input
                value={id}
                onChange={(e) => {
                  setId(parseInt(e.target.value));
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Name</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
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
            <div className="col-sm-6">
              <label className="form-label">Username</label>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="email"
                className="form-control"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <br />
              <button onClick={() => { props.updateAction({ id, name, email, username }) }} className="btn btn-warning">Update User</button>{ " " }
              <button onClick={() => {props.deleteAction(props.user)}} className="btn btn-danger">Delete User</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
