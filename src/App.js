function App() {
  return (
    <Provider store={store}>
      {/* ToastContainer is Controlling all the Notifications  */}
      <ToastContainer />
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
