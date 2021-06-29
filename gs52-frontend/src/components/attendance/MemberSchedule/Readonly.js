import React, { Component, useEffect, useState } from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import DemoData from "./DemoData";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import "react-big-scheduler/lib/css/style.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import moment from "moment";

const withDragDropContext = DragDropContext(HTML5Backend);

function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

let schedulerData = new SchedulerData(
  "2021-06-25",
  ViewTypes.Month,
  false,
  false,
  {
    eventItemPopoverEnabled: false,
    movable: false,
    views: [],
  }
);
schedulerData.localeMoment.locale("en");

const Readonly = withDragDropContext((props) => {
  //treevalue값 까지 받아와짐
  console.log(props.treevalue);

  ////////////////////////////팀, 직원 목록
  const empList = props.emp
    .filter(
      (item) =>
        props.treevalue.includes(String(item.emp_TEAM_INDEX)) ||
        props.treevalue.includes(item.emp_ID)
    )
    .map((item) => ({
      id: item.emp_ID,
      name: item.emp_NAME,
      parentId: String(item.emp_TEAM_INDEX),
    }));

  const parentList = empList
    .filter((item, i) => {
      return (
        empList.findIndex((item2, j) => {
          return item.parentId === item2.parentId;
        }) === i
      );
    })
    .map((item) => item.parentId);

  const teamList = props.team
    .filter((item) => parentList.includes(String(item.team_INDEX)))
    .map((item) => ({
      id: String(item.team_INDEX),
      name: item.team_NAME,
      groupOnly: true,
    }));
  // moment(weekStart).add(7, 'd').day(0).format("YYYY-MM-DD")
  ////////////////////////////직원들 연차목록
  const attendList = props.attend.map((item) => {
    var startdate = new Date(item.attend_DATE);
    startdate.setDate(startdate.getDate() + 1);
    console.log(item.attend_TYPE_NAME);
    if (item.attend_TYPE_NAME == "연차") {
      console.log("연차");
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#FA9E95",
      };
    } else if (item.attend_TYPE_NAME.includes("반차")) {
      console.log("반차");
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#DC143C",
      };
    } else if (item.attend_TYPE_NAME == "출장") {
      console.log("출장");
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#D9D9D9",
      };
    } else if (item.attend_TYPE_NAME == "외근") {
      console.log("외근");
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
        bgColor: "#f759ab",
      };
    } else {
      console.log("else");
      return {
        id: item.attend_INDEX,
        start: item.attend_DATE,
        end: moment(startdate).format("YYYY-MM-DD"),
        resourceId: item.emp_ID,
        title: item.attend_TYPE_NAME,
      };
    }
  });

  console.log(attendList);

  const List = teamList.concat(empList);

  console.log(List);
  console.log(empList);

  const selectList = {
    resources: List,
    events: attendList,
  };
  schedulerData.setResources(selectList.resources);
  schedulerData.setEvents(selectList.events);

  const forceUpdate = useForceUpdate();

  const prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(selectList.events);
    forceUpdate();
  };

  const nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(selectList.events);
    forceUpdate();

    // console.log("@@");
  };

  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(selectList.events);
    forceUpdate();
  };

  const updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    forceUpdate();
  };

  const updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    forceUpdate();
  };

  const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(selectList.events);
      forceUpdate();

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(selectList.events);
      forceUpdate();

      schedulerContent.scrollLeft = 10;
    }
  };

  const onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  const onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("@@s");
    console.log("onScrollBottom");
  };

  const toggleExpandFunc = (schedulerData, slotId) => {
    console.log(slotId);
    schedulerData.toggleExpandStatus(slotId);
    forceUpdate();
  };

  return (
    <div>
      <div>
        <Scheduler
          schedulerData={schedulerData}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          updateEventStart={updateEventStart}
          updateEventEnd={updateEventEnd}
          onScrollLeft={onScrollLeft}
          onScrollRight={onScrollRight}
          onScrollTop={onScrollTop}
          onScrollBottom={onScrollBottom}
          toggleExpandFunc={toggleExpandFunc}
        />
      </div>
    </div>
  );
});

export default withDragDropContext(Readonly);
