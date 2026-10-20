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
        ✽
      </span>
      <span className="wordmark-name">Attiteud</span>
      <span className="wordmark-punct" aria-hidden="true">
        .
      </span>
    </a>
  );
}
