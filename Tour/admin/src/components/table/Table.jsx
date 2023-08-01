import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Sai Gon - Ha Noi",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Thap_Rua.jpg/800px-Thap_Rua.jpg",
      customer: "Hoàng Đoàn",
      date: "01/03/2023",
      amount: 785000,
      method: "Tiền mặt",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Sai Gon - Hue",
      img: "https://dulich3mien.vn/wp-content/uploads/2022/01/Chua-Hue-Nghiem-@toby_ng91.jpg",
      customer: "Hoàng Đoàn",
      date: "01/03/2023",
      amount: 9012000,
      method: "Tiền mặt",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Sai Gon - Da Nang",
      img: "https://media.timeout.com/images/105273585/750/422/image.jpg",
      customer: "Hoàng Đoàn",
      date: "01/03/2023",
      amount: 785000,
      method: "Tiền mặt",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Sai Gon - Nha Trang",
      img: "https://static.vinwonders.com/2022/06/quang-truong-2-4-nha-trang.jpg",
      customer: "Hoàng Đoàn",
      date: "01/03/2023",
      amount: 785000,
      method: "Tiền mặt",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Sai Gon - Da Lat",
      img: "https://vnn-imgs-f.vgcloud.vn/2021/09/23/15/bien-may-mo-ao-nhu-tien-canh-o-da-lat-nhung-ngay-thang-9.jpg",
      customer: "Hoàng Đoàn",
      date: "01/03/2023",
      amount: 785000,
      method: "Tiền mặt",
      status: "Pending",
    },
  ];
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
            <TableCell className="tableCell">Phương thức</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;