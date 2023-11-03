import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    // aboart controller r kaj ho66e old request gulo ke muche fela
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request canceld", error.message);
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();
    //clearup
    return () => controller.abort();
  }, [search]);

  //const [products, error, loading] = customReactQuery("/api/products");

  // if (error) {
  //   return <h1>Somethings went wrong</h1>;
  // }

  // if (loading) {
  //   return <h1>Loading.....</h1>;
  // }

  return (
    <>
      <h1>Chai or Api</h1>

      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h1>Loading...</h1>}
      {error && <h1>Something went Wrong..</h1>}

      <h2>Number of Products : {products.length}</h2>
    </>
  );
}

export default App;

// const customReactQuery = (urlPath) => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         setError(false);
//         const response = await axios.get(urlPath);
//         console.log(response.data);
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     })();
//   });

//   return { products, loading, error };
// };
