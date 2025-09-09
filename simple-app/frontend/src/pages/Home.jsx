import { useEffect, useState } from "react";
import axios from "../lib/axios";

let categories = ["stationery", "kitchen", "electronics", "apparels"];
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    price: 0,
    quantity: 0,
    category: categories[0],
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let res = await axios.get("/");
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post("/", { ...form });
      setProducts((prev) => [...prev, res.data]);
      setLoading(false);
      setForm({
        productName: "",
        price: 0,
        quantity: 0,
        category: categories[0],
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      <header>
        <h1>Create a product</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder="Enter a prouduct name"
            value={form.productName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantity"
            id=""
            placeholder="enter quantity"
            value={form.quantity}
            onChange={handleChange}
          />
          <select name="category" onChange={handleChange}>
            {categories.map((category) => {
              return (
                <option value={category} key={category}>
                  {category}
                </option>
              );
            })}
          </select>
          <button type="submit">
            {loading ? "Creating a product..." : "Create a product"}
          </button>
          <button type="reset">Clear</button>
        </form>
      </header>
      <main>
        <h2>List of products</h2>
        <ul>
          {loading ? (
            <h2>Fetching products...</h2>
          ) : (
            <>
              {products.map((product) => {       
                return <li key={product._id}>{product.productName}</li>;
              })}
            </>
          )}
        </ul>
      </main>
    </div>
  );
};
export default Home;
