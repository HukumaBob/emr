// src/components/UserList.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

const UserList = ({ users, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
});

export default connect(mapStateToProps, { fetchUsers })(UserList);
