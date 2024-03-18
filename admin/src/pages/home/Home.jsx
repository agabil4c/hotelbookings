import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import dayjs from 'dayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Widget from "../../components/widget/Widget";
import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  useEffect(() => {
    var date = new Date();
    setStartDate(dayjs(new Date(date.getFullYear(), date.getMonth(), 1)));
    setEndDate(dayjs(new Date(date.getFullYear(), date.getMonth() + 1, 0)));
  },[]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
        </DemoContainer>
        </LocalizationProvider>
        
        <div className="widgets">
          <Widget type="user" startDate={startDate} endDate={endDate} />
          <Widget type="hotel" startDate={startDate} endDate={endDate} />
          <Widget type="booking" startDate={startDate} endDate={endDate} />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
