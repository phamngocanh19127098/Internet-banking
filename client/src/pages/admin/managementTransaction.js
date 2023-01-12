import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetcherListBanks } from "../../fetchers/fetcherCustomer";
import AdminNavigation from "../../components/adminNavigation";
import { fetcherListAdmin } from "../../fetchers/fetcherAdmin";
import { fetcherListByID } from "../../fetchers/fetcherAdmin";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateNotTime = dateAsString.split(" ");
    var dateParts = dateNotTime[0].split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
  inRangeInclusive: true,
};

function ManagementTransaction() {
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [allList, setAllList] = useState();
  const [rowData1, setRowData1] = useState();
  const [value, setValue] = useState("0");

  async function getAllList() {
    const info = await fetcherListAdmin();
    setAllList(info.data.data);
  }
  async function getInternalList() {
    const info = await fetcherListByID(null);
    setAllList(info.data.data);
  }

  async function getExternalList() {
    const info = await fetcherListByID(parseInt(value));
    setAllList(info.data.data);
  }

  const [listBank, setListBank] = useState();
  async function getBanks() {
    const list = await fetcherListBanks();
    setListBank(list.data.data);
  }

  const handleChangeSelect = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value === "0") {
      console.log("A");
      getAllList();
    }
    if (value === "1") {
      getInternalList();
    }
    if (value !== "1" && value !== "0") {
      getExternalList();
    }
  }, [value]);

  useEffect(() => {
    getBanks();
  }, []);

  useEffect(() => {
    console.log(allList);
    if (allList !== undefined) {
      const list = allList;
      list.map(
        (element, index) =>
          (element["date"] = moment(element["updatedAt"]).format(
            "DD-MM-YYYY hh:mm:ss"
          ))
      );
      list.map((element, index) =>
        element["bankDesId"] === null
          ? (element["bankName"] = "TaiXiu Bank")
          : listBank !== undefined
          ? listBank.map((bank) =>
              element["bankDesId"] === bank["id"]
                ? (element["bankName"] = bank["name"])
                : null
            )
          : null
      );
      setRowData1(list);
    }
  }, [allList]);

  const columns = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    {
      headerName: "Tài khoản nguồn",
      field: "accountSrcNumber",
      sortable: true,
    },
    { headerName: "Tài khoản đích", field: "accountDesNumber", sortable: true },
    {
      headerName: "Ngân hàng",
      field: "bankName",
      sortable: true,
    },
    {
      headerName: "Thời gian",
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },
  ];

  const defColumnDefs = {
    flex: 1,
  };

  const onGridReady = (params) => {
    setGridApi(params);
  };

  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "greaterThan";
    else if (endDate !== "") return "lessThan";
  };

  useEffect(() => {
    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        alert("Start Date should be before End Date");
        setEndDate("");
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("date");
        if (getFilterType() === "lessThan") {
          const endDateLess = moment(endDate)
            .add(1, "days")
            .format("DD-MM-YYYY");
          dateFilterComponent.setModel({
            type: getFilterType(),
            dateFrom: startDate ? startDate : endDateLess,
            dateTo: endDateLess,
          });
        }
        if (getFilterType() === "greaterThan") {
          const startDateMore = moment(startDate)
            .subtract(1, "days")
            .format("DD-MM-YYYY");
          dateFilterComponent.setModel({
            type: getFilterType(),
            dateFrom: startDateMore ? startDateMore : endDate,
            dateTo: endDate,
          });
        }
        if (getFilterType() === "inRange") {
          dateFilterComponent.setModel({
            type: getFilterType(),
            dateFrom: startDate ? startDate : endDate,
            dateTo: endDate,
          });
        }
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);

  return (
    <div>
      <div>
        <div className=" bg-cover w-screen flex h-screen bg-[#F0F2FF] ">
          <AdminNavigation id={2} />
          <div className="h-screen flex-auto">
            <div className="m-10 w-200 bg-[#F0F2FF] rounded-sm ring-2 ring-grey h-[90%] p-5  pt-8 relative duration-300">
              {listBank !== undefined ? (
                <div className=" select-container">
                  <select value={value} onChange={handleChangeSelect}>
                    <option value={0}>Tất cả</option>
                    <option value={1}>TaiXiu Bank</option>
                    {listBank.map((option) => (
                      <option value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
              ) : null}

              {rowData1 !== null ? (
                <div>
                  <div className="ag-theme-alpine" style={{ height: 600 }}>
                    From :{" "}
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    To :{" "}
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <AgGridReact
                      rowData={rowData1}
                      columnDefs={columns}
                      defaultColDef={defColumnDefs}
                      onGridReady={onGridReady}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementTransaction;
