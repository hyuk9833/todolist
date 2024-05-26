import Calendar from "../components/Home/Calendar";
import Head from "../components/Head";
import Todo from "../components/Home/Todo";
import Icon from "../components/Icon";
import "../css/Home.css";
import { useState } from "react";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="Home">
      <Head text={"To Do"} />
      <div className="home_container">
        <Calendar currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <div className="curr_date_text">{currentDate.toLocaleDateString()}</div>
        <Todo />
      </div>
      <Icon />
    </div>
  );
};

export default Home;
