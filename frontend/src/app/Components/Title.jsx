import { TypeAnimation } from "react-type-animation";

export const Title = () => {
    return (
        <div className="title-container">
        <TypeAnimation
          sequence={["Welcome to...", 1000, "My Notes", 1000]}
          wrapper="span"
          speed={10}
          style={{ fontSize: "3rem" }}
        />
      </div>
    )
}