import Product from "../models/Product.js";

// ✅ Create a new product
// export const addNewProduct= async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create product" });
//   }
// };

export const addNewProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const image = req.file ? req.file.path : ""; // Image ka path store karo

    const product = new Product({
      name,
      price,
      description,
      category,
      image,
      stock,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully!", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      page = 1,
      limit = 10,
      sort,
      minPrice,
      maxPrice,
    } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice); // Greater than or equal
      if (maxPrice) filter.price.$lte = parseInt(maxPrice); // Less than or equal
    }

    const skip = (page - 1) * limit;
    let sortOptions = {};

    if (sort === "price_asc") sortOptions.price = 1; // Price Low to High
    if (sort === "price_desc") sortOptions.price = -1; // Price High to Low

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// ✅ Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Files:", req.file);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    const { name, price, description, category, stock } = req.body;
    console.log(price)
    const updateData = { name, price:parseFloat(price) , description, category, stock };
console.log("updateddata",updateData)
    if (req.file) {
      updateData.image = `uploads/${req.file.filename}`;
    }

    console.log("Updating Product ID:", req.params.id);
    console.log("Updated Data:", updateData);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    console.log("Updated Product:", updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// ✅ Delete a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
