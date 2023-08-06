import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

let data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December']

const Chart = ({ aspect, title, bookings }) => {
  let data = [];
  let currentMonth = new Date().getMonth() + 1;
  let currentYear = new Date().getFullYear();
  let sixCurrentMonth = [];
  for(let i = 0; i < 6; i++) {
    if(currentMonth == 0) {
      currentMonth = 12;
      currentYear--;
    }
    sixCurrentMonth.push({
      month: currentMonth,
      year: currentYear
    });
    currentMonth--;
  }
  sixCurrentMonth.reverse();


  if(bookings.length == 0) {
    data = [
      { name: months[sixCurrentMonth[0].month - 1], Total: 0 },
      { name: months[sixCurrentMonth[1].month - 1], Total: 0 },
      { name: months[sixCurrentMonth[2].month - 1], Total: 0 },
      { name: months[sixCurrentMonth[3].month - 1], Total: 0 },
      { name: months[sixCurrentMonth[4].month - 1], Total: 0 },
      { name: months[sixCurrentMonth[5].month - 1], Total: 0 },
    ];
  } else {
    let sixMonth = [];
    for(let i = 0; i < 6; i++) {
      let total = 0;
      bookings.forEach((item) => {
        let date = new Date(item.createdAt);
        if(date.getMonth() + 1 == sixCurrentMonth[i].month && date.getFullYear() == sixCurrentMonth[i].year) {
          if(item.status == 'success')
            total += item.price;
        }
      });
      sixMonth.push({
        name: months[sixCurrentMonth[i].month - 1],
        Total: total
      });
    }
    data = sixMonth;
  }

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;