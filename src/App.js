import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/listing/:id" component={ListingPage} />
        <Route path="/create-listing" component={CreateListingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={UserProfilePage} />
        <Route path="/search" component={SearchResultsPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
