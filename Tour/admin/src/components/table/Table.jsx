import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({bookings}) => {
  const latestBookings = bookings?.slice(-5);
  if(latestBookings.length === 0) return <div className="noBookings">Không có đơn đặt tour nào</div>
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Tour</TableCell>
            <TableCell className="tableCell">Khách hàng</TableCell>
            <TableCell className="tableCell">Ngày đặt</TableCell>
            <TableCell className="tableCell">Giá tiền</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {latestBookings && latestBookings.length > 0 && latestBookings.map((row) => (
            <TableRow key={row?._id}>
              <TableCell className="tableCell">{row?._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row?.tour_id?.photos[0] || "https://static.vinwonders.com/2022/06/quang-truong-2-4-nha-trang.jpg"} alt="" className="image" />
                  {row?.tour_id?.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row?.user_id?.username}</TableCell>
              <TableCell className="tableCell">{row?.createdAt}</TableCell>
              <TableCell className="tableCell">{row?.price}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row?.status}`}>{row?.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;