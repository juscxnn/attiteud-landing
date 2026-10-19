interface WordmarkProps {
  className?: string;
  onClick?: () => void;
}

export default function Wordmark({ className = "", onClick }: WordmarkProps) {
  return (
    <a
      href="#index"
      className={`wordmark ${className}`.trim()}
      aria-label="Attiteud, open the entry"
      onClick={(event) => {
        if (onClick) {
          event.preventDefault();
          onClick();
        }
      }}
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
