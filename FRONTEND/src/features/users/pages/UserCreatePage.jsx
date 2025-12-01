//   name: String,
//   email: String,
//   phone: Number,
//   password: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: String,
//     default: datee,
//   },

import { useState } from "react";
import { Heading } from "../../../components/ui/Heading";
import { Input } from "../../../components/ui/Input";

export function UserCreatePage() {

    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState(0);
    const [errors,setErrors] = useState({});

  return (
    <div>
      <Heading></Heading>
      <form>
        <Input type = "text" placeholder= "Enter Name" name= "Name"></Input>
        <Input type = "text" placeholder= "Enter Email" name = "Email"></Input>
        <Input type = "" placeholder= "Enter name"></Input>
        <Input type = "password" placeholder= "Enter Password"></Input>

      </form>
    </div>
  );
}
