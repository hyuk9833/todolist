import React, { useState, useEffect } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CircleIcon from "@mui/icons-material/Circle";

// 날짜가 오늘인지 확인하는 함수
const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// 달력 날짜 컴포넌트
const CalendarDate = ({ date, isPrevMonth, isNextMonth, mark }) => {
  const today = isToday(date);
  let dateClassName = "";
  if (isPrevMonth) dateClassName += " prev_date";
  if (isNextMonth) dateClassName += " next_date";

  let dotClassName = "calendar_dot";
  if (mark === "done") dotClassName += " calendar_dot_mark_done";
  if (mark === "todo") dotClassName += " calendar_dot_mark_todo";
  if (dotClassName === "calendar_dot") dotClassName += " calendar_dot_hide";

  return (
    <div className={dateClassName}>
      <span className={today && "today"}>{date.getDate()}</span>
      <span className={dotClassName}>
        <CircleIcon fontSize="" />
      </span>
    </div>
  );
};

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    generateCalendarDates(currentDate);
  }, [currentDate]);

  const generateCalendarDates = (currentDate) => {
    const datesArray = [];
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // 이전 월
    for (let i = startDay.getDay(); i > 0; i--) {
      const prevDate = new Date(
        startDay.getFullYear(),
        startDay.getMonth(),
        -i + 1
      );
      datesArray.push({ date: prevDate, isPrevMonth: true });
    }

    // 현재 월
    for (let d = 1; d <= endDay.getDate(); d++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        d
      );
      if (d === 2) {
        datesArray.push({
          date: date,
          isPrevMonth: false,
          isNextMonth: false,
          mark: "done",
        });
      } else if (d === 3) {
        datesArray.push({
          date: date,
          isPrevMonth: false,
          isNextMonth: false,
          mark: "todo",
        });
      } else {
        datesArray.push({ date: date, isPrevMonth: false, isNextMonth: false });
      }
    }

    // 다음 월
    const daysToAdd = 6 - endDay.getDay();
    for (let i = 1; i <= daysToAdd; i++) {
      const nextDate = new Date(endDay.getFullYear(), endDay.getMonth() + 1, i);
      datesArray.push({ date: nextDate, isNextMonth: true });
    }

    setDates(datesArray);
  };

  const formatYearMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  return (
    <div className="Head">
      <div className="head_title">
        <h2 className="head_text">TO DO</h2>
      </div>

      <div className="Calendar">
        <div className="calendar_header">
          <span
            className="prev_month"
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
          >
            &#10094;
          </span>
          <span className="year_month">{formatYearMonth(currentDate)}</span>
          <span
            className="next_month"
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
          >
            &#10095;
          </span>
        </div>
        <div className="weekdays">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        <div className="days_grid">
          {dates.map((dateObj, index) => (
            <CalendarDate
              key={index}
              date={dateObj.date}
              isPrevMonth={dateObj.isPrevMonth}
              isNextMonth={dateObj.isNextMonth}
              mark={dateObj.mark}
            />
          ))}
        </div>
      </div>

      <div className="Todo">
        <div className="todo_head">
          <h3 className="todo_head_title">할 일</h3>
          <h4 className="todo_head_sub">오늘 마감 1개</h4>
          <section className="todo_head_icon">
            <SvgIcon component={BorderColorIcon} inheritViewBox />
          </section>
        </div>
        <div className="todo_timeline">
          <div className="todo_timeline_line"></div>
          <div className="todo_timeline_card">
            <div className="todo_timeline_line_circle"></div>
          </div>
        </div>
      </div>

      <div className="Icon">1</div>
    </div>
  );
};

export default Home;
