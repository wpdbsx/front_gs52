import { CModalBody, CHeader, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { EmpList } from "src/lib/api/task/ReportAPI";

// 팀원 리스트 불러오기
// search.js

const OthersList = ({ check }) => {
    let [emp] = useState(1);

    const [userContents, setUserContents] = useState([]);
    // const dispatch = useDispatch();

    useEffect(() => {
        EmpList().then((data) => {
            setUserContents(
                data.map((item) => {
                    return {
                        사원번호: item.emp_INDEX,
                        이름: item.emp_NAME,
                        부서: item.dept_NAME,
                        팀: item.team_NAME,
                        직급: item.position_NAME,
                        직책: item.rank_NAME,
                        선택: false,
                    }
                })
            );
        });
    }, [check]);

    const fields = [
        { key: "이름", _style: { width: "20%", textAlign: "center" } },
        { key: "부서", _style: { width: "20%", textAlign: "center" } },
        { key: "팀", _style: { width: "20%", textAlign: "center" } },
        { key: "직급", _style: { width: "20%", textAlign: "center" } },
        { key: "직책", _style: { width: "20%", textAlign: "center" } },
    ];

    return (
        <CModalBody>
            <CHeader>팀원 선택</CHeader>
            <CDataTable
                items={userContents}
                fields={fields}
                columnFilter
                tableFilter
                footer
                itemsPerPageSelect
                itemsPerPage={5}
                hover
                sorter
                pagination
                border
                // clickableRows
                onRowClick={(item) => {
                    setUserContents((contents) => {
                        return contents.map((content) => {
                            return content.사원번호 === item.사원번호
                            ? { ...content, 선택 : !content.선택 }
                                : content;
                        });
                    });
                }}
                scopedSlots={{
                    이름: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택, console.log("이게 선택됐다 !" + setUserContents.emp_INDEX)}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                        {item.이름}
                    </td>
                    ),

                    부서: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                        {item.부서}
                    </td>
                    ),

                    팀: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                        {item.팀}
                    </td>
                    ),

                    직급: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                        {item.직급}
                    </td>
                    ),

                    직책: (item) => (
                    <td
                        className={item.사원번호}
                        selected={item.선택}
                        style={{
                            textAlign: "center",
                            background: item.선택 ? "lightpink" : "white",
                        }}
                    >
                    {item.직책}
                    </td>
                    ),
                }}
            />
        </CModalBody>
    );
};

export default OthersList;
