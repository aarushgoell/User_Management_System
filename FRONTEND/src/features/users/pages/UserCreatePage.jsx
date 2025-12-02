import { useState } from "react";
import { Heading } from "../../../components/ui/Heading";
import { Input } from "../../../components/ui/Input";
import axios from "axios";
import { Loader } from "../../../components/ui/Loader";
export function UserCreatePage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const [load, setLoad] = useState(false);

  const validate = () => {
    let err = {};

    if (!name.trim()) err.name = "Name is required";
    if (!email.trim()) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      err.email = "Enter a valid email";
    }

    if (!password.trim()) {
      err.password = "Password is required";
    } else if (password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    if (!phone.trim()) {
      err.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      err.phone = "Phone must be 10 digits";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  async function handleSumbit(e) {
    e.preventDefault();
    setSuccess("");
    if (!validate()) {
      setLoad(false);
      return;
    }
    try {
      console.log(name, password, email, phone);
      const res = await axios.post(
        "https://user-management-system-1-cw34.onrender.com/users",
        {
          name,
          password,
          email,
          phone,
        }
      );
      setLoad(false);
      setServerError("");
      setSuccess("User created successfully!");
    } catch (err) {
      setLoad(false);
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
    setName("");
    setPassword("");
    setPhone("");
    setEmail("");
  }

  return (
    <div>
      <Heading heading="User Management System" nav="/allUsers"></Heading>
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
            {errors.name && <p className="error">{errors.name}</p>}
            <Input
              type="email"
              placeholder="Enter Email"
              name="Email"
              setState={setEmail}
              value={email}
            ></Input>
            {errors.email && <p className="error">{errors.email}</p>}
            <Input
              type="number"
              placeholder="Enter Phone"
              name="Phone"
              setState={setPhone}
              value={phone}
            ></Input>
            {errors.phone && <p className="error">{errors.phone}</p>}
            <Input
              type="password"
              placeholder="Enter Password"
              name="Password"
              setState={setPassword}
              value={password}
            ></Input>
            {errors.password && <p className="error">{errors.password}</p>}
            <div class="submitparent">
              <button class="submit" type="submit">
                Submit
              </button>
            </div>
            {serverError && <p className="error">{serverError}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {load && <Loader></Loader>}
          </form>
        </div>
      </div>
    </div>
  );
}
