import ReusableTable from "@/components/table";

export default function History() {
  const initialData = [
    {
      id: 1,
      name: "John Doe",
      action: "Create",
      data: "Categoryágsrhgsahg",
      date: "28/10/2021",
      time: "10:00",
    },
  ];
  const columns = [
    { label: "Lịch sử", field: "name" },
    { label: "Hành động", field: "action" },
    { label: "Dữ liệu", field: "data" },
    { label: "Ngày", field: "date" },
    { label: "Thời gian", field: "time" },
  ];
  const handleEdit = (index) => {
    console.log("Edit", index);
  };
  const handleDelete = (index) => {
    console.log("Delete", index);
  };
  return (
    <ReusableTable
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      data={initialData}
      columns={columns}
    />
  );
}
