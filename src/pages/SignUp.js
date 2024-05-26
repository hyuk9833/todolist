import React, { useEffect, useState } from "react";
import "../css/SignUpPage.css";
import MyButton from "../components/MyButton";
import MyInput from "../components/Sign/MyInput";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SmallLogo } from "../small_logo.svg";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPw, setCheckPw] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", "{}");
    }
  }, []);

  const navigate = useNavigate();
  const handleSignUp = () => {
    const userList = JSON.parse(localStorage.getItem("user"));
    if (!email || !password || !checkPw) {
      alert("모든 항목을 입력하세요.");
      return;
    }
    if (email.length < 14 || password.length < 5) {
      alert("이메일은 15자 이상, 비밀번호는 5자 이상 입력하세요.");
      return;
    }
    if (!userList[email]) {
      if (password === checkPw) {
        userList[email] = password;
        localStorage.setItem("user", JSON.stringify(userList));
        alert("회원가입 성공! 로그인 화면으로 이동합니다.");
        navigate("/SignIn");
      } else {
        alert("비밀번호를 다시 확인해주세요.");
        return;
      }
    } else {
      alert("이미 존재하는 이메일입니다.");
      return;
    }
  };

  return (
    <div className="SignUp">
      <div className="signup_logo">
        <SmallLogo />
      </div>
      <div className="signup_title">
        <h4>
          COLLECT <br />
          YOUR <br />
          TODOs <br />
          EVERYDAY <br />
        </h4>
      </div>
      <div className="signup_info">
        <div className="signup_input_email">
          <MyInput
            title={"EMAIL ADDRESS"}
            type={"id"}
            text={"Enter Email Address"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="signup_input_password">
          <MyInput
            title={"PASSWORD"}
            type={"password"}
            text={"Enter Password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="signup_input_passwordcheck">
          <MyInput
            title={"CHECK PASSWORD"}
            type={"password"}
            text={"Check Password"}
            onChange={(e) => setCheckPw(e.target.value)}
          />
        </div>
      </div>
      <div className="signup_button">
        <MyButton text="SIGN UP" onClick={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUpPage;
