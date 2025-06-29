import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type AnimatedLinkButtonProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof Button>;

const AnimatedLinkButton = ({
  to,
  children,
  className,
  ...props
}: AnimatedLinkButtonProps) => {
  // 🧠 نحول "/submit" إلى "/go-to-submit" تلقائيًا
  const goTo = `/go-to${to === "/" ? "-home" : to.replace("/", "-")}`;

  return (
    <Button asChild className={className} {...props}>
      <Link to={goTo}>{children}</Link>
    </Button>
  );
};

export default AnimatedLinkButton;
