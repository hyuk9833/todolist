import React, { useState, useEffect } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CircleIcon from "@mui/icons-material/Circle";

// 날짜가 오늘인지 확인하는 함수입니다. 입력된 날짜와 현재 날짜가 같은지 비교합니다.
const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// 달력의 각 날짜를 표시하는 컴포넌트입니다. 날짜, 이전 달 여부, 다음 달 여부, 표시할 마크(완료, 할 일)를 props로 받습니다.
const CalendarDate = ({ date, isPrevMonth, isNextMonth, mark }) => {
  // 입력된 날짜가 오늘인지 확인합니다.
  const today = isToday(date);
  let dateClassName = "";
  // 이전 달의 날짜인 경우 클래스 이름에 prev_date를 추가합니다.
  if (isPrevMonth) dateClassName += " prev_date";
  // 다음 달의 날짜인 경우 클래스 이름에 next_date를 추가합니다.
  if (isNextMonth) dateClassName += " next_date";

  // 마크에 따라 달력의 점 표시 스타일을 결정합니다.
  let dotClassName = "calendar_dot";
  if (mark === "done") dotClassName += " calendar_dot_mark_done"; // 완료된 항목
  if (mark === "todo") dotClassName += " calendar_dot_mark_todo"; // 할 일 항목
  // 마크가 지정되지 않은 경우 점을 숨깁니다.
  if (dotClassName === "calendar_dot") dotClassName += " calendar_dot_hide";

  return (
    <div className={dateClassName}>
      // 날짜가 오늘인 경우 'today' 클래스를 추가합니다.
      <span className={today && "today"}>{date.getDate()}</span>
      // 마크에 따라 다른 스타일의 점을 표시합니다.
      <span className={dotClassName}>
        <CircleIcon fontSize="" />
      </span>
    </div>
  );
};

const Home = () => {
  // 현재 선택된 날짜 상태를 관리합니다.
  const [currentDate, setCurrentDate] = useState(new Date());
  // 달력에 표시될 날짜들의 배열 상태를 관리합니다.
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트되거나 currentDate가 변경될 때 달력 날짜를 생성합니다.
    generateCalendarDates(currentDate);
  }, [currentDate]);

  // 달력 날짜를 생성하는 함수입니다. 현재 날짜를 기준으로 달력에 표시될 날짜들을 계산합니다.
  const generateCalendarDates = (currentDate) => {
    const datesArray = [];
    // 현재 달의 시작일을 구합니다.
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    // 현재 달의 마지막일을 구합니다.
    const endDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    // 이전 달의 날짜들을 계산하여 배열에 추가합니다.
    for (let i = startDay.getDay(); i > 0; i--) {
      const prevDate = new Date(
        startDay.getFullYear(),
        startDay.getMonth(),
        -i + 1
      );
      datesArray.push({ date: prevDate, isPrevMonth: true });
    }

    // 현재 달의 날짜들을 계산하여 배열에 추가합니다.
    for (let d = 1; d <= endDay.getDate(); d++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        d
      );
      // 특정 날짜에 마크를 추가합니다. 예제에서는 2일과 3일에 마크를 추가합니다.
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

    // 다음 달의 날짜들을 계산하여 배열에 추가합니다.
    const daysToAdd = 6 - endDay.getDay();
    for (let i = 1; i <= daysToAdd; i++) {
      const nextDate = new Date(endDay.getFullYear(), endDay.getMonth() + 1, i);
      datesArray.push({ date: nextDate, isNextMonth: true });
    }

    // 계산된 날짜 배열을 상태에 설정합니다.
    setDates(datesArray);
  };

  // 날짜를 '년 월' 형식으로 포매팅하는 함수입니다.
  const formatYearMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  return (
    <div className="Head">
      {/* 헤더 부분입니다. TO DO 텍스트를 표시합니다. */}
      <div className="head_title">
        <h2 className="head_text">TO DO</h2>
      </div>
      {/* 달력 부분입니다. 달력의 헤더, 요일 표시, 날짜들을 포함합니다. */}
      <div className="Calendar">
        <div className="calendar_header">
          {/* 이전 달과 다음 달로 이동하는 버튼을 포함합니다. */}
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
        {/* 요일을 표시하는 부분입니다. 일요일부터 토요일까지 표시합니다. */}
        <div className="weekdays">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        {/* 달력의 날짜들을 그리드 형식으로 표시합니다. */}
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
      {/* 할 일 목록 부분입니다. 할 일 제목과 할 일 카드를 포함합니다. */}
      <div className="Todo">
        <div className="todo_head">
          <h3 className="todo_head_title">할 일</h3>
          <h4 className="todo_head_sub">오늘 마감 1개</h4>
          {/* 할 일 추가 버튼을 표시합니다. */}
          <section className="todo_head_icon">
            <SvgIcon component={BorderColorIcon} inheritViewBox />
          </section>
        </div>
        {/* 할 일 타임라인을 표시합니다. */}
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
