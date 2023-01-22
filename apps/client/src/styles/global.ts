const globalStyles = {
  auth: { display: 'flex', alignItems: 'center', minHeight: '100vh' },
  authInnerContainer: { position: 'relative', mx: 'auto', maxWidth: '500px' },
  authError: {
    position: 'absolute',
    right: 0,
    color: 'red',
  },
  usersPageContainer: {
    mb: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '40px',
  },
  usersDataGridContainer: { height: '80vh', width: '100%', mx: 'auto' },
};

export default globalStyles;
