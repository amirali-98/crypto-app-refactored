import Layout from "./layouts/Layout";

import HomePage from "./components/templates/HomePage";

function App() {
  return (
    <div className="container">
      <Layout>
        <HomePage />
      </Layout>
    </div>
  );
}

export default App;
