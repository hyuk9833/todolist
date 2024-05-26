// Todo.js
import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router-dom";
import TodoCard from "./TodoCard";
import "../../css/Todo.css";

const Todo = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit");
    console.log("hi");
  };

  {
    /* 할 일 목록 부분입니다. 할 일 제목과 할 일 카드를 포함합니다. */
  }
  return (
    <div className="Todo">
      <div className="todo_head">
        <h3 className="todo_head_title">할 일</h3>
        <h4 className="todo_head_sub">오늘 마감 1개</h4>
        {/* 할 일 추가 버튼을 표시합니다. */}
        <div className="todo_head_icon" onClick={handleEditClick}>
          <SvgIcon component={BorderColorIcon} inheritViewBox />
        </div>
      </div>
      {/* 할 일 타임라인을 표시합니다. */}
      <div className="todo_timeline">
        <div className="todo_timeline_line"></div>

        {/* 토글 부분 */}
        <div className="todo_timeline_toggle">
          {/* Use TodoCard component for each card */}
          <TodoCard
            title="운동"
            stars={3}
            time="오후 8:00"
            content="수건, 단백질바 챙기기"
            tag="건강"
          />

          <TodoCard
            title="운동"
            stars={3}
            time="오후 8:00"
            content="수건, 단백질바 챙기기"
            tag="건강"
            status="on"
          />

          <TodoCard
            title="운동"
            stars={3}
            time="오후 8:00"
            content="수건, 단백질바 챙기기"
            tag="건강"
            status="off"
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
