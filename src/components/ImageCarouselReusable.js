import { useContext } from "react";
import { Carousel } from "react-bootstrap";

import { ImageContext } from "../App";

export default ImageCarouselReusable;

function ImageCarouselReusable({ imageUrls = [], classes = "" }) {
  // const [imageUrls, setImageUrls] = useState([]);
  const imageContext = useContext(ImageContext);

  // const isMounted = useIsMounted();

  // useEffect(() => {
  //   async function fetchData() {
  //     const imagesCalls = images.map((url) => Storage.get(url));
  //     const resImageUrls = await Promise.all(imagesCalls);

  //     if (isMounted.current) setImageUrls(resImageUrls);
  //   }
  //   if (images && images.length) {
  //     fetchData();
  //   } else {
  //     if (isMounted.current) setImageUrls([]);
  //   }
  // }, [images, isMounted]);

  if (imageUrls.length === 0) return null;

  const isOneImage = imageUrls.length === 1;

  return (
    <Carousel
      className={classes}
      interval={1000000}
      controls={!isOneImage}
      indicators={!isOneImage}
      slide={false}
    >
      {imageUrls.map((url, i) => (
        <Carousel.Item
          key={i}
          onClick={() =>
            imageContext.setImageContext({
              ...imageContext,
              isOpen: true,
              index: i,
              imageUrls: imageUrls,
            })
          }
          style={{ cursor: "zoom-in" }}
        >
          <img className="w-100" src={url} alt={url} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
