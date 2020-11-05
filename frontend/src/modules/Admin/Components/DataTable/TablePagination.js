<TablePagination
rowsPerPageOptions={[5, 10, 25]}
component="div"
count={categories.length}
rowsPerPage={rowsPerPage}
page={page}
onChangePage={handleChangePage}
onChangeRowsPerPage={handleChangeRowsPerPage}
/>