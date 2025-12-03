import { useRef, useState } from "react";
import { Heading } from "../../../components/ui/Heading";
import { useGetUsers } from "../Api/useGetUsers";
import forward from "../Images/forward.png";
import backward from "../Images/backward.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ListUsersPage() {
  // { pag, lim, search }
  const [search, setSearch] = useState("");
  const [pag, setpag] = useState(1);
  const [manualRender, setManualRender] = useState(0);
  const { data, loading, error } = useGetUsers(pag, 10, search, manualRender);
  const { allUsers } = data;

  const navigate = useNavigate();

  const searchRef = useRef("");

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://user-management-system-1-cw34.onrender.com/users/${id}`
      );
      setManualRender((e) => e + 1);
    } catch (err) {
      console.log("Delete failed:", err.message);
    }
  };

  return (
    <div>
      <Heading heading="ALL USERS" nav="/"></Heading>
      <div>
        {loading && <h1>Users are loading</h1>}

        {error && <h1>{error}</h1>}

        {!loading && !error && (
          <div class="UsersContainer">
            <div class="searchfunc">
              <input type="text" placeholder="Search" ref={searchRef} />
              <div
                onClick={() => {
                  console.log(searchRef.current.value);
                  setSearch(searchRef.current.value);
                }}
              >
                Search
              </div>
            </div>
            <div class="fieldUser">
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>CreatedAt</div>
            </div>
            {allUsers?.map((user, index) => {
              const { name, email, phone, createdAt, _id } = user;

              return (
                <div class="countWithUser">
                  <div class="count">{index + 1}</div>
                  <SingleUser
                    name={name}
                    email={email}
                    phone={phone}
                    createdAt={createdAt}
                  ></SingleUser>
                  <div
                    onClick={() => {
                      navigate("/update", {
                        state: {
                          id: _id,
                          prevname : name,
                          prevphone: phone,
                          prevemail: email,
                        },
                      });
                    }}
                    class="update"
                  >
                    Update
                  </div>
                  <div
                    onClick={() => {
                      handleDelete(_id);
                    }}
                    class="delete"
                  >
                    Delete
                  </div>
                </div>
              );
            })}
            <div class="arrowscontainer">
              <div
                onClick={() => {
                  setpag((c) => c + 1);
                }}
              >
                <img
                  src={forward}
                  alt="rightarrow"
                  width="20px"
                  height="20px"
                />
              </div>
              <div
                onClick={() => {
                  setpag((c) => {
                    return c == 1 ? 1 : c - 1;
                  });
                }}
              >
                <img
                  src={backward}
                  alt="backarrow"
                  width="20px"
                  height="20px"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SingleUser({ name, email, phone, createdAt }) {
  return (
    <div class="singleuser">
      <div>{name}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{createdAt}</div>
    </div>
  );
}
