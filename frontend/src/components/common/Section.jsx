import { Container } from "react-bootstrap";

function Section({
  children,
  background = "white",
  className = "",
  fluid = false,
}) {
  return (
    <section
      className={`section section-${background} ${className}`}
    >
      {fluid ? (
        children
      ) : (
        <Container>{children}</Container>
      )}
    </section>
  );
}

export default Section;