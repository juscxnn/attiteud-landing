interface WordmarkProps {
  className?: string;
  onClick?: () => void;
}

export default function Wordmark({ className = "", onClick }: WordmarkProps) {
  return (
    <a
      href="#top"
      className={`wordmark ${className}`.trim()}
      onClick={onClick}
      aria-label="Attiteud, back to top"
    >
      <span className="wordmark-mark" aria-hidden="true">
        ✽
      </span>
      <span className="wordmark-name">Attiteud</span>
      <span className="wordmark-punct" aria-hidden="true">
        .
      </span>
    </a>
  );
}
