export default function useTableSorting () {

  function descendingComparator(a, b, orderBy) {
    if (typeof a[orderBy] === 'string' || a instanceof String ) {
      var stringA = a[orderBy].toLowerCase(), stringB = b[orderBy].toLowerCase()
      if (stringB < stringA) {
        return -1;
      }
      if (stringB > stringA) {
        return 1;
      }
      return 0;
    } else {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleRequestSort = (event, property, orderDirection, setOrderDirection, orderBy, setOrderBy) => {
    const isAscending = (orderBy === property && orderDirection === 'asc');
    setOrderDirection(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return { getComparator, handleRequestSort }
}
