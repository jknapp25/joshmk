import { BsArrowDown } from "react-icons/bs";
import Category from "./Category";

export default FullWidthHomePageImage;

function FullWidthHomePageImage() {
  return (
    <div
      className="bg-secondary bg-opacity-10 ps-5 pe-5 pt-5 pb-3 m-0 bg-white that-thing d-flex align-items-start flex-column-reverse"
      style={{
        height: "840px",
      }}
    >
      <p className="d-block text-white">
        <BsArrowDown color="white" className="me-2" />
        Scroll to read
      </p>
      <h1 className="d-block text-white fw-bold mb-4 w-25">
        A Morning Glory from my garden
      </h1>
      <Category category="Poetry" />
    </div>
  );
}

// use

// .that-thing {
//     background: url("assets/DSCN6072.JPG") no-repeat center;;
//     background-color: #cccccc;
//     background-size: cover;
//    }
