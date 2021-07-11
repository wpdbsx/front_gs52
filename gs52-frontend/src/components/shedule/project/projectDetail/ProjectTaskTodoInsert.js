import { CButton } from "@coreui/react";
import { useEffect, useRef, useState } from "react";
import TaskTodoModal from "./ProjectTaskTodoModal";
const ProjectTaskTodo = ({
  projectNo,
  axios,
  dispatch,
  taskIndex,
  item,
  sum,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TaskTodoModal
        visible={visible}
        setVisible={setVisible}
        projectNo={projectNo}
        axios={axios}
        dispatch={dispatch}
        taskIndex={taskIndex}
        sum={sum}
        item={item}
      />
      <CButton
        active
        color="dark"
        aria-pressed="true"
        style={{ textAlign: "center", float: "right" }}
        onClick={async () => {
          await setVisible(false);

          await setVisible(true);
        }}
        key={taskIndex}
      >
        {taskIndex === undefined && "할일 등록"}
        {taskIndex !== undefined && "수정"}
      </CButton>
    </>
  );
};

export default ProjectTaskTodo;
