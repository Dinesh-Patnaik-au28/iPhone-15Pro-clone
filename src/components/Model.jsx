import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModalView from "./ModalView";
import { useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

const Model = () => {
  const [size, setSize] = useState("small");
  const [modal, setModal] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B8", "#6F6C64"],
    image: yellowImg,
  });

  // camera control
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // modals
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotations
  const [smallRotations, setSmallRotations] = useState(0);
  const [largeRotations, setLargeRotations] = useState(0);

  useGSAP(() => {
    gsap.to("#heading", {
      y: 0,
      opacity: 1,
    });
  }, []);
  return (
    <section
      className="
      common-padding
      screen-max-width
      "
    >
      <div
        className="
          screen-max-width
        "
      >
        <h1
          className="
            section-heading
          "
          id="heading"
        >
          Take a closer look.
        </h1>
        <div
          className="
            flex
            flex-col
            items-center
            mt-5
          "
        >
          <div
            className="
              w-full
              h-[75vh]
              md:h-[90vh]
              overflow-hidden
              relative
            "
          >
            <ModalView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotations}
              item={modal}
              size={size}
            />
            <ModalView
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotations}
              item={modal}
              size={size}
            />

            <Canvas
              className="
                w-full
                h-full
              "
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
          <div
            className="
              mx-auto
              w-full
            "
          >
            <p
              className="
                text-sm
                font-light
                text-center
                mb-5
              "
            >
              {modal.title}
            </p>
            <div
              className="
                  flex-center
                "
            >
              <ul
                className="
                    color-container
                  "
              >
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="
                        w-6
                        h-6
                        rounded-full
                        mx-2
                        cursor-pointer
                      "
                    style={{
                      backgroundColor: item.color[0],
                    }}
                    onClick={() => setModal(item)}
                  />
                ))}
              </ul>
              <button
                className="
                  size-btn-container
                "
              >
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
