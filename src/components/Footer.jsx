import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white text-center p-4 mt-auto">
      <p>© 2025 ToDo App.</p>
      <p>
        Developed by{" "}
        <a
          href="https://github.com/NOURHAN02"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          Nour
        </a>
      </p>
    </footer>
  );
}
