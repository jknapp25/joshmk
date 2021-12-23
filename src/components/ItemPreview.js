import React, { useState, useEffect } from "react";
import moment from "moment";
import { Image, Button } from "react-bootstrap";
import { navigate } from "@reach/router";
import { useIsMounted } from "../lib/utils";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import MiniImage from "./MiniImage";
import drawing from "../assets/drawing_pic.jpeg";
export default ItemPreview;

/**
 *
 * Add item previewing to images
 * Add DB fields
 * Add image description
 * Hide scroller
 * Add scroll arrows
 * Remove click to go to post
 * Hide/show buying
 */

function ItemPreview() {
  // const [realPost, setRealPost] = useState(post);
  // const isMounted = useIsMounted();

  // useEffect(() => {
  //   async function fetchData() {
  //     const postData = await API.graphql({
  //       query: queries.getPost,
  //       variables: { id: props.id },
  //     });

  //     if (postData && isMounted.current) {
  //       setRealPost(postData.data.getPost);
  //     }
  //   }
  //   if (props.id) {
  //     fetchData();
  //   }
  // }, [props.id, isMounted]);

  // if (!realPost) return null;

  const realPost = {
    id: "vr54brthbrwhg",
    title: "The Goat in the Monkey Cheese",
    category: "Drawing",
    images: [],
    createdAt: "",
  };

  let { id, title, category, images, createdAt } = realPost;
  const date = "Dec 25";

  return (
    <div
      className="row gx-0 cursor-pointer py-3 border-bottom"
      onClick={() => navigate(`/post/${id}`)}
    >
      <div className="col my-auto">
        <div>
          {category ? (
            <div className="mb-1">
              <small className="text-muted text-uppercase">{category}</small>
            </div>
          ) : null}
          <div
            className="d-block mb-2"
            style={{
              whiteSpace: "nowrap",
              overflowX: "scroll",
            }}
          >
            {[1, 2, 3, 4, 5].map(() => {
              return (
                <Image
                  src={drawing}
                  style={{
                    width: "175px",
                  }}
                  className="me-2"
                />
              );
            })}
          </div>
          <h4 className="mb-2 fw-bold">{title}</h4>
          <div className="mb-2">
            <Button variant="success" className="d-inline me-2">
              Buy
            </Button>
            <div className="text-success d-inline align-middle">$249</div>
          </div>
        </div>
      </div>
    </div>
  );
}
