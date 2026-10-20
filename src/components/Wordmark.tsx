import Mark from "./Mark";

interface WordmarkProps {
  className?: string;
}

export default function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <a
      href="#top"
      className={`wordmark ${className}`.trim()}
      aria-label="Attiteud, back to top"
    >
      <span className="wordmark-mark" aria-hidden="true">
        <Mark />
      </span>
      <span className="wordmark-text">ATTITEUD</span>
    </a>
  );
}
