// sortUtils.js

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) return 1;
  if (b[orderBy] === null) return -1;
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter((user) =>
      Object.values(user).some((value) =>
        value?.toString().toLowerCase().includes(filterName.toLowerCase())
      )
    );
  }

  return inputData;
}




// export function applyFilter({ inputData, comparator, filterName, orderBy }) {
//   const stabilizedThis = inputData.map((el, index) => [el, index]);

//   inputData = stabilizedThis.map((el) => el[0]);

//   if (filterName) {
//     inputData = inputData.filter((user) => {
//       const field = user[orderBy] ? user[orderBy].toLowerCase() : '';
//       
//       
//       
//       
//       return field.indexOf(filterName.toLowerCase()) !== -1;
//     });
//   }

//   return inputData;
// }
