export default Category;

function Category({ attributes, category }) {
  if (!category) return;

  return (
    <div
      className="text-muted text-uppercase small"
      style={{
        fontWeight: 500,
      }}
      {...attributes}
    >
      {category}
    </div>
  );
}
