import Product from "../model/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      image: req.file
        ? req.file.path.replace("/upload/", "/upload/q_auto,f_auto/")
        : null,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Product create failed" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Fetch failed" });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Fetch product failed" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const update = { ...req.body };

    if (req.file) {
      update.image = req.file.path.replace(
        "/upload/",
        "/upload/q_auto,f_auto/"
      );
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(product);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};


export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
