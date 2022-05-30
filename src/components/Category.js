export default Category;

function Category({ category }) {
  if (!category) return;

  return (
    <small
      className="text-muted text-uppercase"
      style={{
        fontSize: ".800em",
        fontWeight: 600,
      }}
    >
      {category}
    </small>
  );
}
