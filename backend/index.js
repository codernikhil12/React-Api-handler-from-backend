import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "table glass",
      price: 260,
    },
    {
      id: 2,
      name: "table plastic",
      price: 230,
    },
    {
      id: 3,
      name: "table wooden",
      price: 250,
    },
    {
      id: 4,
      name: "table moto",
      price: 140,
    },
  ];
  //   http://localhost:3000/api/products?search=metal
  //   //   q= query parameter

  if (req.query.search) {
    const newProducts = products.filter((product) =>
      product.name.includes(req.query.search)
    );
    res.send(newProducts);
    return;

    //respond send korar por method thekhe puropuri exit korte hbe nahole app crash kore jabe oi jonno return korte hbe.
  }

  setTimeout(() => {
    res.send(products);
  }, 2000);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
