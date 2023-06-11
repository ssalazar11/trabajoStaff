import ProductCard from "./ProductsCard";

function ProductGrid({ products, filterText, filterCategory }) {
  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const filterTextLower = filterText.toLowerCase();
    const productCategory = product.category || "";

    if (!productName.includes(filterTextLower)) {
      return false;
    }

    if (filterCategory && productCategory !== filterCategory) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-center items-center my-1">
        {filteredProducts.map((product) => (
          <div className="" key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
