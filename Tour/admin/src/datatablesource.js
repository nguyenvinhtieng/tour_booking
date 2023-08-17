export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "isStaff",
    headerName: "Role",
    width: 100,
    renderCell: (params) => {
      return (
        <span>{params.row.role}</span>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const tourColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Description",
    width: 230,
    valueGetter: (params) => {
      console.log(params.row);
      return params.row?.desc || ""
    }
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const tourGuideColumns = [
  { field: "_id", headerName: "ID", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    valueGetter: (params) => params.row?.tour_id?.name || ""
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    valueGetter: (params) => params.row?.trip_id?.title || ""
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
    valueGetter: (params) => params.row?.tour_id?.title || ""
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
    valueGetter: (params) => params.row?.tour_id?.city || ""
  },
];

export const tripColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const bookingColumns = [
  { field: "_id", headerName: "ID", width: 120 },
  { field: "user_username", headerName: "User", width: 100 },
  { field: "tour_name", headerName: "Tour", width: 100 },
  { field: "trip_title", headerName: "Trip", width: 100 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "price", headerName: "price", width: 100 },
]