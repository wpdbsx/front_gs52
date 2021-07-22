import React, { useEffect, useState } from "react";
import { CCardBody, CDataTable } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { askedAxios } from "src/modules/schedule/project/projectList";
import { projectNoChange } from "src/modules/schedule/project/project";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import { useDispatch } from "react-redux";
import { Badge } from "antd";
import "antd/dist/antd.css";

const getBadge = (status) => {
  switch (status) {
    case "대기":
      return "warning";
    case "승인":
      return "success";
    case "반려":
      return "error";
    default:
      return "primary";
  }
};

function Asked() {
  const dispatch = useDispatch();
  const user = getCurrentUser();
  let [emp] = useState(user.index);

  const history = useHistory();
  const { asked } = useSelector((state) => {
    return {
      asked: state.projectList.asked,
    };
  });

  useEffect(() => {
    dispatch(askedAxios(emp, emp));
  }, [dispatch]);

  const Done = {
    0: "대기",
    1: "승인",
    2: "반려",
  };

  const data = asked.map((item, key) => {
    return {
      번호: key + 1, // index를 1부터 세 주기 위해서
      프로젝트명: item.project_TITLE,
      시작: item.project_START,
      종료: item.project_END,
      담당자: item.emp_NAME,
      상태: item.project_OKAY,
      인덱스: item.project_INDEX,
    };
  });

  return (
    <CCardBody>
      <CDataTable
        items={data}
        fields={[
          { key: "번호", _style: { width: "10%" } },
          { key: "프로젝트명", _style: { width: "30%" } },
          "시작",
          "종료",
          { key: "담당자", _style: { width: "10%" } },
          { key: "상태", _style: { width: "10%" } },
        ]}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        sorterValue={{ column: "번호", desc: "true" }}
        pagination
        scopedSlots={{
          프로젝트명: (item) => {
            return (
              <td
                onClick={() => {
                  dispatch(projectNoChange({ index: item.인덱스 }));
                  history.push({
                    pathname: `/task/project/detail`,
                  });
                }}
              >
                {item.프로젝트명}
              </td>
            );
          },
          상태: (item) => (
            <td>
              <Badge
                status={getBadge(Done[item.상태])}
                text={Done[item.상태]}
              ></Badge>
            </td>
          ),
        }}
      />
    </CCardBody>
  );
}

export default Asked;
