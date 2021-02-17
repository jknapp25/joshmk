// import React from "react";
// import { navigate, Link } from "@reach/router";
// import { Card } from "react-bootstrap";
// import { RiInstagramFill } from "react-icons/ri";
// import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// export default ProfileCard;

// function ProfileCard({ avatarUrl, config }) {
//   const hasSocialLinks = !!config.instagramUrl || !!config.youtubeUrl;

//   return (
//     <Card className="hidden-xs">
//       <Card.Img variant="top" src={avatarUrl} onClick={() => navigate("/")} />
//       <Card.Body>
//         {/* <Card.Title>
//           <Link to="about" className="hidden-link">
//             {config.fullName}
//           </Link>
//         </Card.Title> */}
//         <Card.Text>
//           {/* {config.tagline} */}
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//       </Card.Body>
//       {/* {hasSocialLinks ? ( */}
//       <Card.Footer>
//         {/* {!!config.instagramUrl ? (
//             <RiInstagramFill
//               className="d-inline cursor-pointer social-icon instagram"
//               size="1.3em"
//               title="Instagram"
//               onClick={() => window.open(config.instagramUrl, "_blank")}
//             />
//           ) : null}
//           {!!config.youtubeUrl ? (
//             <FaYoutube
//               className="ml-2 d-inline cursor-pointer social-icon youtube"
//               size="1.3em"
//               title="YouTube"
//               onClick={() => window.open(config.youtubeUrl, "_blank")}
//             />
//           ) : null} */}
//         Get to know me
//         <HiOutlineArrowNarrowRight
//           size="1.7em"
//           className="float-right"
//           style={{ transform: "scaleY(-1)", margin: "0 auto" }}
//         />
//       </Card.Footer>
//       {/* ) : null} */}
//     </Card>
//   );
// }

/**
 *
 *
 *
 *
 *
 */

import React from "react";
import { navigate, Link } from "@reach/router";
import { Card } from "react-bootstrap";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
export default ProfileCard;

function ProfileCard({ avatarUrl, config }) {
  const hasSocialLinks = !!config.instagramUrl || !!config.youtubeUrl;

  return (
    <Card className="hidden-xs">
      <Card.Img variant="top" src={avatarUrl} onClick={() => navigate("/")} />
      <Card.Body>
        <Card.Title>
          <Link to="about" className="hidden-link">
            {config.fullName}
          </Link>
        </Card.Title>
        <Card.Text>{config.tagline}</Card.Text>
      </Card.Body>
      {hasSocialLinks ? (
        <Card.Footer>
          {!!config.instagramUrl ? (
            <RiInstagramFill
              className="d-inline cursor-pointer social-icon instagram"
              size="1.3em"
              title="Instagram"
              onClick={() => window.open(config.instagramUrl, "_blank")}
            />
          ) : null}
          {!!config.youtubeUrl ? (
            <FaYoutube
              className="ml-2 d-inline cursor-pointer social-icon youtube"
              size="1.3em"
              title="YouTube"
              onClick={() => window.open(config.youtubeUrl, "_blank")}
            />
          ) : null}
        </Card.Footer>
      ) : null}
    </Card>
  );
}
