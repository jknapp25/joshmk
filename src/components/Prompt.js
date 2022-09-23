import ImageLink from "./ImageLink";

export default Prompt;

function Prompt({ prompt, bottomSpace }) {
  if (!prompt) return;

  return (
    <div className={bottomSpace ? "mb-5" : ""}>
      <p
        className="text-muted text-uppercase small mx-auto"
        style={{
          fontWeight: 500,
          maxWidth: "650px",
        }}
      >
        {prompt.title}
      </p>
      {prompt.images.map((img) => (
        <ImageLink key={img} image={img.imageUrl} link={img.link} />
      ))}
    </div>
  );
}
