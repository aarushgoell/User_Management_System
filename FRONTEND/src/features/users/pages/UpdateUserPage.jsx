import { useState } from "react";
import { Heading } from "../../../components/ui/Heading";
import { Input } from "../../../components/ui/Input";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function UpdateUserPage() {
  const { id, prevname, prevemail, prevphone } = useLocation().state;
  const [name, setName] = useState(prevname);
  const [email, setEmail] = useState(prevemail);
  const [phone, setPhone] = useState(prevphone);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");

  async function handleSumbit(e) {
    e.preventDefault();
    setSuccess("");
    try {
      console.log("Entered");
      const res = await axios.put(
        // `https://user-management-system-1-cw34.onrender.com/users/${id}`,
         `http://localhost:3000/users/${id}`,
        {
          name,
          email,
          phone,
        }
      );
      setServerError("");
      setSuccess("User Updated successfully!");
    } catch (err) {
      if (err.response) {
        if (err.response.data?.errors) {
          setErrors(err.response.data.errors);
        } else if (err.response.data?.message) {
          setServerError(err.response.data.message);
        } else {
          setServerError("Something went wrong");
        }
      } else {
        setServerError("Network error. Try again");
      }
    }
  }

  return (
    <div>
      <Heading heading="Update System" nav="/"></Heading>
      <div class="inputcontainertop">
        <div class="inputcontainerchild">
          <form onSubmit={handleSumbit}>
            <Input
              type="text"
              placeholder="Enter Name"
              name="Name"
              setState={setName}
              value={name}
            ></Input>
            <Input
              type="email"
              placeholder="Enter Email"
              name="Email"
              setState={setEmail}
              value={email}
            ></Input>
            <Input
              type="number"
              placeholder="Enter Phone"
              name="Phone"
              setState={setPhone}
              value={phone}
            ></Input>
            <div class="submitparent">
              <button class="submit" type="submit">
                Update
              </button>
            </div>
            {serverError && <p className="error">{serverError}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

// Aarush
// aarushgoel2006@gmail.com
// 9418648056
